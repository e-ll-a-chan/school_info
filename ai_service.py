import os
import json
import re
import base64
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
   - 例: "Summative Assessment" -> "総括評価 (SA)"
   - 例: "Mandarin" -> "中国語"
2. 日付・時刻の正規化:
   - 今日の日付: {today} (西暦: {current_year}年)
   - "October 15th", "Fri, 9/12" などの日付は、西暦 YYYY-MM-DD 形式に正規化してください。
   - 開始時間・終了時刻（例: "8:30 AM", "3:00 PM"）は 24時間表記（"08:30", "15:00"）に変換してください。不明な場合は null にしてください。
3. 持ち物（Items）:
   - 本文中に「持ってきてほしいもの (bring, prepare, items)」が明記されている場合のみ抽出してください。明記がない場合は空配列 [] にしてください。
4. 提出物・締切（Deadline）:
   - 提出期限・返送期限（due, deadline, return by）が明記されている場合のみ抽出してください。明記がない場合は null にしてください。
5. 出力は必ず以下のJSON形式のみを出力してください（Markdownコードブロック不要、純粋なJSON）。

{{
  "title": "日本語の分かりやすいタイトル",
  "title_en": "Original English Title",
  "date": "YYYY-MM-DD (イベント日や対象日。不明なら null)",
  "time_start": "HH:MM (開始時刻。不明なら null)",
  "time_end": "HH:MM (終了時刻。不明なら null)",
  "location": "場所 (不明なら null)",
  "target_child": "対象児童生徒",
  "items": [],
  "items_en": [],
  "deadline": "YYYY-MM-DD (提出締切日。ない場合は null)",
  "deadline_description": "",
  "summary": "おたよりの全文翻訳および要約（自然で分かりやすい丁寧な日本語で）",
  "summary_en": "English original text or summary",
  "source_text": "英語原文テキスト",
  "source_date_raw": "原文の日付表記",
  "tags": ["英語・UOI"]
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

class AIService:
    def __init__(self):
        pass

    def translate_to_japanese(self, text: str) -> str:
        """英語テキストを自然な日本語に直接機械翻訳"""
        if not text or not text.strip():
            return ""
        try:
            url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=' + urllib.parse.quote(text)
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=8) as res:
                data = json.loads(res.read().decode('utf-8'))
                translated = ''.join([item[0] for item in data[0] if item and item[0]])
                return translated
        except Exception as e:
            print(f"[AIService] Translation error: {e}")
            return text

    def extract_text_from_image(self, image_bytes: bytes, mime_type: str = "image/jpeg") -> str:
        """無料のOCR APIを使用して画像から英語テキストを抽出"""
        try:
            b64_img = base64.b64encode(image_bytes).decode('utf-8')
            payload = urllib.parse.urlencode({
                'base64Image': f"data:{mime_type};base64,{b64_img}",
                'language': 'eng',
                'isOverlayRequired': 'false',
                'apikey': 'helloworld'
            }).encode('utf-8')

            req = urllib.request.Request(
                'https://api.ocr.space/parse/image',
                data=payload,
                headers={'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/x-www-form-urlencoded'}
            )
            with urllib.request.urlopen(req, timeout=12) as res:
                res_data = json.loads(res.read().decode('utf-8'))
                parsed_results = res_data.get('ParsedResults', [])
                if parsed_results:
                    return parsed_results[0].get('ParsedText', '').strip()
        except Exception as e:
            print(f"[AIService] OCR error: {e}")
        return ""

    def analyze_document(self, 
                         image_bytes: Optional[bytes] = None, 
                         mime_type: str = "image/jpeg", 
                         text_content: Optional[str] = None, 
                         api_key: Optional[str] = None) -> Dict[str, Any]:
        """英語のおたより（画像またはテキスト、あるいは両方）をAIで解析・個別翻訳・構造化"""
        key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY", "")

        # 1. Gemini APIが使える場合は直接呼び出し
        if key:
            try:
                result = self._call_gemini_api(key, image_bytes, mime_type, text_content)
                if result and isinstance(result, dict) and "title" in result:
                    return result
            except Exception as e:
                print(f"[AIService] Gemini API error: {e}, falling back.")

        # 2. テキストと画像を別々に翻訳
        text_raw = (text_content or "").strip()
        text_translation = self.translate_to_japanese(text_raw) if text_raw else ""

        image_raw = ""
        image_translation = ""
        if image_bytes:
            print("[AIService] Extracting text from image via OCR...")
            image_raw = self.extract_text_from_image(image_bytes, mime_type)
            if image_raw:
                image_translation = self.translate_to_japanese(image_raw)

        # 3. 構造化情報の推論
        combined_text = f"{text_raw}\n{image_raw}".strip()
        current_year = date.today().year

        first_line = (text_raw or image_raw or "").split('\n')[0].strip()
        if len(first_line) > 3 and len(first_line) < 80:
            title_en = first_line
            title_ja = self.translate_to_japanese(first_line)
            if not title_ja.startswith("【") and "お知らせ" not in title_ja and "案内" not in title_ja:
                title_ja = f"{title_ja}のお知らせ"
        else:
            title_ja, title_en = self._infer_title(combined_text)

        event_date, raw_date_str = self._extract_date(combined_text, current_year)
        time_start, time_end = self._extract_times(combined_text)
        items_ja, items_en = self._extract_items_strict(combined_text + " " + text_translation + " " + image_translation)
        deadline, deadline_desc = self._extract_deadline(combined_text, text_translation + " " + image_translation, current_year)
        tags = self._infer_tags(combined_text, deadline)

        summary_parts = []
        if text_translation:
            summary_parts.append(f"【メッセージ本文】\n{text_translation}")
        if image_translation:
            summary_parts.append(f"【添付プリント翻訳】\n{image_translation}")
        summary_ja = "\n\n".join(summary_parts) if summary_parts else (text_translation or image_translation or combined_text)

        return {
            "title": title_ja,
            "title_en": title_en,
            "date": event_date,
            "time_start": time_start,
            "time_end": time_end,
            "location": "",
            "target_child": "児童生徒",
            "items": items_ja,
            "items_en": items_en,
            "deadline": deadline,
            "deadline_description": deadline_desc,
            "summary": summary_ja,
            "summary_en": combined_text,
            "text_translation": text_translation,
            "text_raw": text_raw,
            "image_translation": image_translation,
            "image_raw": image_raw,
            "source_text": combined_text,
            "source_date_raw": raw_date_str or (event_date if event_date else ""),
            "tags": tags
        }

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
                contents.append("この英語の学校プリント画像を読み取り、画像内の英文を日本語に翻訳した上で指定のJSON形式で出力してください。")
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

    def _intelligent_parse_with_translation(self, image_bytes: Optional[bytes], text_content: str) -> Dict[str, Any]:
        raw_text = text_content.strip()
        current_year = date.today().year

        # 1. 英語全文を自然な日本語に翻訳
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

        # 4. 開始・終了時刻
        time_start, time_end = self._extract_times(raw_text)

        # 5. 持ち物の抽出（本文に明記がある場合のみ抽出、デフォルトは空）
        items_ja, items_en = self._extract_items_strict(raw_text + " " + translated_full_text)

        # 6. 提出締切
        deadline, deadline_desc = self._extract_deadline(raw_text, translated_full_text, current_year)

        # 7. タグの推論（教科・カテゴリ別）
        tags = self._infer_tags(raw_text, deadline)

        # 8. 要約
        summary_ja = translated_full_text if translated_full_text else raw_text

        return {
            "title": title_ja,
            "title_en": title_en,
            "date": event_date,
            "time_start": time_start,
            "time_end": time_end,
            "location": "",
            "target_child": "児童生徒",
            "items": items_ja,
            "items_en": items_en,
            "deadline": deadline,
            "deadline_description": deadline_desc,
            "summary": summary_ja,
            "summary_en": raw_text,
            "source_text": raw_text,
            "source_date_raw": raw_date_str or (event_date if event_date else ""),
            "tags": tags
        }

    def _infer_title(self, text: str):
        t_low = text.lower()
        if "mandarin" in t_low or "chinese" in t_low:
            return "中国語（Mandarin）レッスンのお知らせ", "Mandarin Lesson Notice"
        elif "uoi" in t_low or "summative" in t_low or "assessment" in t_low:
            return "UOI 総括評価 (SA) のお知らせ", "Summative Assessment for UOI"
        elif "art" in t_low or "craft" in t_low:
            return "アート・図工アクティビティのご案内", "Art & Craft Activity Notice"
        elif "music" in t_low or "concert" in t_low:
            return "音楽（Music）・コンサートのご案内", "Music Lesson & Concert Notice"
        elif "field trip" in t_low:
            return "校外学習・遠足のお知らせ", "Field Trip Announcement"
        else:
            return "学校からのおたより・連絡事項", "School Announcement Notice"

    def _infer_tags(self, text: str, deadline: Optional[str]):
        t_low = text.lower()
        tags = []

        if any(w in t_low for w in ["uoi", "inquiry", "english", "literacy", "phonics", "reading", "writing", "spelling", "summative", "assessment", "presentation"]):
            tags.append("英語・UOI")
        
        if any(w in t_low for w in ["chinese", "mandarin", "hanyu", "中文", "华语", "pinyin"]):
            tags.append("中国語")

        if any(w in t_low for w in ["art", "craft", "drawing", "painting", "shoe box", "sticker", "coloured paper", "color paper"]):
            tags.append("アート")

        if any(w in t_low for w in ["music", "concert", "singing", "song", "choir", "instrument", "piano", "recorder"]):
            tags.append("Music")

        if any(w in t_low for w in ["pe", "physical education", "sports", "swimming", "athletic"]):
            tags.append("体育・PE")

        if any(w in t_low for w in ["field trip", "ceremony", "pta", "photo", "holiday", "dismissal"]):
            tags.append("学校行事")

        if deadline:
            tags.append("提出物あり")

        if not tags:
            tags.append("英語・UOI")

        return tags

    def _extract_date(self, text: str, current_year: int):
        # YYYY-MM-DD
        m = re.search(r'\b(202\d)[-/.](\d{1,2})[-/.](\d{1,2})\b', text)
        if m:
            y, mo, d = m.groups()
            return f"{y}-{int(mo):02d}-{int(d):02d}", m.group(0)

        # Day Month (e.g. 7 September 2026, 7 Sept)
        m_day_first = re.search(r'\b(\d{1,2})(?:st|nd|rd|th)?\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s*(202\d)?\b', text, re.IGNORECASE)
        if m_day_first:
            day = int(m_day_first.group(1))
            mo_str = m_day_first.group(2).lower()
            mo = MONTH_MAP.get(mo_str[:3], 9)
            y = int(m_day_first.group(3)) if m_day_first.group(3) else current_year
            return f"{y}-{mo:02d}-{day:02d}", m_day_first.group(0)

        # Month Day (e.g. September 7th, 2026)
        m2 = re.search(r'\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(202\d))?\b', text, re.IGNORECASE)
        if m2:
            mo_str = m2.group(1).lower()
            day = int(m2.group(2))
            mo = MONTH_MAP.get(mo_str[:3], 9)
            y = int(m2.group(3)) if m2.group(3) else current_year
            return f"{y}-{mo:02d}-{day:02d}", m2.group(0)

        return None, None

    def _extract_times(self, text: str):
        times = re.findall(r'\b(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?\b', text)
        if not times:
            return None, None

        formatted = []
        for h, m, meridiem in times:
            hour = int(h)
            if meridiem and meridiem.lower() == 'pm' and hour < 12:
                hour += 12
            elif meridiem and meridiem.lower() == 'am' and hour == 12:
                hour = 0
            formatted.append(f"{hour:02d}:{m}")

        time_start = formatted[0] if len(formatted) > 0 else None
        time_end = formatted[1] if len(formatted) > 1 else None
        return time_start, time_end

    def _extract_items_strict(self, text: str):
        """明記されている場合のみ抽出、それ以外は空リスト"""
        t_low = text.lower()
        items_ja = []
        items_en = []

        # 「prepare and send」「bring following items」「materials」等のコンテキストがあるか、明示的な品名がある場合のみ
        patterns = [
            (r'\b(shoe\s*box|シューズボックス|靴箱)\b', '靴箱・シューズボックス (Shoe Box)', 'Shoe Box'),
            (r'\b(sticker|stickers|シール|ステッカー)\b', '装飾用ステッカー・シール (Stickers)', 'Stickers'),
            (r'\b(personal\s*photo|photos|pictures|写真)\b', '写真・個人写真 (Photos)', 'Personal Photo'),
            (r'\b(coloured\s*paper|color\s*paper|色紙|画用紙)\b', 'アクティビティ用色紙 (Coloured Paper)', 'Coloured Paper'),
            (r'\b(apron|cooking\s*apron|エプロン)\b', 'エプロン (Apron)', 'Apron'),
            (r'\b(water\s*bottle|水筒)\b', '水筒 (Water Bottle)', 'Water Bottle'),
            (r'\b(lunch\s*box|packed\s*lunch|お弁当)\b', 'お弁当 (Lunch Box)', 'Packed Lunch'),
            (r'\b(indoor\s*shoes|上履き)\b', '上履き (Indoor Shoes)', 'Indoor Shoes'),
            (r'\b(towel|タオル)\b', 'タオル (Towel)', 'Towel'),
            (r'\b(swimwear|水着)\b', '水着 (Swimwear)', 'Swimwear'),
            (r'\b(costume|仮装)\b', 'コスチューム・仮装 (Costume)', 'Costume'),
            (r'\b(work\s*gloves|軍手)\b', '軍手 (Work Gloves)', 'Work Gloves'),
            (r'\b(permission\s*slip|同意書|提出用紙)\b', '提出用紙・同意書 (Permission Slip)', 'Signed Slip')
        ]

        for pat, ja_lbl, en_lbl in patterns:
            if re.search(pat, t_low):
                if ja_lbl not in items_ja:
                    items_ja.append(ja_lbl)
                    items_en.append(en_lbl)

        return items_ja, items_en

    def _extract_deadline(self, raw_text: str, trans_text: str, current_year: int):
        combined = (raw_text + " " + trans_text).lower()
        if any(w in combined for w in ["due", "deadline", "return by", "submit by", "締切", "期日"]):
            m = re.search(r'(?:due|return by|submit by|deadline|締切|期日)[:\s]+(?:on\s+)?([A-Za-z]+)\.?\s+(\d{1,2})', raw_text, re.IGNORECASE)
            if m:
                mo_str = m.group(1).lower()
                day = int(m.group(2))
                mo = MONTH_MAP.get(mo_str[:3], 9)
                return f"{current_year}-{mo:02d}-{day:02d}", "提出・持参期日"
        return None, ""

ai_service = AIService()
