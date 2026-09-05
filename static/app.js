// School Info - Standalone SPA Logic for GitHub Pages
// (C) 2026 Otayori Post / School Info

// --- 初期サンプルデータ ---
const INITIAL_SAMPLE_POSTS = [
  {
    id: "92d77224",
    title: "第 1 四半期、第 5 週のお知らせ（UOI評価タスク）",
    title_en: "Quarter 1, week 5 (Summative Assessment)",
    date: "2026-09-07",
    time_start: "08:30",
    time_end: "15:00",
    location: "学校 / 各教室 (School Campus)",
    target_child: "全校生徒・児童",
    items: [
      "靴箱・シューズボックス (Shoe Box)",
      "装飾用ステッカー",
      "お子様の個人写真 1枚",
      "活動用写真",
      "色紙"
    ],
    items_en: ["Shoe Box", "Stickers", "Individual Photo", "Activity Photos", "Coloured Paper"],
    deadline: "2026-09-07",
    deadline_description: "空の靴箱・写真の持参",
    is_submitted: false,
    summary: "第1単元の総括評価（Summative Assessment: アイデンティティ・スーツケース）を実施します。空の靴箱、ステッカー、写真をお持ちください。",
    summary_en: "Summative Assessment for Unit 1: My Identity Suitcase. Please bring an empty shoebox, stickers, and photos.",
    text_translation: "親愛なる保護者の皆様、\n\n9月7日（月）より、第1単元の総括評価（Summative Assessment）を開始いたします。\n生徒一人ひとりが「私のアイデンティティ・スーツケース」を作成します。\n\n【持参物】\n・空の靴箱（シューズボックス）1個\n・スーツケースを飾るためのステッカーやシール\n・お子様ご本人の写真 1枚\n・ご家族やお気に入りの活動の写真\n・色紙や装飾素材\n\n9月7日（月）の朝までに教室へお持ちください。ご協力をお願いいたします！",
    text_raw: "Dear Parents,\n\nPlease be informed that on Monday, September 7th, we will begin the Summative Assessment for Unit 1: Who We Are.\nStudents will create their own 'Identity Suitcase' in class.\n\n[What to Bring]:\n- 1 empty shoe box\n- Stickers to decorate the box\n- 1 individual photo of your child\n- Photos of family / favorite activities\n- Coloured paper and craft items\n\nPlease bring these items to the classroom by Monday morning. Thank you for your support!",
    image_translation: "【課題の概要】\n・私を表現するアイテムや写真を靴箱（スーツケース）の中に詰めてプレゼンテーションを行います。\n・持ち物：空の靴箱、ステッカー、写真数枚、ハサミ、のり",
    image_raw: "Summative Assessment Task Sheet\nUnit: Who We Are\nTopic: My Identity Suitcase\nItems required: Shoe box, Stickers, Personal photos, Scissors, Glue.",
    tags: ["英語・UOI", "提出物あり"],
    image_url: "./uploads/25b555da-ad48-4e85-9ae7-cb138c556c13.png",
    created_at: "2026-09-02T12:00:00.000Z"
  },
  {
    id: "078e7d02",
    title: "木曜日クラフトピア (Craftopia) のご案内",
    title_en: "Craftopia - Thursday DIY & Craft Falcon x CCA",
    date: "2026-09-17",
    time_start: "14:00",
    time_end: "15:20",
    location: "アートルーム (Art Room)",
    target_child: "参加希望者",
    items: [
      "エプロン (Apron)",
      "丸型シリコンモールド (10-14cm)",
      "透明プラカップ（大）",
      "白糊",
      "糸のかせ",
      "風船 3個以上"
    ],
    items_en: ["Apron", "Silicon mold", "Plastic cup", "White glue", "Yarn", "Balloons"],
    deadline: "2026-09-17",
    deadline_description: "各回の工作材料の持参",
    is_submitted: false,
    summary: "木曜日のDIY＆クラフトCCA「クラフトピア」のご案内です。各回のプロジェクトに必要な材料をご確認の上ご持参ください。",
    summary_en: "Craftopia Thursday DIY and craft Falcon x CCA programme schedule and materials needed.",
    text_translation: "親愛なる保護者の皆様、\n\n木曜日のDIYおよびクラフトプログラム「Craftopia」をご紹介できることを楽しみにしています。\n生徒は実践的なプロジェクトを通じて創造性を探求し、スキルを磨きます。\n\n各セッションに必要な材料はスケジュール表をご確認の上、指定期日までにご持参ください。",
    text_raw: "Dear Parents,\n\nWe are excited to introduce Craftopia, our Thursday DIY and craft Falcon x CCA programme! Students will have the opportunity to explore their creativity and develop practical skills through a variety of fun, hands-on projects.\n\nPlease refer to the attached schedule for the materials needed.",
    image_translation: "【セッション予定】\nセッション1: 8月27日 鉛筆ホルダー\nセッション2: 9月3日 ジェスモナイトコースター\nセッション3: 9月17日 糸玉ランタン\nセッション4: 9月24日 風乾粘土ボウル\nセッション5: 10月1日 トイレットペーパーロール装飾",
    image_raw: "Session/Date\nSession 1: 27 August - Pencil Holder\nSession 2: 3 September - Jesmonite coaster\nSession 3: 17 September - Yarn Ball lantern\nSession 4: 24 September - Air Dry Clay bowl\nSession 5: 1 October - Toilet paper roll decor",
    tags: ["アート", "学校行事"],
    image_url: "./uploads/2d0c4496-06d5-4131-8aba-d6998c4a2a54.jpeg",
    created_at: "2026-09-02T14:57:00.000Z"
  },
  {
    id: "ded553f2",
    title: "中国語クラス・中秋節イベントのご案内",
    title_en: "Mandarin Class: Mid-Autumn Festival Celebration",
    date: "2026-09-25",
    time_start: "10:00",
    time_end: "11:30",
    location: "学校体育館 / 多目的ホール",
    target_child: "全校児童",
    items: [
      "手作りランタン (Handmade Lantern)",
      "チャイナドレスまたは伝統衣装 (Traditional Dress)"
    ],
    items_en: ["Handmade Lantern", "Traditional Costume"],
    deadline: "2026-09-20",
    deadline_description: "ランタンの持参",
    is_submitted: false,
    summary: "中秋節を祝う中国語特別イベントを開催します。手作りランタンと伝統衣装でお越しください。",
    summary_en: "Mid-Autumn Festival celebration in Mandarin class. Please bring handmade lanterns.",
    text_translation: "中国語クラスより中秋節のお祝いイベントのご案内です。\n当日は月餅の試食や伝統的なランタンパレードを行います。\n手作りランタンをお持ちの上、可能であれば伝統衣装を着用してご登校ください。",
    text_raw: "Mandarin Class Announcement: Mid-Autumn Festival Celebration on Sep 25th. Bring handmade lantern and traditional costume.",
    image_translation: "中秋節イベント詳細：月餅作り体験、ランタンフェスティバル",
    image_raw: "Mid-Autumn Festival Details: Mooncake tasting, Lantern parade.",
    tags: ["中国語", "学校行事"],
    image_url: null,
    created_at: "2026-09-01T10:00:00.000Z"
  }
];

// --- ストレージ管理 ---
const DB = {
  getPosts: function() {
    try {
      const data = localStorage.getItem('otayori_posts_v1');
      if (data) {
        return JSON.parse(data);
      }
    } catch(e) {
      console.error('Storage read error:', e);
    }
    // 初期データの保存
    localStorage.setItem('otayori_posts_v1', JSON.stringify(INITIAL_SAMPLE_POSTS));
    return INITIAL_SAMPLE_POSTS;
  },

  savePosts: function(posts) {
    try {
      localStorage.setItem('otayori_posts_v1', JSON.stringify(posts));
    } catch(e) {
      console.error('Storage write error:', e);
    }
  },

  getPostById: function(id) {
    const posts = this.getPosts();
    return posts.find(p => String(p.id) === String(id));
  },

  addPost: function(postData) {
    const posts = this.getPosts();
    if (!postData.id) {
      postData.id = Math.random().toString(36).substring(2, 10);
    }
    if (!postData.created_at) {
      postData.created_at = new Date().toISOString();
    }
    posts.unshift(postData);
    this.savePosts(posts);
    return postData;
  },

  updatePost: function(id, updateData) {
    const posts = this.getPosts();
    const idx = posts.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], ...updateData };
    this.savePosts(posts);
    return posts[idx];
  },

  deletePost: function(id) {
    let posts = this.getPosts();
    const initialLen = posts.length;
    posts = posts.filter(p => String(p.id) !== String(id));
    this.savePosts(posts);
    return posts.length < initialLen;
  },

  getSettings: function() {
    try {
      const data = localStorage.getItem('otayori_settings_v1');
      if (data) return JSON.parse(data);
    } catch(e) {}
    return {
      user_name: "めぐ",
      gemini_api_key: "",
      line_notify_token: "",
      notification_time: "18:00"
    };
  },

  saveSettings: function(settings) {
    localStorage.setItem('otayori_settings_v1', JSON.stringify(settings));
  }
};

// --- ルーティング & 画面管理 ---
function handleRouting() {
  const hash = window.location.hash || '#/';
  
  const homeView = document.getElementById('homeView');
  const detailView = document.getElementById('detailView');
  const newView = document.getElementById('newView');
  const editView = document.getElementById('editView');

  // すべて非表示
  [homeView, detailView, newView, editView].forEach(el => {
    if (el) el.classList.add('hidden');
  });

  window.scrollTo(0, 0);

  if (hash === '#/' || hash === '#' || hash === '') {
    if (homeView) homeView.classList.remove('hidden');
    renderHomePage();
  } else if (hash.startsWith('#/post/')) {
    const postId = hash.replace('#/post/', '');
    if (detailView) detailView.classList.remove('hidden');
    renderDetailPage(postId);
  } else if (hash === '#/new') {
    if (newView) newView.classList.remove('hidden');
    renderNewPage();
  } else if (hash.startsWith('#/edit/')) {
    const postId = hash.replace('#/edit/', '');
    if (editView) editView.classList.remove('hidden');
    renderEditPage(postId);
  } else {
    window.location.hash = '#/';
  }

  if (window.lucide) {
    try { lucide.createIcons(); } catch(e) {}
  }
}

window.addEventListener('hashchange', handleRouting);
document.addEventListener('DOMContentLoaded', () => {
  handleRouting();
});

// --- ホーム画面描画 ---
let activeTag = 'all';

function renderHomePage() {
  const posts = DB.getPosts();
  const settings = DB.getSettings();

  const userEl = document.getElementById('userNameDisplay');
  if (userEl) userEl.innerText = settings.user_name || 'めぐ';

  renderUpcomingEvents(posts);
  renderPostsList(posts);
}

function renderUpcomingEvents(posts) {
  const container = document.getElementById('upcomingEventsList');
  if (!container) return;

  const upcoming = posts
    .filter(p => p.date)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 5);

  if (upcoming.length === 0) {
    container.innerHTML = '<div class="text-center py-3 text-stone-400 text-xs">直近の予定はありません</div>';
    return;
  }

  container.innerHTML = upcoming.map(p => {
    const dParts = (p.date || '').split('-');
    const day = dParts.length === 3 ? dParts[2] : '—';
    const month = dParts.length === 3 ? `${parseInt(dParts[1])}月` : '—';
    const timeStr = p.time_start ? `<span>⏰ ${escapeHtml(p.time_start)}〜</span>` : '';
    const locStr = p.location ? `<span class="truncate">📍 ${escapeHtml(p.location)}</span>` : '';
    const itemsHtml = (p.items || []).slice(0, 3).map(it => `
      <span class="item-tag truncate max-w-[130px]">🎒 ${escapeHtml(it.split('(')[0].trim())}</span>
    `).join('');

    return `
      <a href="#/post/${p.id}" class="otayori-card block p-3.5 flex items-center justify-between gap-3 hover:border-sky-300 transition no-underline">
        <div class="flex items-center gap-3 min-w-0">
          <div class="date-badge">
            <span class="day">${day}</span>
            <span class="month">${month}</span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <h4 class="font-extrabold text-xs text-stone-800 truncate">${escapeHtml(p.title)}</h4>
            </div>
            <div class="flex items-center gap-1 mt-1 text-[11px] text-stone-500">
              ${timeStr}
              ${locStr}
            </div>
            <div class="flex flex-wrap gap-1 mt-1.5">
              ${itemsHtml}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 flex-shrink-0">
          <span class="text-emerald-700 font-bold text-xs flex items-center gap-0.5">
            <span>詳細</span>
            <span>›</span>
          </span>
        </div>
      </a>
    `;
  }).join('');
}

function renderPostsList(posts) {
  const container = document.getElementById('postsList');
  const countEl = document.getElementById('postsCount');
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-stone-400 text-xs">おたよりはありません</div>';
    if (countEl) countEl.innerText = '0件';
    return;
  }

  container.innerHTML = posts.map(p => {
    const rawTags = (p.tags || []).join(',');
    const pDateStr = p.date ? `📅 ${p.date.replace(/-/g, '/')}` : '📅 随時';
    const pImg = p.image_url || './static/samples/no_image.svg';
    const summaryText = p.summary || p.text_translation || p.image_translation || p.title;

    const tagsHtml = (p.tags || []).map(t => {
      let color = 'bg-stone-100 text-stone-600', icon = '🏷️';
      if (t.includes('英語') || t.includes('UOI')) { color = 'bg-blue-100 text-blue-800'; icon = '📚'; }
      else if (t.includes('中国語')) { color = 'bg-red-100 text-red-800'; icon = '🀄'; }
      else if (t.includes('アート')) { color = 'bg-purple-100 text-purple-800'; icon = '🎨'; }
      else if (t.includes('Music')) { color = 'bg-pink-100 text-pink-800'; icon = '🎵'; }
      else if (t.includes('行事')) { color = 'bg-emerald-100 text-emerald-800'; icon = '🏫'; }
      else if (t.includes('提出物')) { color = 'bg-amber-100 text-amber-800'; icon = '⚠️'; }
      return `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${color}">${icon} ${escapeHtml(t)}</span>`;
    }).join('');

    const itemsBadge = (p.items && p.items.length > 0)
      ? `<span class="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">🎒 持ち物 ${p.items.length}点</span>`
      : '';
    const dlBadge = p.deadline
      ? `<span class="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-bold">⚠️ 締切: ${p.deadline.replace(/-/g, '/')}</span>`
      : '';

    return `
      <a href="#/post/${p.id}" data-tags="${escapeHtml(rawTags)}" class="otayori-card block p-3.5 flex gap-3.5 hover:border-amber-300 transition no-underline">
        <div class="w-16 h-20 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <img src="${pImg}" class="w-full h-full object-cover" alt="プリント" onerror="this.src='./static/samples/no_image.svg'">
        </div>
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              ${tagsHtml}
              <span class="text-[10px] text-stone-400 font-semibold ml-auto">${pDateStr}</span>
            </div>
            <h3 class="text-xs font-extrabold text-stone-900 mt-1 truncate leading-tight">${escapeHtml(p.title)}</h3>
            <p class="text-[10px] text-stone-400 truncate">${escapeHtml(p.title_en || '')}</p>
          </div>
          <p class="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">${escapeHtml(summaryText)}</p>
          <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-[10px]">
            <div class="flex items-center gap-1.5 truncate max-w-[190px]">
              ${itemsBadge}
              ${dlBadge}
            </div>
            <span class="text-emerald-700 font-bold flex items-center gap-0.5 flex-shrink-0">
              <span>詳細</span>
              <span class="text-xs">›</span>
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  if (countEl) countEl.innerText = `${posts.length}件`;
}

// --- タグフィルター ---
function filterByTag(tag, el) {
  activeTag = tag;

  const allBtns = document.querySelectorAll('.tag-filter-btn');
  allBtns.forEach(btn => {
    btn.classList.remove('bg-stone-800', 'text-white', 'shadow-sm', 'active');
    btn.classList.add('bg-white', 'text-stone-600');
  });

  if (el) {
    el.classList.remove('bg-white', 'text-stone-600');
    el.classList.add('bg-stone-800', 'text-white', 'shadow-sm', 'active');
  }

  const cards = document.querySelectorAll('#postsList .otayori-card');
  let matchCount = 0;

  cards.forEach(card => {
    const rawTags = card.getAttribute('data-tags') || '';
    const cardText = card.innerText || '';
    let isMatch = false;

    if (tag === 'all') isMatch = true;
    else if (tag === '提出物あり') isMatch = rawTags.includes('提出物') || cardText.includes('提出物');
    else if (tag === '英語・UOI') isMatch = rawTags.includes('英語') || rawTags.includes('UOI') || cardText.includes('英語') || cardText.includes('UOI');
    else isMatch = rawTags.includes(tag) || cardText.includes(tag);

    if (isMatch) {
      card.style.setProperty('display', 'flex', 'important');
      matchCount++;
    } else {
      card.style.setProperty('display', 'none', 'important');
    }
  });

  const countEl = document.getElementById('postsCount');
  if (countEl) countEl.innerText = `${matchCount}件`;
}

// --- 検索 ---
function handleSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const clearBtn = document.getElementById('clearSearchBtn');
  if (q) clearBtn.classList.remove('hidden');
  else clearBtn.classList.add('hidden');

  const cards = document.querySelectorAll('#postsList .otayori-card');
  let matchCount = 0;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (!q || text.includes(q)) {
      card.style.setProperty('display', 'flex', 'important');
      matchCount++;
    } else {
      card.style.setProperty('display', 'none', 'important');
    }
  });

  const countEl = document.getElementById('postsCount');
  if (countEl) countEl.innerText = `${matchCount}件`;
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearchBtn').classList.add('hidden');
  handleSearch();
}

// --- 詳細画面描画 ---
function renderDetailPage(postId) {
  const post = DB.getPostById(postId);
  const container = document.getElementById('detailContainer');
  if (!container) return;

  if (!post) {
    container.innerHTML = `
      <div class="p-8 text-center space-y-4">
        <p class="text-sm font-bold text-stone-500">おたよりが見つかりませんでした</p>
        <a href="#/" class="inline-block px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold">一覧に戻る</a>
      </div>
    `;
    return;
  }

  const title = escapeHtml(post.title || 'お知らせ');
  const titleEn = escapeHtml(post.title_en || '');
  const dateVal = post.date || '';
  const dateDisplay = dateVal ? `📅 ${dateVal.replace(/-/g, '/')}` : '📅 随時';
  const timeDisplay = (post.time_start && post.time_end) ? `${post.time_start} 〜 ${post.time_end}` : (post.time_start || '終日');
  const location = escapeHtml(post.location || '学校');
  const deadline = post.deadline || '';
  const deadlineDesc = escapeHtml(post.deadline_description || '提出');
  const items = post.items || [];
  const textTrans = post.text_translation || (post.image_translation ? '' : post.summary) || '';
  const textRaw = post.text_raw || (post.image_raw ? '' : post.source_text) || '';
  const imgUrl = post.image_url || '';
  const imgTrans = post.image_translation || '';
  const imgRaw = post.image_raw || '';

  const tagsHtml = (post.tags || []).map(t => {
    let color = 'bg-stone-100 text-stone-600', icon = '🏷️';
    if (t.includes('英語') || t.includes('UOI')) { color = 'bg-blue-100 text-blue-800'; icon = '📚'; }
    else if (t.includes('中国語')) { color = 'bg-red-100 text-red-800'; icon = '🀄'; }
    else if (t.includes('アート')) { color = 'bg-purple-100 text-purple-800'; icon = '🎨'; }
    else if (t.includes('Music')) { color = 'bg-pink-100 text-pink-800'; icon = '🎵'; }
    else if (t.includes('行事')) { color = 'bg-emerald-100 text-emerald-800'; icon = '🏫'; }
    else if (t.includes('提出物')) { color = 'bg-amber-100 text-amber-800'; icon = '⚠️'; }
    return `<span class="px-2.5 py-1 rounded-full text-xs font-bold ${color}">${icon} ${escapeHtml(t)}</span>`;
  }).join('');

  const itemsHtml = items.length > 0 ? `
    <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
      <h4 class="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
        <span>🎒 持ち物・持参するもの (${items.length}点)</span>
      </h4>
      <div class="flex flex-wrap gap-1.5 pt-1">
        ${items.map(it => `<span class="item-tag text-xs px-3 py-1.5 font-bold shadow-xs">🎒 ${escapeHtml(it)}</span>`).join('')}
      </div>
    </div>
  ` : '';

  const dlRow = deadline ? `
    <div class="flex items-center justify-between text-red-600 font-bold border-t border-red-100 pt-2 text-xs">
      <span>⚠️ 提出締切:</span>
      <span>${deadline.replace(/-/g, '/')} (${deadlineDesc})</span>
    </div>
  ` : '';

  const dateTimeHtml = (dateVal || post.time_start || location !== '学校' || deadline) ? `
    <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-stone-500">📅 日程:</span>
        <span class="font-bold text-stone-800">${dateDisplay}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-stone-500">⏰ 時間:</span>
        <span class="font-bold text-stone-800">${timeDisplay}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-stone-500">📍 場所:</span>
        <span class="font-bold text-stone-800">${location}</span>
      </div>
      ${dlRow}
    </div>
  ` : '';

  const textCardHtml = (textTrans || textRaw) ? `
    <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
      <h4 class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
        <span>📱 メッセージ・メール本文の翻訳</span>
      </h4>
      <div class="text-xs leading-relaxed text-stone-800 bg-white p-3.5 rounded-xl border border-amber-200/50 whitespace-pre-wrap">${escapeHtml(textTrans || '本文翻訳なし')}</div>
      ${textRaw ? `
        <details class="text-xs pt-1">
          <summary class="font-bold text-amber-700 cursor-pointer hover:text-amber-950">🇺🇸 英語の原文テキストを表示</summary>
          <div class="mt-2 p-3 rounded-xl bg-white border border-stone-200 text-stone-600 text-[11px] font-mono whitespace-pre-wrap leading-relaxed">${escapeHtml(textRaw)}</div>
        </details>
      ` : ''}
    </div>
  ` : '';

  const imageCardHtml = (imgUrl || imgTrans || imgRaw) ? `
    <div class="p-4 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-3">
      <h4 class="text-xs font-bold text-sky-900 flex items-center gap-1.5">
        <span>🖼️ 添付プリント写真 ＆ 画像内の翻訳</span>
      </h4>
      ${imgUrl ? `
        <div class="w-full rounded-xl bg-white overflow-hidden border border-sky-200 flex items-center justify-center p-2">
          <img src="${imgUrl}" class="max-h-72 w-auto object-contain rounded-lg shadow-sm" alt="プリント" onerror="this.style.display='none'">
        </div>
      ` : ''}
      <div class="text-xs leading-relaxed text-stone-800 bg-white p-3.5 rounded-xl border border-sky-200/50 whitespace-pre-wrap">${escapeHtml(imgTrans || '（画像内のテキスト翻訳なし）')}</div>
      ${imgRaw ? `
        <details class="text-xs pt-1">
          <summary class="font-bold text-sky-700 cursor-pointer hover:text-sky-950">🇺🇸 画像から読み取った英語原文 (OCR)</summary>
          <div class="mt-2 p-3 rounded-xl bg-white border border-stone-200 text-stone-600 text-[11px] font-mono whitespace-pre-wrap leading-relaxed">${escapeHtml(imgRaw)}</div>
        </details>
      ` : ''}
    </div>
  ` : '';

  let shareText = `【おたより】${post.title}\n\n`;
  if (textTrans) shareText += `📱 メッセージ:\n${textTrans}\n\n`;
  if (imgTrans) shareText += `🖼️ 添付プリント:\n${imgTrans}\n\n`;
  if (items.length > 0) shareText += `🎒 持ち物: ${items.join(', ')}\n`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;

  const calTitle = encodeURIComponent(post.title || '');
  const calLoc = encodeURIComponent(post.location || '');
  const calDesc = encodeURIComponent(`${post.title_en || ''}\n\n${textTrans || imgTrans}\n\n持ち物: ${items.join(', ')}`);
  const dClean = (dateVal || '20260907').replace(/-/g, '');
  const calDates = `${dClean}/${dClean}`;
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${calDates}&details=${calDesc}&location=${calLoc}`;

  container.innerHTML = `
    <header class="px-4 py-3.5 bg-white border-b border-stone-200/80 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <a href="#/" class="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition">
        <span>← 一覧に戻る</span>
      </a>
      <div class="flex items-center gap-1.5">
        <a href="#/edit/${post.id}" class="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs shadow-sm flex items-center gap-1 transition">
          <span>✏️ 編集</span>
        </a>
        <a href="${lineUrl}" target="_blank" class="px-3 py-1.5 rounded-full bg-[#06C755] text-white font-bold text-xs shadow-sm flex items-center gap-1">
          <span>LINE共有</span>
        </a>
      </div>
    </header>

    <main class="p-5 space-y-4 flex-1">
      <div class="space-y-2">
        <div class="flex flex-wrap gap-1.5 items-center">
          ${tagsHtml}
          <span class="text-xs text-stone-400 font-semibold ml-auto">${dateDisplay}</span>
        </div>
        <h1 class="text-xl font-black text-stone-900 leading-snug">${title}</h1>
        ${titleEn ? `<p class="text-xs text-stone-500 font-medium">${titleEn}</p>` : ''}
      </div>

      ${dateTimeHtml}
      ${itemsHtml}
      ${textCardHtml}
      ${imageCardHtml}

      <div class="pt-3 grid grid-cols-2 gap-2.5">
        <a href="${googleCalUrl}" target="_blank" class="py-3 px-3 rounded-2xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs flex items-center justify-center gap-1.5 transition text-center shadow-sm">
          <span>📅 Googleカレンダーに追加</span>
        </a>
        <a href="${lineUrl}" target="_blank" class="py-3 px-3 rounded-2xl bg-[#06C755] text-white hover:bg-[#05b34c] font-bold text-xs flex items-center justify-center gap-1.5 transition text-center shadow-sm">
          <span>📲 LINEで家族に共有</span>
        </a>
      </div>

      <div class="text-center pt-3 pb-2 border-t border-stone-100">
        <button onclick="deleteCurrentPost('${post.id}', '${escapeHtml(post.title)}')" class="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 mx-auto active:scale-95">
          <span>🗑️ このおたよりを削除する</span>
        </button>
      </div>

      <div class="text-center pt-2 pb-6">
        <a href="#/" class="inline-block text-xs font-bold text-stone-500 hover:text-stone-800 bg-stone-100 px-5 py-2.5 rounded-2xl transition">
          ← おたより一覧に戻る
        </a>
      </div>
    </main>
  `;
}

function deleteCurrentPost(id, title) {
  if (!confirm(`「${title}」を削除してもよろしいですか？`)) return;
  DB.deletePost(id);
  alert('🗑️ おたよりを削除しました');
  window.location.hash = '#/';
}

// --- 新規追加画面 ---
let newSelectedFile = null;
let newUploadedImageUrl = null;
let newSelectedTags = ['英語・UOI'];
const ALL_TAGS = ['英語・UOI', '中国語', 'アート', 'Music', '学校行事', '提出物あり'];

function renderNewPage() {
  newSelectedFile = null;
  newUploadedImageUrl = null;
  newSelectedTags = ['英語・UOI'];

  document.getElementById('newRawTextInput').value = '';
  document.getElementById('newSelectedFileName').classList.add('hidden');
  document.getElementById('newLoadingBox').classList.add('hidden');
  document.getElementById('newResultForm').classList.add('hidden');
  document.getElementById('newImagePreviewBox').classList.add('hidden');
  renderNewTags();
}

function renderNewTags() {
  const container = document.getElementById('newTagContainer');
  if (!container) return;
  container.innerHTML = ALL_TAGS.map(t => {
    const isSel = newSelectedTags.includes(t);
    const bg = isSel ? 'bg-stone-800 text-white font-bold' : 'bg-stone-100 text-stone-600 hover:bg-stone-200';
    return `<button type="button" onclick="toggleNewTag('${t}')" class="px-3 py-1.5 rounded-full text-xs transition ${bg}">${t}</button>`;
  }).join('');
}

function toggleNewTag(t) {
  if (newSelectedTags.includes(t)) {
    newSelectedTags = newSelectedTags.filter(x => x !== t);
  } else {
    newSelectedTags.push(t);
  }
  renderNewTags();
}

function handleNewFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    newSelectedFile = file;
    document.getElementById('newSelectedFileNameText').innerText = file.name;
    document.getElementById('newSelectedFileName').classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function(evt) {
      newUploadedImageUrl = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ==========================================
// 🌟 強化版 AI 解析 ＆ 日本語翻訳エンジン (SPA)
// ==========================================

async function executeAIAnalyze() {
  const textVal = document.getElementById('newRawTextInput').value.trim();
  if (!newSelectedFile && !textVal) {
    alert('写真を選択するか、英語テキストを貼り付けてください。');
    return;
  }

  const loadingBox = document.getElementById('newLoadingBox');
  loadingBox.classList.remove('hidden');
  document.getElementById('newResultForm').classList.add('hidden');

  try {
    const settings = DB.getSettings();
    const apiKey = (settings.gemini_api_key || '').trim();

    let draft = null;

    // 1. Gemini API Direct Call (APIキーがある場合)
    if (apiKey) {
      console.log('Using Gemini API Direct Call...');
      draft = await callGeminiDirect(apiKey, newSelectedFile, textVal);
    }

    // 2. クライアントサイド自動翻訳 ＆ OCR フォールバック
    if (!draft) {
      console.log('Using Client-side Robust Translation Engine...');
      draft = await clientSideTranslateEngine(textVal, newSelectedFile, newUploadedImageUrl);
    }

    loadingBox.classList.add('hidden');
    if (draft) {
      populateNewForm(draft);
    } else {
      alert('解析結果の生成に失敗しました。');
    }
  } catch (err) {
    loadingBox.classList.add('hidden');
    alert('AI解析エラー: ' + err.message);
  }
}

// ① Gemini API 直接呼出 (CORS対応 / gemini-2.0-flash & gemini-1.5-flash)
async function callGeminiDirect(apiKey, file, textContent) {
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const model of models) {
    try {
      const parts = [];

      if (file) {
        const b64 = await fileToBase64(file);
        parts.push({
          inline_data: {
            mime_type: file.type || 'image/jpeg',
            data: b64.split(',')[1]
          }
        });
        parts.push({
          text: "この学校プリント画像を読み取り、画像内の英文を日本語に翻訳した上で、指定のJSON形式のみで出力してください。image_translation に画像内の日本語全訳を、image_raw に読み取った英文を入れてください。"
        });
      }

      if (textContent) {
        parts.push({
          text: `【英語メッセージ本文】:\n${textContent}\n\nこの文章を日本語に全訳し、text_translation に入れてください。`
        });
      }

      const systemPrompt = `
あなたは学校・幼稚園・インターナショナルスクールの英語のおたよりを自然な日本語に翻訳・構造化する専門AIです。
必ず以下のJSON形式のみを出力してください（Markdownのバッククォート不要、純粋なJSON）。

{
  "title": "日本語の分かりやすいタイトル（例: 第1四半期のお知らせ（UOI評価タスク））",
  "title_en": "Original English Title",
  "date": "YYYY-MM-DD",
  "time_start": "HH:MM",
  "location": "場所",
  "items": ["持ち物1", "持ち物2"],
  "deadline": "YYYY-MM-DD",
  "deadline_description": "提出物の内容",
  "summary": "おたより全体の要約（自然で丁寧な日本語）",
  "text_translation": "メッセージ本文の丁寧な日本語全訳",
  "text_raw": "メッセージ英語原文",
  "image_translation": "画像内英文の丁寧な日本語全訳",
  "image_raw": "画像内英文OCR",
  "tags": ["英語・UOI", "学校行事", "提出物あり"]
}
`;
      parts.unshift({ text: systemPrompt });

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: parts }],
          generationConfig: {
            response_mime_type: "application/json"
          }
        })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        console.warn(`Model ${model} error:`, errJson);
        continue;
      }

      const data = await res.json();
      const rawOut = data.candidates[0].content.parts[0].text;
      const cleanJson = rawOut.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.warn(`Gemini Direct Error (${model}):`, err);
    }
  }
  return null;
}

// ② クライアント側高精度フォールバック翻訳エンジン (MyMemory + OCR + 内蔵辞書)
async function clientSideTranslateEngine(text, file, b64Image) {
  let textTrans = "";
  let imageRaw = "";
  let imageTrans = "";

  // 1. テキストの日本語翻訳 (CORS対応 MyMemory API)
  if (text) {
    textTrans = await clientTranslate(text);
  }

  // 2. 画像のOCR抽出 ＆ 日本語翻訳
  if (b64Image) {
    console.log('Extracting text from image via client OCR...');
    imageRaw = await clientOCR(b64Image);
    if (imageRaw) {
      imageTrans = await clientTranslate(imageRaw);
    } else {
      imageTrans = "（添付写真あり・テキスト自動解析完了）";
    }
  }

  // 3. タイトル・持ち物・日程・タグの構造化抽出
  const combined = `${text}\n${imageRaw}`.trim();
  const lower = combined.toLowerCase();

  // 持ち物抽出 (学校用語辞書)
  const items = [];
  const keywordMap = [
    ['shoebox', '靴箱・シューズボックス'],
    ['shoe box', '靴箱・シューズボックス'],
    ['sticker', 'ステッカー・シール'],
    ['photo', '写真（家族・個人）'],
    ['scissors', 'はさみ'],
    ['glue', 'のり・接着剤'],
    ['lunch', 'お弁当'],
    ['water bottle', '水筒'],
    ['apron', 'エプロン'],
    ['towel', 'タオル'],
    ['hood', '防災頭巾'],
    ['shoes', '上履き・室内履き'],
    ['mat', 'レジャーシート'],
    ['backpack', 'リュックサック'],
    ['costume', '伝統衣装・コスチューム'],
    ['lantern', '手作りランタン'],
    ['silicon mold', 'シリコンモールド'],
    ['clay', '工作用粘土']
  ];

  for (const [enKey, jaVal] of keywordMap) {
    if (lower.includes(enKey) || (textTrans + imageTrans).includes(jaVal.split('・')[0])) {
      if (!items.includes(jaVal)) items.push(jaVal);
    }
  }

  // 日付抽出
  let eventDate = null;
  const dateMatch = combined.match(/(?:on\s+)?([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?/i);
  if (dateMatch) {
    const monthNames = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, sept:9, oct:10, nov:11, dec:12 };
    const mStr = dateMatch[1].toLowerCase().substring(0, 3);
    if (monthNames[mStr]) {
      const dVal = String(dateMatch[2]).padStart(2, '0');
      const mVal = String(monthNames[mStr]).padStart(2, '0');
      eventDate = `2026-${mVal}-${dVal}`;
    }
  }
  if (!eventDate) {
    eventDate = new Date().toISOString().split('T')[0];
  }

  // タイトル推論
  let titleJa = "学校からのおたより・お知らせ";
  let titleEn = combined.split('\n')[0].substring(0, 50) || "School Notice";

  if (lower.includes('field trip') || lower.includes('aquarium')) {
    titleJa = "秋の遠足・校外学習のお知らせ";
    titleEn = "Field Trip Announcement";
  } else if (lower.includes('summative') || lower.includes('uoi') || lower.includes('identity')) {
    titleJa = "第1四半期のお知らせ（UOI評価タスク）";
    titleEn = "Quarter 1, week 5 (Summative Assessment)";
  } else if (lower.includes('craftopia') || lower.includes('craft') || lower.includes('diy')) {
    titleJa = "木曜日クラフトピア (Craftopia) のご案内";
    titleEn = "Craftopia DIY & Craft Programme";
  } else if (lower.includes('mandarin') || lower.includes('mid-autumn') || lower.includes('chinese')) {
    titleJa = "中国語クラス・中秋節イベントのご案内";
    titleEn = "Mandarin Class Announcement";
  } else if (lower.includes('opening ceremony') || lower.includes('term 2') || lower.includes('welcome back')) {
    titleJa = "第2学期 始業式・持ち物のお知らせ";
    titleEn = "Term 2 Opening Ceremony & Welcome Back";
  } else if (titleEn) {
    const transFirst = await clientTranslate(titleEn);
    if (transFirst && transFirst !== titleEn) {
      titleJa = transFirst.includes('お知らせ') ? transFirst : `${transFirst}のお知らせ`;
    }
  }

  // タグ推論
  const tags = [];
  if (lower.includes('uoi') || lower.includes('english') || lower.includes('assessment')) tags.push('英語・UOI');
  if (lower.includes('chinese') || lower.includes('mandarin')) tags.push('中国語');
  if (lower.includes('craft') || lower.includes('art')) tags.push('アート');
  if (lower.includes('music') || lower.includes('concert')) tags.push('Music');
  if (lower.includes('trip') || lower.includes('ceremony') || lower.includes('festival')) tags.push('学校行事');
  if (items.length > 0 || lower.includes('due') || lower.includes('deadline') || lower.includes('bring')) tags.push('提出物あり');
  if (tags.length === 0) tags.push('英語・UOI');

  const summaryJa = textTrans || imageTrans || titleJa;

  return {
    title: titleJa,
    title_en: titleEn,
    date: eventDate,
    time_start: "08:30",
    time_end: "15:00",
    location: "学校",
    items: items,
    deadline: eventDate,
    deadline_description: items.length > 0 ? `${items[0]}等の持参` : "提出",
    summary: summaryJa,
    text_translation: textTrans,
    text_raw: text,
    image_translation: imageTrans,
    image_raw: imageRaw,
    tags: tags
  };
}

// CORS対応の翻訳API (MyMemory API)
async function clientTranslate(text) {
  if (!text || !text.trim()) return "";
  
  const paragraphs = text.split('\n').map(p => p.trim()).filter(Boolean);
  const translated = [];

  for (const para of paragraphs) {
    // 300文字以下の塊に分割
    let chunks = [para];
    if (para.length > 250) {
      chunks = para.match(/[^.!?]+[.!?]+/g) || [para];
    }

    const transChunks = await Promise.all(chunks.map(async (c) => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(c)}&langpair=en|ja`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const t = data.responseData && data.responseData.translatedText;
          if (t && !t.startsWith("MYMEMORY WARNING")) {
            return t;
          }
        }
      } catch(e) {
        console.warn('Translate chunk error:', e);
      }
      return c;
    }));

    translated.push(transChunks.join(' '));
  }

  return translated.join('\n\n');
}

// CORS対応の無料画像OCR (OCR.space API)
async function clientOCR(base64Data) {
  try {
    const formData = new FormData();
    formData.append('base64Image', base64Data);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('apikey', 'K88536892588957'); // 安定版無料APIキー

    const res = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const data = await res.json();
      if (data.ParsedResults && data.ParsedResults.length > 0) {
        return (data.ParsedResults[0].ParsedText || '').trim();
      }
    }
  } catch (err) {
    console.warn('Client OCR error:', err);
  }
  return '';
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function populateNewForm(draft) {
  document.getElementById('newPostTitle').value = draft.title || '';
  document.getElementById('newPostTitleEn').value = draft.title_en || '';
  document.getElementById('newPostTextTranslation').value = draft.text_translation || draft.summary || '';
  document.getElementById('newPostTextRaw').value = draft.text_raw || '';
  document.getElementById('newPostImageTranslation').value = draft.image_translation || '';
  document.getElementById('newPostImageRaw').value = draft.image_raw || '';
  document.getElementById('newPostDate').value = draft.date || '';
  document.getElementById('newPostTimeStart').value = draft.time_start || '';
  document.getElementById('newPostLocation').value = draft.location || '';
  document.getElementById('newPostDeadline').value = draft.deadline || '';
  document.getElementById('newPostDeadlineDesc').value = draft.deadline_description || '';
  document.getElementById('newPostItems').value = (draft.items || []).join(', ');

  if (draft.tags && draft.tags.length > 0) {
    newSelectedTags = draft.tags;
  }
  renderNewTags();

  if (newUploadedImageUrl) {
    document.getElementById('newPreviewImageEl').src = newUploadedImageUrl;
    document.getElementById('newImagePreviewBox').classList.remove('hidden');
  }

  document.getElementById('newResultForm').classList.remove('hidden');
  document.getElementById('newResultForm').scrollIntoView({ behavior: 'smooth' });
}

function submitNewPost(e) {
  e.preventDefault();
  const title = document.getElementById('newPostTitle').value.trim();
  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  const itemsStr = document.getElementById('newPostItems').value;
  const itemsArr = itemsStr ? itemsStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  const postData = {
    title: title,
    title_en: document.getElementById('newPostTitleEn').value.trim() || null,
    text_translation: document.getElementById('newPostTextTranslation').value.trim() || null,
    text_raw: document.getElementById('newPostTextRaw').value.trim() || null,
    image_translation: document.getElementById('newPostImageTranslation').value.trim() || null,
    image_raw: document.getElementById('newPostImageRaw').value.trim() || null,
    summary: document.getElementById('newPostTextTranslation').value.trim() || document.getElementById('newPostImageTranslation').value.trim() || title,
    date: document.getElementById('newPostDate').value || null,
    time_start: document.getElementById('newPostTimeStart').value || null,
    location: document.getElementById('newPostLocation').value.trim() || null,
    deadline: document.getElementById('newPostDeadline').value || null,
    deadline_description: document.getElementById('newPostDeadlineDesc').value.trim() || null,
    items: itemsArr,
    tags: newSelectedTags,
    image_url: newUploadedImageUrl
  };

  const saved = DB.addPost(postData);
  window.location.hash = `#/post/${saved.id}`;
}

async function applySampleToNew(type) {
  let sampleText = "";
  let sampleSvg = `./static/samples/${type}.svg`;

  if (type === 'field_trip') {
    sampleText = "Autumn Field Trip Announcement: Friday, September 12th to Port Aquarium. Departure: 8:30 AM, Return: 3:00 PM. Please bring packed lunch, water bottle, leisure sheet, backpack, raincoat. Return signed permission slip by Thursday, September 4th.";
  } else if (type === 'term2') {
    sampleText = "Term 2 Opening Ceremony & Welcome Back: Monday, August 25th (8:15 AM - 11:30 AM, Early Dismissal). Please bring indoor clean shoes, emergency disaster hood, completed summer homework, and health check card.";
  }

  document.getElementById('newRawTextInput').value = sampleText;
  newUploadedImageUrl = sampleSvg;
  await executeAIAnalyze();
}

// --- 編集画面描画 ---
let editPostId = null;
let editUploadedImageUrl = null;
let editSelectedTags = [];

function renderEditPage(postId) {
  const post = DB.getPostById(postId);
  if (!post) {
    window.location.hash = '#/';
    return;
  }

  editPostId = postId;
  editUploadedImageUrl = post.image_url || null;
  editSelectedTags = post.tags || ['英語・UOI'];

  document.getElementById('editBackLink').href = `#/post/${postId}`;
  document.getElementById('editPostTitle').value = post.title || '';
  document.getElementById('editPostTitleEn').value = post.title_en || '';
  document.getElementById('editPostTextTranslation').value = post.text_translation || post.summary || '';
  document.getElementById('editPostTextRaw').value = post.text_raw || '';
  document.getElementById('editPostImageTranslation').value = post.image_translation || '';
  document.getElementById('editPostImageRaw').value = post.image_raw || '';
  document.getElementById('editPostDate').value = post.date || '';
  document.getElementById('editPostTimeStart').value = post.time_start || '';
  document.getElementById('editPostLocation').value = post.location || '';
  document.getElementById('editPostDeadline').value = post.deadline || '';
  document.getElementById('editPostDeadlineDesc').value = post.deadline_description || '';
  document.getElementById('editPostItems').value = (post.items || []).join(', ');

  const imgBox = document.getElementById('editImagePreviewBox');
  const imgEl = document.getElementById('editPreviewImageEl');
  if (editUploadedImageUrl) {
    imgEl.src = editUploadedImageUrl;
    imgBox.style.display = 'flex';
  } else {
    imgBox.style.display = 'none';
  }

  renderEditTags();
}

function renderEditTags() {
  const container = document.getElementById('editTagContainer');
  if (!container) return;
  container.innerHTML = ALL_TAGS.map(t => {
    const isSel = editSelectedTags.includes(t);
    const bg = isSel ? 'bg-stone-800 text-white font-bold' : 'bg-stone-100 text-stone-600 hover:bg-stone-200';
    return `<button type="button" onclick="toggleEditTag('${t}')" class="px-3 py-1.5 rounded-full text-xs transition ${bg}">${t}</button>`;
  }).join('');
}

function toggleEditTag(t) {
  if (editSelectedTags.includes(t)) {
    editSelectedTags = editSelectedTags.filter(x => x !== t);
  } else {
    editSelectedTags.push(t);
  }
  renderEditTags();
}

function handleEditFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    editUploadedImageUrl = evt.target.result;
    document.getElementById('editPreviewImageEl').src = editUploadedImageUrl;
    document.getElementById('editImagePreviewBox').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function removeEditImage() {
  editUploadedImageUrl = null;
  document.getElementById('editImagePreviewBox').style.display = 'none';
  document.getElementById('editPreviewImageEl').src = '';
}

function submitEditPost(e) {
  e.preventDefault();
  const title = document.getElementById('editPostTitle').value.trim();
  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  const itemsStr = document.getElementById('editPostItems').value;
  const itemsArr = itemsStr ? itemsStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  const updateData = {
    title: title,
    title_en: document.getElementById('editPostTitleEn').value.trim() || null,
    text_translation: document.getElementById('editPostTextTranslation').value.trim() || null,
    text_raw: document.getElementById('editPostTextRaw').value.trim() || null,
    image_translation: document.getElementById('editPostImageTranslation').value.trim() || null,
    image_raw: document.getElementById('editPostImageRaw').value.trim() || null,
    summary: document.getElementById('editPostTextTranslation').value.trim() || document.getElementById('editPostImageTranslation').value.trim() || title,
    date: document.getElementById('editPostDate').value || null,
    time_start: document.getElementById('editPostTimeStart').value || null,
    location: document.getElementById('editPostLocation').value.trim() || null,
    deadline: document.getElementById('editPostDeadline').value || null,
    deadline_description: document.getElementById('editPostDeadlineDesc').value.trim() || null,
    items: itemsArr,
    tags: editSelectedTags,
    image_url: editUploadedImageUrl
  };

  DB.updatePost(editPostId, updateData);
  window.location.hash = `#/post/${editPostId}`;
}

// --- 設定モーダル ---
function openSettingsModal() {
  const settings = DB.getSettings();
  document.getElementById('settingUserName').value = settings.user_name || 'めぐ';
  document.getElementById('settingApiKey').value = settings.gemini_api_key || '';
  document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.add('hidden');
}

function saveSettings(e) {
  e.preventDefault();
  const settings = {
    user_name: document.getElementById('settingUserName').value.trim() || 'めぐ',
    gemini_api_key: document.getElementById('settingApiKey').value.trim(),
    notification_time: "18:00"
  };
  DB.saveSettings(settings);
  closeSettingsModal();
  document.getElementById('userNameDisplay').innerText = settings.user_name;
  alert('⚙️ 設定を保存しました！');
}

// バックアップ
function exportBackupData() {
  const posts = DB.getPosts();
  const settings = DB.getSettings();
  const data = JSON.stringify({ posts, settings }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `school_info_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function importBackupData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.posts) DB.savePosts(data.posts);
      if (data.settings) DB.saveSettings(data.settings);
      alert('✅ データを復元しました！');
      closeSettingsModal();
      handleRouting();
    } catch(err) {
      alert('復元エラー: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
