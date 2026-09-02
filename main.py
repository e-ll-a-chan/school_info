import os
import uuid
import shutil
import json
import html
from datetime import datetime, date
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse, HTMLResponse
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
    text_translation: Optional[str] = ""
    text_raw: Optional[str] = ""
    image_translation: Optional[str] = ""
    image_raw: Optional[str] = ""
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
    text_translation: Optional[str] = None
    text_raw: Optional[str] = None
    image_translation: Optional[str] = None
    image_raw: Optional[str] = None
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

def _render_ssr_html() -> str:
    index_path = os.path.join(STATIC_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        template = f.read()
    
    posts = db.get_all_posts()
    upcoming = db.get_upcoming_events()
    deadlines = db.get_pending_deadlines()
    settings = db.get_settings()
    user_name = settings.get("user_name", "めぐ")

    # 1. おたより一覧 HTML
    if not posts:
        posts_html = '''
        <div class="otayori-card p-8 text-center space-y-2">
          <div class="text-3xl">📭</div>
          <p class="text-xs font-bold text-stone-600">おたよりが見つかりません</p>
          <p class="text-[11px] text-stone-400">右下の「＋」ボタンから英語プリントを追加してください</p>
        </div>
        '''
    else:
        cards = []
        for p in posts:
            p_id = html.escape(str(p.get("id", "")))
            p_title = html.escape(str(p.get("title", "お知らせ")))
            p_title_en = html.escape(str(p.get("title_en", "")))
            p_summary = html.escape(str(p.get("summary", "")))
            p_date_raw = p.get("date")
            p_date_str = f"📅 {p_date_raw.replace('-', '/')}" if p_date_raw else "📅 随時"
            p_img = p.get("image_url") or "/static/samples/no_image.svg"
            
            tags_html = ""
            for t in p.get("tags", []):
                t_esc = html.escape(str(t))
                color = "bg-stone-100 text-stone-600"
                icon = "🏷️"
                if "英語" in t or "UOI" in t: color, icon = "bg-blue-100 text-blue-800", "📚"
                elif "中国語" in t: color, icon = "bg-red-100 text-red-800", "🀄"
                elif "アート" in t: color, icon = "bg-purple-100 text-purple-800", "🎨"
                elif "Music" in t: color, icon = "bg-pink-100 text-pink-800", "🎵"
                elif "行事" in t: color, icon = "bg-emerald-100 text-emerald-800", "🏫"
                elif "提出物" in t: color, icon = "bg-amber-100 text-amber-800", "⚠️"
                tags_html += f'<span class="px-2 py-0.5 rounded-md text-[10px] font-bold {color}">{icon} {t_esc}</span>'
            
            items = p.get("items", [])
            items_badge = f'<span class="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">🎒 持ち物 {len(items)}点</span>' if items else ''
            dl = p.get("deadline")
            dl_badge = f'<span class="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-bold">⚠️ 締切: {dl.replace("-", "/")}</span>' if dl else ''

            card = f'''
            <div class="otayori-card p-3.5 flex gap-3.5 cursor-pointer hover:border-amber-300 transition" onclick="openDetailModal('{p_id}')">
              <div class="w-16 h-20 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                <img src="{p_img}" class="w-full h-full object-cover" alt="プリント">
              </div>
              <div class="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    {tags_html}
                    <span class="text-[10px] text-stone-400 font-semibold ml-auto">{p_date_str}</span>
                  </div>
                  <h3 class="text-xs font-extrabold text-stone-900 mt-1 truncate leading-tight">{p_title}</h3>
                  <p class="text-[10px] text-stone-400 truncate">{p_title_en}</p>
                </div>
                <p class="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">{p_summary}</p>
                <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-[10px]">
                  <div class="flex items-center gap-1.5 truncate max-w-[190px]">
                    {items_badge}
                    {dl_badge}
                  </div>
                  <span class="text-emerald-700 font-bold flex items-center gap-0.5 flex-shrink-0">
                    <span>詳細</span>
                    <i data-lucide="chevron-right" class="w-3 h-3"></i>
                  </span>
                </div>
              </div>
            </div>
            '''
            cards.append(card)
        posts_html = "\n".join(cards)

    # 2. 直近の予定 HTML
    if not upcoming:
        upcoming_html = '''
        <div class="otayori-card p-4 text-center text-xs text-stone-400">
          直近の行事・予定はありません
        </div>
        '''
    else:
        up_cards = []
        for ev in upcoming:
            ev_id = html.escape(str(ev.get("id", "")))
            ev_title = html.escape(str(ev.get("title", "")))
            ev_loc = html.escape(str(ev.get("location", "学校")))
            ev_date = ev.get("date", "")
            day_str = ev_date.split("-")[2] if (ev_date and len(ev_date.split("-")) == 3) else "—"
            month_str = f"{int(ev_date.split('-')[1])}月" if (ev_date and len(ev_date.split("-")) == 3) else "—"
            time_str = f"<span>⏰ {ev.get('time_start')}〜</span>" if ev.get("time_start") else ""

            items_tags = "".join([f'<span class="item-tag truncate max-w-[140px]">🎒 {html.escape(str(it).split("(")[0].strip())}</span>' for it in ev.get("items", [])[:3]])

            up_card = f'''
            <div class="otayori-card p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:border-sky-300 transition" onclick="openDetailModal('{ev_id}')">
              <div class="flex items-center gap-3 min-w-0">
                <div class="date-badge">
                  <span class="day">{day_str}</span>
                  <span class="month">{month_str}</span>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <h4 class="font-extrabold text-xs text-stone-800 truncate">{ev_title}</h4>
                  </div>
                  <div class="flex items-center gap-1 mt-1 text-[11px] text-stone-500">
                    {time_str}
                    <span class="truncate">📍 {ev_loc}</span>
                  </div>
                  <div class="flex flex-wrap gap-1 mt-1.5">
                    {items_tags}
                  </div>
                </div>
              </div>
            </div>
            '''
            up_cards.append(up_card)
        upcoming_html = "\n".join(up_cards)

    # 3. テンプレート置換
    rendered = template.replace('id="userNameDisplay">めぐ</span>', f'id="userNameDisplay">{html.escape(user_name)}</span>')
    rendered = rendered.replace('id="postsCount">0件</span>', f'id="postsCount">{len(posts)}件</span>')
    rendered = rendered.replace('<div class="text-center py-6 text-stone-400 text-sm">予定を読み込み中...</div>', upcoming_html)
    rendered = rendered.replace('<!-- JSでレンダリング -->', posts_html)

    # 4. window.__INITIAL_DATA__ 埋め込み
    initial_json = json.dumps({"posts": posts, "upcoming": upcoming, "deadlines": deadlines, "settings": settings}, ensure_ascii=False)
    injected_script = f'<script>window.__INITIAL_DATA__ = {initial_json};</script>'
    rendered = rendered.replace('</body>', f'{injected_script}\n</body>')

    return rendered

@app.get("/")
def get_index():
    rendered = _render_ssr_html()
    return HTMLResponse(content=rendered, headers={"Cache-Control": "no-cache, no-store, must-revalidate"})

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
    text_trans = post.get("text_translation", "")
    img_trans = post.get("image_translation", "")
    summary = post.get("summary", "")

    if text_trans and img_trans:
        body_content = f"📱【メッセージ本文】\n{text_trans}\n\n🖼️【添付プリント翻訳】\n{img_trans}"
    elif img_trans and not text_trans:
        body_content = f"🖼️【添付プリント翻訳】\n{img_trans}"
    elif text_trans:
        body_content = f"{text_trans}"
    else:
        body_content = f"{summary}"

    lines.append("")
    lines.append("📝「本文」")
    lines.append(body_content)

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
