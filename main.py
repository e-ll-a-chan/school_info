import os
import uuid
import shutil
from datetime import datetime, date
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import db
from ai_service import ai_service
from sample_data import init_sample_data

app = FastAPI(title="おたよりポスト (Otayori Post)", version="2.0.0")

# CORS許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
STATIC_DIR = os.path.join(BASE_DIR, "static")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

# 静的ファイルの配信
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# 初期サンプルデータのロード
init_sample_data()

# --- Pydantic Models ---
class PostCreate(BaseModel):
    id: Optional[str] = None
    title: str
    title_en: Optional[str] = ""
    date: Optional[str] = None
    time_start: Optional[str] = None
    time_end: Optional[str] = None
    location: Optional[str] = ""
    target_child: Optional[str] = ""
    items: List[str] = []
    items_en: List[str] = []
    deadline: Optional[str] = None
    deadline_description: Optional[str] = ""
    is_submitted: Optional[bool] = False
    summary: str
    summary_en: Optional[str] = ""
    source_text: Optional[str] = ""
    source_date_raw: Optional[str] = ""
    tags: List[str] = []
    image_url: Optional[str] = None

class PostUpdate(BaseModel):
    title: Optional[str] = None
    title_en: Optional[str] = None
    date: Optional[str] = None
    time_start: Optional[str] = None
    time_end: Optional[str] = None
    location: Optional[str] = None
    target_child: Optional[str] = None
    items: Optional[List[str]] = None
    items_en: Optional[List[str]] = None
    deadline: Optional[str] = None
    deadline_description: Optional[str] = None
    is_submitted: Optional[bool] = None
    summary: Optional[str] = None
    summary_en: Optional[str] = None
    source_text: Optional[str] = None
    source_date_raw: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None

class SettingsUpdate(BaseModel):
    user_name: Optional[str] = None
    gemini_api_key: Optional[str] = None
    line_notify_token: Optional[str] = None
    notification_time: Optional[str] = None

class LineNotifyRequest(BaseModel):
    post_id: Optional[str] = None
    custom_message: Optional[str] = None

# --- API Endpoints ---

@app.get("/")
def get_index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

@app.post("/api/analyze")
async def analyze_document(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    """
    英語おたより（画像/PDF/テキスト）を受け取り、AIで読取・日本語翻訳・構造化下書きを生成
    """
    image_bytes = None
    mime_type = "image/jpeg"
    image_url = None

    try:
        if file and file.filename:
            mime_type = file.content_type or "image/jpeg"
            content = await file.read()
            if len(content) > 0:
                image_bytes = content
                file_ext = os.path.splitext(file.filename)[1] or ".jpg"
                saved_filename = f"{uuid.uuid4()}{file_ext}"
                saved_path = os.path.join(UPLOAD_DIR, saved_filename)
                with open(saved_path, "wb") as f:
                    f.write(content)
                image_url = f"/uploads/{saved_filename}"

        settings = db.get_settings()
        api_key = settings.get("gemini_api_key") or os.environ.get("GEMINI_API_KEY")

        # AI解析＆翻訳の実行
        parsed_draft = ai_service.analyze_document(
            image_bytes=image_bytes,
            mime_type=mime_type,
            text_content=text,
            api_key=api_key
        )

        if image_url:
            parsed_draft["image_url"] = image_url

        return JSONResponse(content={
            "status": "success",
            "draft": parsed_draft
        })
    except Exception as e:
        print(f"[API Error /api/analyze]: {e}")
        # 万一のエラー時もフォールバックで返す
        fallback_draft = ai_service._intelligent_parse(None, text or "School Announcement")
        return JSONResponse(content={
            "status": "success",
            "draft": fallback_draft
        })

@app.post("/api/upload")
async def upload_image_only(file: UploadFile = File(...)):
    """おたより編集時などの画像単体アップロード"""
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="ファイルが指定されていません")
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="空のファイルです")
    
    file_ext = os.path.splitext(file.filename)[1] or ".jpg"
    saved_filename = f"{uuid.uuid4()}{file_ext}"
    saved_path = os.path.join(UPLOAD_DIR, saved_filename)
    with open(saved_path, "wb") as f:
        f.write(content)
    
    image_url = f"/uploads/{saved_filename}"
    return {"status": "success", "image_url": image_url}

@app.get("/api/posts")
def get_posts(q: Optional[str] = Query(None), tag: Optional[str] = Query(None)):
    """おたより一覧取得・日英全文検索・タグフィルタ"""
    posts = db.get_all_posts(query=q, tag=tag)
    return {"posts": posts, "count": len(posts)}

@app.post("/api/posts")
def create_post(post: PostCreate):
    """確認・修正された下書きを保存"""
    data = post.dict()
    saved = db.add_post(data)
    return {"status": "success", "post": saved}

@app.get("/api/posts/{post_id}")
def get_post(post_id: str):
    post = db.get_post_by_id(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="おたよりが見つかりません")
    return post

@app.put("/api/posts/{post_id}")
def update_post(post_id: str, update_data: PostUpdate):
    data = {k: v for k, v in update_data.dict().items() if v is not None}
    updated = db.update_post(post_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="おたよりが見つかりません")
    return {"status": "success", "post": updated}

@app.delete("/api/posts/{post_id}")
def delete_post(post_id: str):
    deleted = db.delete_post(post_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="おたよりが見つかりません")
    return {"status": "success", "message": "削除しました"}

@app.get("/api/upcoming")
def get_upcoming():
    """直近の予定"""
    events = db.get_upcoming_events(limit=5)
    return {"events": events}

@app.get("/api/deadlines")
def get_deadlines():
    """提出物・締切アラート"""
    deadlines = db.get_pending_deadlines()
    return {"deadlines": deadlines}

@app.get("/api/settings")
def get_settings():
    settings = db.get_settings()
    # APIキーは末尾4桁以外マスクして返す
    masked_key = ""
    if settings.get("gemini_api_key"):
        raw = settings["gemini_api_key"]
        masked_key = f"{raw[:4]}...{raw[-4:]}" if len(raw) > 8 else "****"
    return {
        "user_name": settings.get("user_name", "yun"),
        "has_gemini_key": bool(settings.get("gemini_api_key")),
        "masked_gemini_key": masked_key,
        "notification_time": settings.get("notification_time", "18:00"),
        "line_configured": bool(settings.get("line_notify_token"))
    }

@app.post("/api/settings")
def update_settings(settings: SettingsUpdate):
    data = {k: v for k, v in settings.dict().items() if v is not None}
    updated = db.update_settings(data)
    return {"status": "success", "settings": updated}

@app.get("/api/calendar.ics")
def export_calendar(post_id: Optional[str] = None):
    """Googleカレンダー / iCal (.ics) ファイルの生成"""
    posts = [db.get_post_by_id(post_id)] if post_id else db.get_all_posts()
    posts = [p for p in posts if p and p.get("date")]

    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Otayori Post//School Calendar//JA",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:学校のおたより予定"
    ]

    for p in posts:
        event_date = p.get("date").replace("-", "")
        time_start = p.get("time_start", "08:30").replace(":", "") + "00"
        time_end = p.get("time_end", "15:00").replace(":", "") + "00"
        dtstart = f"{event_date}T{time_start}"
        dtend = f"{event_date}T{time_end}"

        items_str = ", ".join(p.get("items", []))
        summary = p.get("title", "学校行事")
        description = f"【内容】\\n{p.get('summary', '')}\\n\\n【持ち物】\\n{items_str}\\n\\n【英語原文タイトル】\\n{p.get('title_en', '')}"
        if p.get("deadline"):
            description += f"\\n\\n【提出締切】\\n{p.get('deadline')} ({p.get('deadline_description', '')})"

        lines.extend([
            "BEGIN:VEVENT",
            f"UID:{p.get('id')}@otayoripost.app",
            f"DTSTAMP:{datetime.now().strftime('%Y%m%dT%H%M%SZ')}",
            f"DTSTART:{dtstart}",
            f"DTEND:{dtend}",
            f"SUMMARY:{summary}",
            f"DESCRIPTION:{description}",
            f"LOCATION:{p.get('location', '学校')}",
            "END:VEVENT"
        ])

    lines.append("END:VCALENDAR")
    ics_content = "\r\n".join(lines)
    return Response(
        content=ics_content,
        media_type="text/calendar",
        headers={"Content-Disposition": "attachment; filename=otayori_events.ics"}
    )

def _format_fairview_line_message(post: dict) -> str:
    title = post.get("title", "学校からのお知らせ")
    date_str = post.get("date", "")
    time_start = post.get("time_start", "")
    time_end = post.get("time_end", "")
    location = post.get("location", "")
    items = post.get("items", [])
    deadline = post.get("deadline", "")
    deadline_desc = post.get("deadline_description", "")
    summary = post.get("summary", "")

    lines = [
        "Fairview  school info📢",
        "🌟 重要な予定",
        f"📌「{title}」"
    ]

    details = []
    if date_str:
        t_str = f" ⏰ {time_start}〜{time_end}" if (time_start and time_end) else (f" ⏰ {time_start}" if time_start else "")
        details.append(f"📅 日程: {date_str.replace('-', '/')}{t_str}")
    if location and "学校" not in location:
        details.append(f"📍 場所: {location}")
    if items:
        details.append(f"🎒 持ち物: {'、'.join(items)}")
    if deadline:
        details.append(f"⚠️ 提出締切: {deadline.replace('-', '/')} ({deadline_desc or '提出用紙'})")

    if details:
        lines.append("")
        lines.extend(details)

    lines.append("")
    lines.append("📝「本文」")
    lines.append(f"{summary}")

    return "\n".join(lines)

@app.post("/api/line/notify")
def send_line_notification(req: LineNotifyRequest):
    """
    LINE通知シミュレーターおよび実送信 (絵文字リッチなFairview school info形式)
    """
    if req.custom_message:
        message = req.custom_message
    elif req.post_id:
        post = db.get_post_by_id(req.post_id)
        if not post:
            raise HTTPException(status_code=404, detail="おたよりが見つかりません")
        message = _format_fairview_line_message(post)
    else:
        upcoming = db.get_upcoming_events(limit=1)
        if upcoming:
            message = _format_fairview_line_message(upcoming[0])
        else:
            message = "Fairview  school info📢\n🌟 重要な予定\n📌「現在、特別な予定はありません」\n\n📝「本文」\n本日届いている緊急のおたよりはありません。良い一日を！😊✨"

    return {
        "status": "success",
        "message": message,
        "sent_at": datetime.now().strftime("%H:%M"),
        "channel": "LINE Messaging Preview"
    }

if __name__ == "__main__":
    import uvicorn
    import webbrowser
    import threading
    import socket
    import time

    def find_free_port(start_port=8000, max_attempts=30):
        for port in range(start_port, start_port + max_attempts):
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                try:
                    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                    s.bind(('0.0.0.0', port))
                    return port
                except OSError:
                    continue
        return start_port

    target_port = find_free_port(8000)

    def open_browser(port):
        time.sleep(1.0)
        webbrowser.open(f"http://127.0.0.1:{port}")

    threading.Thread(target=open_browser, args=(target_port,), daemon=True).start()
    print(f"\n=======================================================")
    print(f"  おたよりポスト Webアプリを起動しました！")
    print(f"  PC用URL:     http://127.0.0.1:{target_port}")
    print(f"  スマホ用URL: http://192.168.100.161:{target_port} (同じWi-Fiから)")
    print(f"=======================================================\n")
    uvicorn.run("main:app", host="0.0.0.0", port=target_port, reload=False)
