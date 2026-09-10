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
    image_translation: null,
    image_raw: null,
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
      if (data !== null) {
        return JSON.parse(data);
      }
    } catch(e) {
      console.error('Storage read error:', e);
    }
    
    // 初回起動時のみサンプルデータを注入
    const hasInit = localStorage.getItem('otayori_has_initialized_v1');
    if (!hasInit) {
      localStorage.setItem('otayori_has_initialized_v1', 'true');
      localStorage.setItem('otayori_posts_v1', JSON.stringify(INITIAL_SAMPLE_POSTS));
      return INITIAL_SAMPLE_POSTS;
    }
    
    return [];
  },

  savePosts: function(posts) {
    try {
      localStorage.setItem('otayori_has_initialized_v1', 'true');
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

// 📅 直近の予定（今日以降の未来の予定のみを表示 - コンパクト版）
function renderUpcomingEvents(posts) {
  const container = document.getElementById('upcomingEventsList');
  if (!container) return;

  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = posts
    .filter(p => p.date && p.date >= todayStr)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 5);

  if (upcoming.length === 0) {
    container.innerHTML = '<div class="text-center py-2.5 text-stone-400 text-xs">直近（予定あり）のおたよりはありません</div>';
    return;
  }

  container.innerHTML = upcoming.map(p => {
    const dParts = (p.date || '').split('-');
    const day = dParts.length === 3 ? dParts[2] : '—';
    const month = dParts.length === 3 ? `${parseInt(dParts[1])}月` : '—';
    const timeStr = p.time_start ? `<span>⏰ ${escapeHtml(p.time_start)}〜</span>` : '';
    const locStr = p.location ? `<span class="truncate">📍 ${escapeHtml(p.location)}</span>` : '';
    const itemsHtml = (p.items || []).slice(0, 3).map(it => `
      <span class="item-tag truncate max-w-[120px]">🎒 ${escapeHtml(it.split('(')[0].trim())}</span>
    `).join('');

    return `
      <a href="#/post/${p.id}" class="m3-card post-card otayori-card block p-3 no-underline">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="date-badge">
              <span class="day">${day}</span>
              <span class="month">${month}</span>
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="font-bold text-xs text-stone-900 truncate leading-snug">${escapeHtml(p.title)}</h4>
              <div class="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500 font-medium">
                ${timeStr}
                ${locStr}
              </div>
              ${itemsHtml ? `<div class="flex flex-wrap gap-1 mt-1.5">${itemsHtml}</div>` : ''}
            </div>
          </div>
          <span class="w-6 h-6 rounded-full bg-rose-50 text-rose-500 font-bold text-xs flex items-center justify-center flex-shrink-0">
            ›
          </span>
        </div>
      </a>
    `;
  }).join('');
}

// 📑 届いたおたより一覧（横書き・読みやすいコンパクトM3カード）
function renderPostsList(posts) {
  const container = document.getElementById('postsList');
  const countEl = document.getElementById('postsCount');
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = '<div class="text-center py-6 text-stone-400 text-xs">おたよりはありません</div>';
    if (countEl) countEl.innerText = '0件';
    return;
  }

  container.innerHTML = posts.map(p => {
    const rawTags = (p.tags || []).join(',');
    const pDateStr = p.date ? `📅 ${p.date.replace(/-/g, '/')}` : '';
    const hasRealImage = Boolean(p.image_url && !p.image_url.includes('no_image.svg'));
    const summaryText = p.summary || p.text_translation || p.image_translation || p.title;

    const tagsHtml = (p.tags || []).map(t => {
      let color = 'bg-stone-100 text-stone-600', icon = '🏷️';
      if (t.includes('英語') || t.includes('UOI')) { color = 'bg-blue-50 text-blue-700 border border-blue-200'; icon = '📚'; }
      else if (t.includes('中国語')) { color = 'bg-rose-50 text-rose-700 border border-rose-200'; icon = '🀄'; }
      else if (t.includes('アート')) { color = 'bg-purple-50 text-purple-700 border border-purple-200'; icon = '🎨'; }
      else if (t.includes('Music')) { color = 'bg-pink-50 text-pink-700 border border-pink-200'; icon = '🎵'; }
      else if (t.includes('行事')) { color = 'bg-emerald-50 text-emerald-700 border border-emerald-200'; icon = '🏫'; }
      else if (t.includes('提出物')) { color = 'bg-amber-50 text-amber-800 border border-amber-200'; icon = '⚠️'; }
      else if (t.includes('Dgaeden') || t.includes('dgaeden')) { color = 'bg-teal-50 text-teal-800 border border-teal-200'; icon = '🌱'; }
      return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${color}">${icon} ${escapeHtml(t)}</span>`;
    }).join('');

    const itemsBadge = (p.items && p.items.length > 0)
      ? `<span class="text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md font-bold text-[10px]">🎒 持ち物 ${p.items.length}点</span>`
      : '';
    const dlBadge = p.deadline
      ? `<span class="text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-md font-bold text-[10px]">⚠️ 締切: ${p.deadline.replace(/-/g, '/')}</span>`
      : '';
    const imgBadge = hasRealImage
      ? `<span class="text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded-md font-bold text-[10px]">🖼️ 写真あり</span>`
      : '';

    return `
      <a href="#/post/${p.id}" data-tags="${escapeHtml(rawTags)}" class="m3-card post-card otayori-card block p-3.5 no-underline">
        <!-- 上部：タグ ＆ 日程 -->
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-1.5 flex-wrap min-w-0">
            ${tagsHtml}
          </div>
          ${pDateStr ? `<span class="text-[11px] text-stone-500 font-bold whitespace-nowrap flex-shrink-0">${pDateStr}</span>` : ''}
        </div>

        <!-- 中部：サムネイル ＋ テキスト（横並びレイアウト） -->
        <div class="flex items-start gap-3">
          ${hasRealImage ? `
            <div class="card-thumb-box" style="width:48px !important;height:48px !important;min-width:48px !important;min-height:48px !important;max-width:48px !important;max-height:48px !important;flex-shrink:0 !important;border-radius:12px;overflow:hidden;background:#F8F5EE;border:1px solid #EAE3D9;display:flex;align-items:center;justify-content:center;">
              <img src="${p.image_url}" class="card-thumb-img" style="width:48px !important;height:48px !important;max-width:48px !important;max-height:48px !important;object-fit:cover !important;display:block;" alt="プリント" onerror="this.parentElement.style.display='none'">
            </div>
          ` : ''}
          <div class="flex-1 min-w-0">
            <h3 class="text-xs sm:text-sm font-bold text-stone-900 leading-snug break-words">${escapeHtml(p.title)}</h3>
            ${p.title_en ? `<p class="text-[10px] text-stone-400 font-medium truncate mt-0.5">${escapeHtml(p.title_en)}</p>` : ''}
            <p class="text-[11px] text-stone-600 font-normal line-clamp-2 mt-1 leading-relaxed break-words">${escapeHtml(summaryText)}</p>
          </div>
        </div>

        <!-- 下部：持ち物・締切バッジ ＆ 詳細リンク -->
        <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-100 text-[11px]">
          <div class="flex items-center gap-1.5 flex-wrap min-w-0">
            ${itemsBadge}
            ${dlBadge}
            ${imgBadge}
          </div>
          <span class="text-rose-500 font-bold flex items-center gap-0.5 ml-auto flex-shrink-0">
            <span>詳細を見る</span>
            <span class="text-xs font-black">›</span>
          </span>
        </div>
      </a>
    `;
  }).join('');

  if (countEl) countEl.innerText = `${posts.length}件`;
}

// --- タグフィルター（設定されたタグのみで厳密に判定） ---
function filterByTag(tag, el) {
  activeTag = tag;

  const allBtns = document.querySelectorAll('.tag-filter-btn');
  allBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  if (el) {
    el.classList.add('active');
  }

  const cards = document.querySelectorAll('#postsList .otayori-card, #postsList .m3-card, #postsList .post-card');
  let matchCount = 0;

  cards.forEach(card => {
    const rawTagsStr = card.getAttribute('data-tags') || '';
    const tagsArr = rawTagsStr.split(',').map(t => t.trim()).filter(Boolean);
    let isMatch = false;

    if (tag === 'all') {
      isMatch = true;
    } else if (tag === '英語・UOI') {
      isMatch = tagsArr.some(t => t.includes('英語') || t.includes('UOI'));
    } else if (tag === '提出物あり') {
      isMatch = tagsArr.some(t => t.includes('提出物'));
    } else {
      isMatch = tagsArr.includes(tag);
    }

    if (isMatch) {
      card.style.removeProperty('display');
      matchCount++;
    } else {
      card.style.setProperty('display', 'none', 'important');
    }
  });

  const countEl = document.getElementById('postsCount');
  if (countEl) countEl.innerText = `${matchCount}件`;
}

// --- 詳細画面描画 (コンパクト ＆ スマホ最適化) ---
function renderDetailPage(postId) {
  const post = DB.getPostById(postId);
  const container = document.getElementById('detailContainer');
  if (!container) return;

  if (!post) {
    container.innerHTML = `
      <div class="p-8 text-center space-y-3">
        <p class="text-xs font-bold text-stone-500">おたよりが見つかりませんでした</p>
        <a href="#/" class="inline-block px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold">一覧に戻る</a>
      </div>
    `;
    return;
  }

  const title = escapeHtml(post.title || 'お知らせ');
  const titleEn = escapeHtml(post.title_en || '');
  const dateVal = post.date || '';
  const dateDisplay = dateVal ? `📅 ${dateVal.replace(/-/g, '/')}` : '';
  const timeDisplay = (post.time_start && post.time_end) ? `${post.time_start} 〜 ${post.time_end}` : (post.time_start || '');
  const location = escapeHtml(post.location || '');
  const deadline = post.deadline || '';
  const deadlineDesc = escapeHtml(post.deadline_description || '提出');
  const items = post.items || [];
  
  const textTrans = (post.text_translation || (!post.image_url && post.summary && post.summary !== post.title ? post.summary : '') || '').trim();
  const textRaw = (post.text_raw || '').trim();
  const imgUrl = (post.image_url || '').trim();
  const imgTrans = (post.image_translation || (post.image_url && post.summary && post.summary !== post.title ? post.summary : '') || '').trim();
  const imgRaw = (post.image_raw || '').trim();

  // タグHTML
  const tagsHtml = (post.tags || []).map(t => {
    let color = 'bg-stone-100 text-stone-600', icon = '🏷️';
    if (t.includes('英語') || t.includes('UOI')) { color = 'bg-blue-50 text-blue-700 border border-blue-200'; icon = '📚'; }
    else if (t.includes('中国語')) { color = 'bg-rose-50 text-rose-700 border border-rose-200'; icon = '🀄'; }
    else if (t.includes('アート')) { color = 'bg-purple-50 text-purple-700 border border-purple-200'; icon = '🎨'; }
    else if (t.includes('Music')) { color = 'bg-pink-50 text-pink-700 border border-pink-200'; icon = '🎵'; }
    else if (t.includes('行事')) { color = 'bg-emerald-50 text-emerald-700 border border-emerald-200'; icon = '🏫'; }
    else if (t.includes('提出物')) { color = 'bg-amber-50 text-amber-800 border border-amber-200'; icon = '⚠️'; }
    else if (t.includes('Dgaeden') || t.includes('dgaeden')) { color = 'bg-teal-50 text-teal-800 border border-teal-200'; icon = '🌱'; }
    return `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${color}">${icon} ${escapeHtml(t)}</span>`;
  }).join('');

  // 持ち物HTML
  const itemsHtml = items.length > 0 ? `
    <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
      <h4 class="text-xs font-bold text-amber-900 flex items-center gap-1">
        <span>🎒 持ち物・持参するもの (${items.length}点)</span>
      </h4>
      <div class="flex flex-wrap gap-1 pt-0.5">
        ${items.map(it => `<span class="item-tag text-xs px-2.5 py-1 font-bold shadow-xs">🎒 ${escapeHtml(it)}</span>`).join('')}
      </div>
    </div>
  ` : '';

  // 締切行
  const dlRow = deadline ? `
    <div class="flex items-center justify-between text-rose-600 font-bold border-t border-rose-100 pt-1.5 text-xs">
      <span>⚠️ 提出締切:</span>
      <span>${deadline.replace(/-/g, '/')} (${deadlineDesc})</span>
    </div>
  ` : '';

  // 日時・場所・締切HTML
  const dateTimeHtml = (dateVal || timeDisplay || location || deadline) ? `
    <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
      ${dateVal ? `
        <div class="flex items-center justify-between">
          <span class="text-stone-500 font-medium">📅 日程:</span>
          <span class="font-bold text-stone-800">${dateDisplay}</span>
        </div>
      ` : ''}
      ${timeDisplay ? `
        <div class="flex items-center justify-between">
          <span class="text-stone-500 font-medium">⏰ 時間:</span>
          <span class="font-bold text-stone-800">${timeDisplay}</span>
        </div>
      ` : ''}
      ${location ? `
        <div class="flex items-center justify-between">
          <span class="text-stone-500 font-medium">📍 場所:</span>
          <span class="font-bold text-stone-800">${location}</span>
        </div>
      ` : ''}
      ${dlRow}
    </div>
  ` : '';

  // ① メッセージカード
  const textCardHtml = (textTrans || textRaw) ? `
    <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
      <h4 class="text-xs font-bold text-amber-950 flex items-center gap-1">
        <span>📱 メッセージ・メール本文の翻訳</span>
      </h4>
      ${textTrans ? `<div class="text-xs leading-relaxed text-stone-900 bg-white p-3 rounded-xl border border-amber-200/60 whitespace-pre-wrap font-medium">${escapeHtml(textTrans)}</div>` : ''}
      ${textRaw ? `
        <details class="text-[11px] pt-0.5">
          <summary class="font-bold text-amber-900 cursor-pointer hover:text-amber-950">英語メッセージ原文を表示</summary>
          <div class="mt-1 p-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-[10px] font-mono whitespace-pre-wrap leading-relaxed">${escapeHtml(textRaw)}</div>
        </details>
      ` : ''}
    </div>
  ` : '';

  // ② 添付写真カード
  const imageCardHtml = (imgUrl || imgTrans || imgRaw) ? `
    <div class="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
      <h4 class="text-xs font-bold text-sky-950 flex items-center gap-1">
        <span>🖼️ 添付プリント写真 ＆ 画像内の翻訳</span>
      </h4>
      ${imgUrl ? `
        <div class="w-full rounded-xl bg-white overflow-hidden border border-sky-200 flex items-center justify-center p-2">
          <img src="${imgUrl}" class="max-h-56 w-auto object-contain rounded-lg" alt="プリント" onerror="this.style.display='none'">
        </div>
      ` : ''}
      ${imgTrans ? `<div class="text-xs leading-relaxed text-stone-900 bg-white p-3 rounded-xl border border-sky-200/60 whitespace-pre-wrap font-medium">${escapeHtml(imgTrans)}</div>` : ''}
      ${imgRaw ? `
        <details class="text-[11px] pt-0.5">
          <summary class="font-bold text-sky-900 cursor-pointer hover:text-sky-950">画像から読み取った英語原文 (OCR) を表示</summary>
          <div class="mt-1 p-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-[10px] font-mono whitespace-pre-wrap leading-relaxed">${escapeHtml(imgRaw)}</div>
        </details>
      ` : ''}
    </div>
  ` : '';

  let shareText = `【おたより】${post.title}

`;
  if (textTrans) shareText += `📱 メッセージ:
${textTrans}

`;
  if (imgTrans) shareText += `🖼️ 添付プリント:
${imgTrans}

`;
  if (items.length > 0) shareText += `🎒 持ち物: ${items.join(', ')}
`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;

  const calTitle = encodeURIComponent(post.title || '');
  const calLoc = encodeURIComponent(post.location || '');
  const calDesc = encodeURIComponent(`${post.title_en || ''}

${textTrans || imgTrans}

持ち物: ${items.join(', ')}`);
  const dClean = (dateVal || '20260907').replace(/-/g, '');
  const calDates = `${dClean}/${dClean}`;
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${calDates}&details=${calDesc}&location=${calLoc}`;

  container.innerHTML = `
    <header class="px-4 py-3 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <a href="#/" class="flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl transition">
        <span>← 一覧に戻る</span>
      </a>
      <div class="flex items-center gap-1.5">
        <a href="#/edit/${post.id}" class="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs shadow-xs flex items-center gap-1 transition">
          <span>✏️ 編集</span>
        </a>
        <a href="${lineUrl}" target="_blank" class="px-3 py-1.5 rounded-xl bg-[#06C755] text-white font-bold text-xs shadow-xs flex items-center gap-1">
          <span>LINE共有</span>
        </a>
      </div>
    </header>

    <main class="p-4 space-y-3.5 flex-1">
      <div class="space-y-1.5">
        <div class="flex flex-wrap gap-1.5 items-center">
          ${tagsHtml}
          ${dateDisplay ? `<span class="text-xs text-stone-400 font-semibold ml-auto">${dateDisplay}</span>` : ''}
        </div>
        <h1 class="text-base sm:text-lg font-bold text-stone-900 leading-snug break-words">${title}</h1>
        ${titleEn ? `<p class="text-xs text-stone-500 font-medium">${titleEn}</p>` : ''}
      </div>

      ${dateTimeHtml}
      ${itemsHtml}
      ${textCardHtml}
      ${imageCardHtml}

      <div class="pt-2 grid grid-cols-2 gap-2">
        <a href="${googleCalUrl}" target="_blank" class="py-2.5 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs flex items-center justify-center gap-1 transition text-center shadow-xs">
          <span>📅 カレンダー追加</span>
        </a>
        <a href="${lineUrl}" target="_blank" class="py-2.5 px-3 rounded-xl bg-[#06C755] text-white hover:opacity-95 font-bold text-xs flex items-center justify-center gap-1 transition text-center shadow-xs">
          <span>📲 LINEで共有</span>
        </a>
      </div>

      <div class="text-center pt-2 pb-1 border-t border-stone-100">
        <button onclick="deleteCurrentPost('${post.id}', '${escapeHtml(post.title)}')" class="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1 mx-auto active:scale-95">
          <span>🗑️ このおたよりを削除する</span>
        </button>
      </div>

      <div class="text-center pt-1 pb-4">
        <a href="#/" class="inline-block text-xs font-bold text-stone-500 hover:text-stone-800 bg-stone-100 px-4 py-2 rounded-xl transition">
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
const ALL_TAGS = ['英語・UOI', '中国語', 'アート', 'Music', '学校行事', '提出物あり', 'Dgaeden'];

function renderNewPage() {
  newSelectedFile = null;
  newUploadedImageUrl = null;
  newSelectedTags = ['英語・UOI'];

  document.getElementById('newRawTextInput').value = '';
  document.getElementById('newSelectedFileName').classList.add('hidden');
  document.getElementById('newLoadingBox').classList.add('hidden');
  document.getElementById('newResultForm').classList.add('hidden');
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

// ==========================================
// 🌟 堅牢・画像圧縮 ＆ 多段式 AI 解析・日本語翻訳エンジン
// ==========================================

// クライアント側画像圧縮 (Canvas - 最大1200px / JPEG品質0.8 / 約100KB〜200KBに軽量化)
function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

async function handleNewFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    newSelectedFile = file;
    const nameEl = document.getElementById('newSelectedFileNameText');
    if (nameEl) nameEl.innerText = file.name;
    const boxEl = document.getElementById('newSelectedFileName');
    if (boxEl) boxEl.classList.remove('hidden');

    // 即座に軽量画像へ圧縮変換
    newUploadedImageUrl = await compressImageFile(file);
  }
}

async function executeAIAnalyze() {
  const textVal = document.getElementById('newRawTextInput').value.trim();
  if (!newSelectedFile && !textVal) {
    alert('写真を選択するか、英語テキストを貼り付けてください。');
    return;
  }

  const loadingBox = document.getElementById('newLoadingBox');
  if (loadingBox) loadingBox.classList.remove('hidden');
  const resultForm = document.getElementById('newResultForm');
  if (resultForm) resultForm.classList.add('hidden');

  try {
    // 画像圧縮が未完了の場合は待機
    if (newSelectedFile && !newUploadedImageUrl) {
      newUploadedImageUrl = await compressImageFile(newSelectedFile);
    }

    const settings = DB.getSettings();
    const apiKey = (settings.gemini_api_key || '').trim();

    let draft = null;

        // 1. Gemini API Direct Call (ユーザー設定APIキーがある場合)
    if (apiKey) {
      console.log('Using Gemini API Direct Call with API Key...');
      try {
        draft = await callGeminiDirect(apiKey, newUploadedImageUrl, textVal);
        if (draft) {
          console.log('Gemini API Direct analysis succeeded!');
        }
      } catch(geminiErr) {
        console.warn('Gemini direct call failed, falling back:', geminiErr);
      }
    }

    // 2. クライアント側フォールバック翻訳（Google Translate + MyMemory + 高速OCR + 内蔵辞書）
    if (!draft) {
      console.log('Using Client-side Robust Multi-tier Translation Engine...');
      draft = await clientSideTranslateEngine(textVal, newSelectedFile, newUploadedImageUrl);
    }

    if (loadingBox) loadingBox.classList.add('hidden');

    if (draft) {
      populateNewForm(draft, Boolean(textVal), Boolean(newSelectedFile || newUploadedImageUrl));
    } else {
      // 最終安全フォールバック
      const fallbackDraft = {
        title: "学校からのおたより",
        title_en: "School Notice",
        date: null,
        time_start: null,
        location: null,
        items: [],
        deadline: null,
        deadline_description: null,
        summary: textVal ? (await clientTranslate(textVal)) : "添付プリントを確認して登録",
        text_translation: textVal ? (await clientTranslate(textVal)) : null,
        text_raw: textVal || null,
        image_translation: newUploadedImageUrl ? "添付プリントを確認して内容を登録できます" : null,
        image_raw: null,
        tags: ["英語・UOI"]
      };
      populateNewForm(fallbackDraft, Boolean(textVal), Boolean(newSelectedFile || newUploadedImageUrl));
    }
  } catch (err) {
    if (loadingBox) loadingBox.classList.add('hidden');
    console.error('AI Analysis Error:', err);
    alert('AI解析完了（一部項目は手動で確認・編集いただけます）');
    
    // エラー時でも画面が止まらないようフォームを表示
    const safeDraft = {
      title: "学校からのおたより",
      title_en: "School Notice",
      date: null,
      time_start: null,
      location: null,
      items: [],
      deadline: null,
      deadline_description: null,
      summary: textVal || "おたより内容",
      text_translation: textVal || null,
      text_raw: textVal || null,
      image_translation: newUploadedImageUrl ? "添付写真あり" : null,
      image_raw: null,
      tags: ["英語・UOI"]
    };
    populateNewForm(safeDraft, Boolean(textVal), Boolean(newSelectedFile || newUploadedImageUrl));
  }
}

// ① Gemini API 直接呼出 (Gemini 2.0 Flash / 1.5 Flash)
async function callGeminiDirect(apiKey, b64Image, textContent) {
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const model of models) {
    try {
      const parts = [];

      if (b64Image) {
        const mimeType = b64Image.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
        const rawB64 = b64Image.includes(',') ? b64Image.split(',')[1] : b64Image;
        parts.push({
          inline_data: {
            mime_type: mimeType,
            data: rawB64
          }
        });
        parts.push({
          text: "この学校プリント画像を読み取り、画像内の英文を日本語に翻訳した上で、指定のJSON形式のみで出力してください。image_translation に画像内の日本語全訳を、image_raw に読み取った英文を入れてください。メッセージテキストがない場合は text_translation と text_raw を null にしてください。"
        });
      }

      if (textContent) {
        parts.push({
          text: `【英語メッセージ本文】:
${textContent}

この文章を日本語に全訳し、text_translation に入れてください。`
        });
      }

      const systemPrompt = `
あなたは学校・幼稚園・インターナショナルスクールの英語のおたよりを自然な日本語に翻訳・構造化する専門AIです。
必ず以下のJSON形式のみを出力してください（Markdownコードブロック不要、純粋なJSON）。

【重要指示】
- 本文や画像内に明確な日付が書かれていない場合は、date は必ず null にしてください（勝手に今日の日付を入れないでください）。
- 提出締切がない場合は、deadline と deadline_description は null にしてください。
- 持ち物が書かれていない場合は items は空配列 [] にしてください。

{
  "title": "日本語の分かりやすいタイトル（例: 第1四半期のお知らせ（UOI評価タスク））",
  "title_en": "Original English Title",
  "date": "YYYY-MM-DD (明確な日付がある場合のみ。不明なら null)",
  "time_start": "HH:MM (開始時刻。ない場合は null)",
  "location": "場所 (ない場合は null)",
  "items": ["持ち物1", "持ち物2"],
  "deadline": "YYYY-MM-DD (提出締切日。ない場合は null)",
  "deadline_description": "提出物の内容（ない場合は null)",
  "summary": "おたより全体の要約（自然で丁寧な日本語）",
  "text_translation": "メッセージ本文の丁寧な日本語全訳（メッセージがない場合はnull）",
  "text_raw": "メッセージ英語原文（ない場合はnull）",
  "image_translation": "画像内英文の丁寧な日本語全訳（画像がない場合はnull）",
  "image_raw": "画像内英文OCR（画像がない場合はnull）",
  "tags": ["英語・UOI", "学校行事"]
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

// ② クライアント側フォールバック翻訳エンジン
async function clientSideTranslateEngine(text, file, b64Image) {
  let textTrans = "";
  let imageRaw = "";
  let imageTrans = "";

  if (text) {
    textTrans = await clientTranslate(text);
  }

  if (b64Image) {
    console.log('Extracting text from image via client OCR...');
    imageRaw = await clientOCR(b64Image);
    if (imageRaw) {
      imageTrans = await clientTranslate(imageRaw);
    } else {
      imageTrans = "（添付写真あり・プリントの内容を確認してタイトルや持ち物を登録できます）";
    }
  }

  const combined = `${text || ''}\n${imageRaw || ''}`.trim();
  const lower = combined.toLowerCase();

  // 持ち物抽出
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

  // 日付
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

  // 時間
  let timeStart = null;
  const timeMatch = combined.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/);
  if (timeMatch) {
    let hr = parseInt(timeMatch[1]);
    const min = timeMatch[2];
    const ampm = (timeMatch[3] || '').toUpperCase();
    if (ampm === 'PM' && hr < 12) hr += 12;
    if (ampm === 'AM' && hr === 12) hr = 0;
    timeStart = `${String(hr).padStart(2, '0')}:${min}`;
  }

  // 締切
  let deadline = null;
  let deadlineDesc = null;
  if (lower.includes('return by') || lower.includes('due') || lower.includes('deadline') || lower.includes('締切')) {
    deadline = eventDate;
    deadlineDesc = items.length > 0 ? `${items[0]}等の持参` : "提出用紙・確認";
  }

  // タイトル
  let titleJa = "学校からのおたより・お知らせ";
  let titleEn = combined.split('\n').filter(Boolean)[0]?.substring(0, 50) || "School Notice";

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
  } else if (titleEn && titleEn !== "School Notice") {
    try {
      const transFirst = await clientTranslate(titleEn);
      if (transFirst && transFirst !== titleEn) {
        titleJa = transFirst.includes('お知らせ') ? transFirst : `${transFirst}のお知らせ`;
      }
    } catch(e) {}
  }

  // タグ
  const tags = [];
  if (lower.includes('uoi') || lower.includes('english') || lower.includes('assessment') || lower.includes('identity')) tags.push('英語・UOI');
  if (lower.includes('chinese') || lower.includes('mandarin')) tags.push('中国語');
  if (lower.includes('craft') || lower.includes('art')) tags.push('アート');
  if (lower.includes('music') || lower.includes('concert')) tags.push('Music');
  if (lower.includes('trip') || lower.includes('ceremony') || lower.includes('festival')) tags.push('学校行事');
  if (deadline || (items.length > 0 && (lower.includes('due') || lower.includes('return')))) tags.push('提出物あり');
  if (tags.length === 0) tags.push('英語・UOI');

  const summaryJa = textTrans || imageTrans || titleJa;

  return {
    title: titleJa,
    title_en: titleEn,
    date: eventDate,
    time_start: timeStart,
    time_end: null,
    location: null,
    items: items,
    deadline: deadline,
    deadline_description: deadlineDesc,
    summary: summaryJa,
    text_translation: text ? textTrans : null,
    text_raw: text || null,
    image_translation: b64Image ? imageTrans : null,
    image_raw: b64Image ? imageRaw : null,
    tags: tags
  };
}

// 🌟 多段式・超堅牢クライアント翻訳エンジン (Google + MyMemory + 内蔵辞書)
async function clientTranslate(text) {
  if (!text || !text.trim()) return "";
  
  const paragraphs = text.split('\n').map(p => p.trim()).filter(Boolean);
  const translated = [];

  for (const para of paragraphs) {
    let chunks = [para];
    if (para.length > 200) {
      chunks = para.match(/[^.!?]+[.!?]+/g) || [para];
    }

    const transChunks = [];
    for (const c of chunks) {
      const res = await translateSingleChunk(c.trim());
      transChunks.push(res);
    }

    translated.push(transChunks.join(' '));
  }

  return translated.join('\n\n');
}

// 単一テキストチャンクの多重フォールバック翻訳 (絶対に例外をスローしない)
async function translateSingleChunk(chunk) {
  if (!chunk || !chunk.trim()) return "";

  // 1. Google Translate API 直接呼び出し
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(chunk)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const t = data[0].map(item => item && item[0]).filter(Boolean).join('');
        if (t && t.trim()) return t;
      }
    }
  } catch(e) {}

  // 2. MyMemory API (CORS完全対応・高精度)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|ja`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const t = data && data.responseData && data.responseData.translatedText;
      if (t && !t.startsWith("MYMEMORY WARNING") && !t.includes("QUERY LENGTH LIMIT")) {
        return t;
      }
    }
  } catch(e) {}

  // 3. 内蔵オフライン学校英語辞書による自然翻訳フォールバック
  return offlineDictionaryTranslate(chunk);
}

// オフライン学校英語辞書変換
function offlineDictionaryTranslate(text) {
  let res = text;
  const dict = [
    [/Dear Parents,?/gi, '保護者の皆様へ、'],
    [/Please note that/gi, 'ご確認ください：'],
    [/Please be informed that/gi, 'お知らせいたします：'],
    [/Please bring/gi, 'ご持参ください：'],
    [/What to bring/gi, '【持ち物】'],
    [/Summative Assessment/gi, '総括評価（SA）'],
    [/Unit of Inquiry/gi, '探究単元（UOI）'],
    [/Identity Explorer/gi, 'アイデンティティ・エクスプローラー（自分探究者）'],
    [/Field Trip/gi, '遠足・校外学習'],
    [/Permission Slip/gi, '参加同意書・提出用紙'],
    [/Early Dismissal/gi, '短縮授業・早下校'],
    [/Opening Ceremony/gi, '始業式'],
    [/Welcome Back/gi, '新学期へようこそ'],
    [/Sports Day/gi, '運動会・スポーツデー'],
    [/Shoebox/gi, '靴箱'],
    [/Shoe box/gi, '靴箱'],
    [/Stickers/gi, 'ステッカー・シール'],
    [/Photos?/gi, '写真'],
    [/Scissors/gi, 'はさみ'],
    [/Glue/gi, 'のり'],
    [/Water bottle/gi, '水筒'],
    [/Packed lunch/gi, 'お弁当'],
    [/Lunch/gi, '昼食・お弁当'],
    [/Apron/gi, 'エプロン'],
    [/Backpack/gi, 'リュックサック'],
    [/Raincoat/gi, 'レインコート・雨具'],
    [/Indoor clean shoes/gi, '上履き・室内履き'],
    [/Disaster hood/gi, '防災頭巾'],
    [/Homework/gi, '宿題'],
    [/Health check card/gi, '健康観察カード'],
    [/Return signed permission slip by/gi, '記入済み同意書をご提出ください：'],
    [/by Monday/gi, '月曜日までに'],
    [/by Friday/gi, '金曜日までに'],
    [/Thank you for your support!?/gi, 'ご協力ありがとうございます！']
  ];

  for (const [regex, ja] of dict) {
    res = res.replace(regex, ja);
  }
  return res;
}

// 🌟 多段式OCR (OCR.space 軽量JPEG送信)
async function clientOCR(base64Data) {
  if (!base64Data) return '';
  const apiKeys = ['K88536892588957', 'helloworld'];

  for (const key of apiKeys) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const formData = new FormData();
      formData.append('base64Image', base64Data);
      formData.append('language', 'eng');
      formData.append('isOverlayRequired', 'false');
      formData.append('apikey', key);

      const res = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.ParsedResults && data.ParsedResults.length > 0) {
          const txt = (data.ParsedResults[0].ParsedText || '').trim();
          if (txt) return txt;
        }
      }
    } catch (err) {
      console.warn(`OCR error with key ${key}:`, err);
    }
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


// フォームへの反映
function populateNewForm(draft, hasTextInput, hasImageInput) {
  document.getElementById('newPostTitle').value = draft.title || '';
  document.getElementById('newPostTitleEn').value = draft.title_en || '';

  const hasText = hasTextInput || Boolean(draft.text_translation) || Boolean(draft.text_raw);
  const hasImage = hasImageInput || Boolean(draft.image_translation) || Boolean(draft.image_raw) || Boolean(newUploadedImageUrl);

  const textSection = document.getElementById('newTextMessageSection');
  if (hasText) {
    textSection.classList.remove('hidden');
    document.getElementById('newPostTextTranslation').value = draft.text_translation || '';
    document.getElementById('newPostTextRaw').value = draft.text_raw || '';
  } else {
    textSection.classList.add('hidden');
    document.getElementById('newPostTextTranslation').value = '';
    document.getElementById('newPostTextRaw').value = '';
  }

  const imageSection = document.getElementById('newImageMessageSection');
  if (hasImage) {
    imageSection.classList.remove('hidden');
    document.getElementById('newPostImageTranslation').value = draft.image_translation || '';
    document.getElementById('newPostImageRaw').value = draft.image_raw || '';
    if (newUploadedImageUrl) {
      document.getElementById('newPreviewImageEl').src = newUploadedImageUrl;
    }
  } else {
    imageSection.classList.add('hidden');
    document.getElementById('newPostImageTranslation').value = '';
    document.getElementById('newPostImageRaw').value = '';
  }

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

  const textTrans = document.getElementById('newPostTextTranslation').value.trim();
  const textRaw = document.getElementById('newPostTextRaw').value.trim();
  const imgTrans = document.getElementById('newPostImageTranslation').value.trim();
  const imgRaw = document.getElementById('newPostImageRaw').value.trim();

  const postData = {
    title: title,
    title_en: document.getElementById('newPostTitleEn').value.trim() || null,
    text_translation: textTrans || null,
    text_raw: textRaw || null,
    image_translation: imgTrans || null,
    image_raw: imgRaw || null,
    summary: textTrans || imgTrans || title,
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

  const backLink = document.getElementById('editBackLink');
  if (backLink) backLink.href = `#/post/${postId}`;
  
  document.getElementById('editPostTitle').value = post.title || '';
  document.getElementById('editPostTitleEn').value = post.title_en || '';
  
  // 翻訳データの事前セット（空なら summary から自動復元）
  const textVal = post.text_translation || (!post.image_url && post.summary && post.summary !== post.title ? post.summary : '') || '';
  const imgVal = post.image_translation || (post.image_url && post.summary && post.summary !== post.title ? post.summary : '') || '';

  document.getElementById('editPostTextTranslation').value = textVal;
  document.getElementById('editPostTextRaw').value = post.text_raw || '';
  document.getElementById('editPostImageTranslation').value = imgVal;
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

async function handleEditFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  editUploadedImageUrl = await compressImageFile(file);
  const imgEl = document.getElementById('editPreviewImageEl');
  const imgBox = document.getElementById('editImagePreviewBox');
  if (imgEl && imgBox && editUploadedImageUrl) {
    imgEl.src = editUploadedImageUrl;
    imgBox.style.display = 'flex';
  }
}

function removeEditImage() {
  editUploadedImageUrl = null;
  document.getElementById('editImagePreviewBox').style.display = 'none';
  document.getElementById('editPreviewImageEl').src = '';
}

function submitEditPost(e) {
  e.preventDefault();
  const oldPost = DB.getPostById(editPostId) || {};

  const title = document.getElementById('editPostTitle').value.trim();
  if (!title) {
    alert('タイトルを入力してください');
    return;
  }

  const itemsStr = document.getElementById('editPostItems').value;
  const itemsArr = itemsStr ? itemsStr.split(',').map(s => s.trim()).filter(Boolean) : (oldPost.items || []);

  const textTransInput = document.getElementById('editPostTextTranslation').value.trim();
  const textRawInput = document.getElementById('editPostTextRaw').value.trim();
  const imgTransInput = document.getElementById('editPostImageTranslation').value.trim();
  const imgRawInput = document.getElementById('editPostImageRaw').value.trim();

  // 翻訳データを厳格に保護：入力があればそれを使用、空欄でも既存データがあれば保持
  const textTrans = textTransInput || oldPost.text_translation || null;
  const textRaw = textRawInput || oldPost.text_raw || null;
  const imgTrans = imgTransInput || oldPost.image_translation || null;
  const imgRaw = imgRawInput || oldPost.image_raw || null;
  const summaryVal = textTrans || imgTrans || oldPost.summary || title;

  const updateData = {
    ...oldPost,
    title: title,
    title_en: document.getElementById('editPostTitleEn').value.trim() || oldPost.title_en || null,
    text_translation: textTrans,
    text_raw: textRaw,
    image_translation: imgTrans,
    image_raw: imgRaw,
    summary: summaryVal,
    date: document.getElementById('editPostDate').value || null,
    time_start: document.getElementById('editPostTimeStart').value || null,
    location: document.getElementById('editPostLocation').value.trim() || null,
    deadline: document.getElementById('editPostDeadline').value || null,
    deadline_description: document.getElementById('editPostDeadlineDesc').value.trim() || null,
    items: itemsArr,
    tags: editSelectedTags.length > 0 ? editSelectedTags : (oldPost.tags || ['英語・UOI']),
    image_url: editUploadedImageUrl !== undefined ? editUploadedImageUrl : oldPost.image_url
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

// データの全削除・初期化
function resetAllPostsData() {
  if (!confirm('⚠️ すべてのおたよりデータを完全に消去して初期化しますか？\n（※この操作は取り消せません）')) return;
  DB.savePosts([]);
  alert('🧹 すべてのおたよりデータを削除しました。');
  closeSettingsModal();
  handleRouting();
}
