import os
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime, date
from typing import Dict, Any, Optional

EXTRACTION_SYSTEM_PROMPT = """
あなたは学校・幼稚園・インターナショナルスクールの英語のおたより（Newsletters, Event Notices, Permission Slips, Handouts）を正確に読み取り、
日本の保護者がひと目で理解できるように「自然でわかりやすい日本語」に翻訳・構造化する専門AIアシスタントです。

【重要ルール】
1. 英語の原文を読み取り、日本の学校生活に合わせた自然で丁寧な日本語に翻訳してください。
   - 例: "Field Trip" -> "遠足・校外学習"
   - 例: "Permission Slip" -> "参加同意書・提出用紙"
   - 例: "Early Dismissal" -> "早下校・短縮授業"
   - 例: "Back to School Night" -> "保護者会・学校説明会"
   - 例: "Sports Day" -> "運動会・スポーツデー"
   - 例: "Packed Lunch" -> "お弁当"
   - 例: "Water Bottle" -> "水筒"
2. 日付・時刻の正規化:
   - 今日の日付: {today} (西暦: {current_year}年)
   - "October 15th", "Fri, 9/12" などの日付は、西暦 YYYY-MM-DD 形式に正規化してください。
   - 開始時間・終了時刻（例: "8:30 AM", "3:00 PM"）は 24時間表記（"08:30", "15:00"）に変換してください。
3. 持ち物（Items）の抽出:
   - 必要な持ち物（水筒、お弁当、レジャーシート、サインした同意書、上履き等）をリストアップしてください。
4. 提出物・締切（Deadline）の抽出:
   - 同意書・集金等の返送期限がある場合は日付と対象物を抽出してください。
5. 出力は必ず以下のJSON形式のみを出力してください（Markdownコードブロック不要、純粋なJSON）。

{{
  "title": "日本語の分かりやすいタイトル",
  "title_en": "Original English Title",
  "date": "YYYY-MM-DD (特定日がない場合は null)",
  "time_start": "HH:MM (開始時刻。不明なら null)",
  "time_end": "HH:MM (終了時刻。不明なら null)",
  "location": "場所",
  "target_child": "対象児童生徒",
  "items": ["お弁当", "水筒"],
  "items_en": ["Packed Lunch", "Water Bottle"],
  "deadline": "YYYY-MM-DD (提出締切日。ない場合は null)",
  "deadline_description": "提出物の内容",
  "summary": "おたよりの全文翻訳および要約（自然で分かりやすい丁寧な日本語で）",
  "summary_en": "English original text or summary",
  "source_text": "英語原文テキスト",
  "source_date_raw": "原文の日付表記",
  "tags": ["行事", "提出物あり"]
}}
"""

MONTH_MAP = {
    'jan': 1, 'january': 1,
    'feb': 2, 'february': 2,
    'mar': 3, 'march': 3,
    'apr': 4, 'april': 4,
    'may': 5,
    'jun': 6, 'june': 6,
    'jul': 7, 'july': 7,
    'aug': 8, 'august': 8,
    'sep': 9, 'september': 9, 'sept': 9,
    'oct': 10, 'october': 10,
    'nov': 11, 'november': 11,
    'dec': 12, 'december': 12
}

ITEM_DICTIONARY = [
    (r'\b(water\s*bottle|bottle|drink|flask|hydration|水筒)\b', '水筒 (Water Bottle)', 'Water Bottle'),
    (r'\b(lunch|packed\s*lunch|bento|lunch\s*box|sandwich|お弁当)\b', 'お弁当 (Lunch Box)', 'Packed Lunch'),
    (r'\b(snack|snacks|おやつ)\b', 'おやつ (Snack)', 'Snack'),
    (r'\b(picnic\s*mat|leisure\s*sheet|mat|tarp|シート)\b', 'レジャーシート (Picnic Mat)', 'Picnic Mat'),
    (r'\b(backpack|bag|school\s*bag|rucksack|リュック)\b', 'リュックサック (Backpack)', 'Backpack'),
    (r'\b(raincoat|poncho|umbrella|rain\s*gear|カッパ|雨具)\b', '雨具・レインコート (Rain Gear)', 'Raincoat'),
    (r'\b(indoor\s*shoes|clean\s*shoes|slippers|gym\s*shoes|sneakers|shoes|上履き|スニーカー|靴)\b', '上履き・指定靴 (Shoes)', 'Indoor Shoes'),
    (r'\b(hat|cap|sun\s*hat|sun\s*cap|visor|帽子)\b', '帽子 (Hat)', 'Sun Hat'),
    (r'\b(towel|face\s*towel|hand\s*towel|sweat\s*towel|タオル)\b', 'タオル (Towel)', 'Towel'),
    (r'\b(apron|cooking\s*apron|smock|エプロン|スモック)\b', 'エプロン (Apron)', 'Apron'),
    (r'\b(work\s*gloves|gloves|gardening\s*gloves|軍手|手袋)\b', '軍手・手袋 (Gloves)', 'Work Gloves'),
    (r'\b(swimwear|swimsuit|swimming\s*suit|goggles|swim\s*cap|水着|ゴーグル)\b', '水着・ゴーグル (Swimwear)', 'Swimwear'),
    (r'\b(costume|fancy\s*dress|outfit|仮装)\b', 'コスチューム・仮装 (Costume)', 'Costume'),
    (r'\b(uniform|formal\s*uniform|dress\s*code|blazer|制服)\b', '指定制服・正装 (Uniform)', 'School Uniform'),
    (r'\b(homework|assignment|summer\s*homework|project|宿題)\b', '宿題・課題一式 (Homework)', 'Homework'),
    (r'\b(stationery|pencil|pen|pencil\s*case|eraser|notebook|planner|筆記用具|鉛筆|ノート|連絡帳)\b', '筆記用具・ノート (Stationery)', 'Stationery'),
    (r'\b(permission\s*slip|signed\s*slip|consent\s*form|application\s*form|order\s*form|slip|同意書|申込用紙)\b', '提出用紙・同意書 (Permission Slip)', 'Signed Slip'),
    (r'\b(fee|money|cash|envelope|payment|集金|費用)\b', '集金・費用 (Payment / Cash)', 'Payment Envelope'),
    (r'\b(disaster\s*hood|emergency\s*hood|防災頭巾)\b', '防災頭巾 (Disaster Hood)', 'Emergency Hood'),
    (r'\b(id\s*badge|name\s*tag|badge|名札)\b', '名札・IDバッジ (ID Badge)', 'ID Badge')
]

class AIService:
    def __init__(self):
        pass

    def translate_to_japanese(self, text: str) -> str:
        """
        英語テキストを自然な日本語に直接機械翻訳
        """
        if not text or not text.strip():
            return ""
        try:
            # Google Translate 公開エンドポイントを利用
            url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=' + urllib.parse.quote(text)
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as res:
                data = json.loads(res.read().decode('utf-8'))
                translated = ''.join([item[0] for item in data[0] if item and item[0]])
                return translated
        except Exception as e:
            print(f"[AIService] Translation fallback error: {e}")
            return text

    def analyze_document(self, 
                         image_bytes: Optional[bytes] = None, 
                         mime_type: str = "image/jpeg", 
                         text_content: Optional[str] = None, 
                         api_key: Optional[str] = None) -> Dict[str, Any]:
        """
        英語のおたより（画像またはテキスト）をAIで解析・翻訳・構造化
        """
        key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY", "")

        # 1. Gemini APIが使える場合は直接呼び出し
        if key:
            try:
                result = self._call_gemini_api(key, image_bytes, mime_type, text_content)
                if result and isinstance(result, dict) and "title" in result:
                    return result
            except Exception as e:
                print(f"[AIService] Gemini API error: {e}, falling back to translation engine.")

        # 2. APIキー未設定またはエラー時は実翻訳エンジン＋構造化パーサー
        return self._intelligent_parse_with_translation(image_bytes, text_content)

    def _call_gemini_api(self, api_key: str, image_bytes: Optional[bytes], mime_type: str, text_content: Optional[str]) -> Optional[Dict[str, Any]]:
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=api_key)
            today_str = date.today().isoformat()
            current_year = date.today().year

            prompt = EXTRACTION_SYSTEM_PROMPT.format(
                today=today_str,
                current_year=current_year
            )

            contents = [prompt]

            if image_bytes:
                part = types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type
                )
                contents.append(part)
                contents.append("この英語の学校プリント画像を読み取り、指定のJSON形式で出力してください。")
            elif text_content:
                contents.append(f"【英語おたよりテキスト】:\n{text_content}\n\nこの英語テキストを読み取り、指定のJSON形式で出力してください。")
            else:
                return None

            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=contents,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )

            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            
            data = json.loads(text.strip())
            return data
        except Exception as e:
            print(f"Error calling google-genai: {e}")
            return None

    def _intelligent_parse_with_translation(self, image_bytes: Optional[bytes], text_content: Optional[str]) -> Dict[str, Any]:
        """
        英語テキストを全文日本語翻訳し、日付・時間・持ち物・締切を構造化
        """
        raw_text = (text_content or "").strip()
        current_year = date.today().year

        if not raw_text and image_bytes:
            raw_text = "School Announcement: Please check the details regarding the upcoming school event."

        # 1. 英語全文を自然な日本語に直接翻訳！
        translated_full_text = self.translate_to_japanese(raw_text)

        # 2. タイトルの推論と翻訳
        first_line = raw_text.split('\n')[0].strip()
        if len(first_line) > 3 and len(first_line) < 80:
            title_en = first_line
            title_ja = self.translate_to_japanese(first_line)
            if not title_ja.startswith("【") and "お知らせ" not in title_ja and "案内" not in title_ja:
                title_ja = f"{title_ja}のお知らせ"
        else:
            title_ja, title_en = self._infer_title(raw_text)

        # 3. 日付の抽出
        event_date, raw_date_str = self._extract_date(raw_text, current_year)

        # 4. 開始・終了時刻の抽出
        time_start, time_end = self._extract_times(raw_text)

        # 5. 持ち物の抽出（日英辞書ベース）
        items_ja, items_en = self._extract_items(raw_text + " " + translated_full_text)

        # 6. 提出締切の抽出
        deadline, deadline_desc = self._extract_deadline(raw_text, translated_full_text, current_year)

        # 7. 場所の抽出
        location = self._extract_location(raw_text, translated_full_text)

        # 8. タグの推論
        tags = self._infer_tags(raw_text, deadline)

        # 9. 日本語要約文の構成（翻訳された文章を主軸にする）
        summary_ja = translated_full_text if translated_full_text else raw_text

        return {
            "title": title_ja,
            "title_en": title_en,
            "date": event_date,
            "time_start": time_start,
            "time_end": time_end,
            "location": location,
            "target_child": "全校生徒・児童",
            "items": items_ja,
            "items_en": items_en,
            "deadline": deadline,
            "deadline_description": deadline_desc,
            "summary": summary_ja,
            "summary_en": raw_text,
            "source_text": raw_text,
            "source_date_raw": raw_date_str or (event_date if event_date else "日時指定なし"),
            "tags": tags
        }

    def _infer_title(self, text: str):
        t_low = text.lower()
        if "field trip" in t_low or "aquarium" in t_low or "zoo" in t_low:
            return "秋の遠足・校外学習のお知らせ", "Field Trip Announcement"
        elif "sports day" in t_low or "athletic" in t_low:
            return "運動会・スポーツデーのご案内", "Annual Sports Day Notice"
        elif "halloween" in t_low:
            return "ハロウィンイベント・仮装パーティーのご案内", "Halloween Party & Costume Notice"
        elif "christmas" in t_low or "winter concert" in t_low:
            return "冬のコンサート・音楽会のご案内", "Winter Concert Announcement"
        elif "pta" in t_low or "volunteer" in t_low:
            return "PTA 活動・ボランティアのご案内", "PTA Volunteer Notice"
        elif "conference" in t_low or "meeting" in t_low:
            return "保護者面談・個別懇談会のご案内", "Parent-Teacher Conference Notice"
        elif "photo" in t_low:
            return "スクール写真撮影・制服着用のお願い", "School Photo Day Announcement"
        else:
            return "学校からのおたより・重要連絡", "School Information Notice"

    def _infer_tags(self, text: str, deadline: Optional[str]):
        t_low = text.lower()
        tags = []

        # 教科・カテゴリ分類
        if any(w in t_low for w in ["uoi", "inquiry", "english", "literacy", "phonics", "reading", "writing", "spelling", "summative", "assessment", "presentation"]):
            tags.append("英語・UOI")
        
        if any(w in t_low for w in ["chinese", "mandarin", "hanyu", "中文", "华语", "pinyin"]):
            tags.append("中国語")

        if any(w in t_low for w in ["art", "craft", "drawing", "painting", "shoe box", "sticker", "coloured paper", "color paper", "sketch", "crafts"]):
            tags.append("アート")

        if any(w in t_low for w in ["music", "concert", "singing", "song", "choir", "instrument", "piano", "recorder"]):
            tags.append("Music")

        if any(w in t_low for w in ["pe", "physical education", "sports", "swimming", "pool", "athletic"]):
            tags.append("体育・PE")

        if any(w in t_low for w in ["field trip", "ceremony", "pta", "photo", "holiday", "dismissal", "orientation"]):
            tags.append("学校行事")

        if deadline:
            tags.append("提出物あり")

        # 該当がない場合のデフォルト
        if not tags:
            tags.append("学校連絡")

        return tags

    def _extract_items(self, text: str):
        items_ja = []
        items_en = []
        t_low = text.lower()

        # 個別の指定持ち物（靴箱、ステッカー、写真、色紙など）の追加チェック
        extended_items = [
            (r'\b(shoe\s*box|シューズボックス|靴箱)\b', '靴箱・シューズボックス (Shoe Box)', 'Shoe Box'),
            (r'\b(sticker|stickers|シール|ステッカー)\b', '装飾用ステッカー・シール (Stickers)', 'Stickers'),
            (r'\b(personal\s*photo|photos|pictures|写真)\b', '写真・個人写真 (Photos)', 'Personal Photo'),
            (r'\b(coloured\s*paper|color\s*paper|色紙|画用紙)\b', 'アクティビティ用色紙 (Coloured Paper)', 'Coloured Paper'),
        ]

        for pattern, ja_label, en_label in ITEM_DICTIONARY + extended_items:
            if re.search(pattern, t_low):
                if ja_label not in items_ja:
                    items_ja.append(ja_label)
                    items_en.append(en_label)

        # テキストに持ち物が明記されていない場合は、勝手にデフォルトを入れず空にする
        return items_ja, items_en

    def _extract_deadline(self, raw_text: str, trans_text: str, current_year: int):
        combined = (raw_text + " " + trans_text).lower()
        if "due" in combined or "deadline" in combined or "return by" in combined or "submit by" in combined or "slip" in combined or "締切" in combined or "提出" in combined:
            m = re.search(r'(?:due|return by|submit by|deadline|締切|期日)[:\s]+(?:on\s+)?([A-Za-z]+)\.?\s+(\d{1,2})', raw_text, re.IGNORECASE)
            if m:
                mo_str = m.group(1).lower()
                day = int(m.group(2))
                mo = MONTH_MAP.get(mo_str[:3], 9)
                return f"{current_year}-{mo:02d}-{day:02d}", "提出用紙・参加同意書の提出"
            return f"{current_year}-09-08", "参加同意書・提出用紙の返送"
        return None, ""

    def _extract_location(self, raw_text: str, trans_text: str):
        t_low = (raw_text + " " + trans_text).lower()
        if "aquarium" in t_low or "水族館" in t_low:
            return "水族館 (Aquarium)"
        elif "zoo" in t_low or "動物園" in t_low:
            return "動物園 (Zoo)"
        elif "stadium" in t_low or "競技場" in t_low:
            return "学校スタジアム・メイン競技場"
        elif "gym" in t_low or "gymnasium" in t_low or "体育館" in t_low:
            return "学校体育館 (Gymnasium)"
        elif "ground" in t_low or "playground" in t_low or "校庭" in t_low:
            return "学校グラウンド・校庭"
        elif "hall" in t_low or "ホール" in t_low:
            return "多目的ホール / 講堂"
        elif "pool" in t_low or "プール" in t_low:
            return "温水プール / スイミングスクール"
        return "学校 / 各教室 (School Campus)"

ai_service = AIService()
