// おたよりポスト フロントエンドロジック (app.js)

let currentPosts = [];
let activeTag = 'all';
let selectedFile = null;
let currentDraftData = null;
let activePostDetail = null;

// --- 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  loadSettings();
  loadAllData();
});

// --- データ読み込み ---
async function loadAllData() {
  await Promise.all([
    loadPosts(),
    loadUpcoming(),
    loadDeadlines()
  ]);
  if (window.lucide) lucide.createIcons();
}

async function loadPosts(query = '') {
  try {
    let url = `/api/posts?tag=${encodeURIComponent(activeTag)}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    
    const res = await fetch(url);
    const data = await res.json();
    currentPosts = data.posts || [];
    renderPosts(currentPosts);
    
    const countEl = document.getElementById('postsCount');
    if (countEl) countEl.innerText = `${currentPosts.length}件`;
  } catch (err) {
    console.error('Failed to load posts:', err);
  }
}

async function loadUpcoming() {
  try {
    const res = await fetch('/api/upcoming');
    const data = await res.json();
    renderUpcoming(data.events || []);
  } catch (err) {
    console.error('Failed to load upcoming events:', err);
  }
}

async function loadDeadlines() {
  try {
    const res = await fetch('/api/deadlines');
    const data = await res.json();
    renderDeadlines(data.deadlines || []);
  } catch (err) {
    console.error('Failed to load deadlines:', err);
  }
}

async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data.user_name) {
      document.getElementById('userNameDisplay').innerText = data.user_name;
      const settingName = document.getElementById('settingUserName');
      if (settingName) settingName.value = data.user_name;
    }
    if (data.notification_time) {
      const settingTime = document.getElementById('settingNotifyTime');
      if (settingTime) settingTime.value = data.notification_time;
    }
    if (data.masked_gemini_key) {
      const settingKey = document.getElementById('settingApiKey');
      if (settingKey && !settingKey.value) settingKey.placeholder = `設定済み (${data.masked_gemini_key})`;
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

// --- レンダリング処理 ---

// 1. 直近の予定レンダリング
function renderUpcoming(events) {
  const container = document.getElementById('upcomingEventsList');
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = `
      <div class="otayori-card p-4 text-center text-xs text-stone-400">
        直近の行事・予定はありません
      </div>
    `;
    return;
  }

  container.innerHTML = events.map(ev => {
    // 日付フォーマット
    const dateObj = new Date(ev.date || Date.now());
    const day = dateObj.getDate() || '—';
    const month = (dateObj.getMonth() + 1) + '月';
    
    // 持ち物タグ（最大3つ表示）
    const itemsHtml = (ev.items || []).slice(0, 3).map(item => `
      <span class="item-tag truncate max-w-[140px]">
        🎒 ${escapeHtml(item.split('(')[0].trim())}
      </span>
    `).join('');

    const timeRange = ev.time_start ? `${ev.time_start}〜` : '';

    return `
      <div class="otayori-card p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:border-sky-300 transition" onclick="openDetailModal('${ev.id}')">
        <div class="flex items-center gap-3 min-w-0">
          <div class="date-badge">
            <span class="day">${day}</span>
            <span class="month">${month}</span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <h4 class="font-extrabold text-xs text-stone-800 truncate">${escapeHtml(ev.title)}</h4>
            </div>
            <div class="flex items-center gap-1 mt-1 text-[11px] text-stone-500">
              ${timeRange ? `<span>⏰ ${timeRange}</span>` : ''}
              <span class="truncate">📍 ${escapeHtml(ev.location || '学校')}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1.5">
              ${itemsHtml}
              ${(ev.items || []).length > 3 ? `<span class="text-[10px] text-stone-400 font-bold self-center">+${ev.items.length - 3}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 flex-shrink-0">
          <a href="${buildGoogleCalendarUrl(ev)}" target="_blank" onclick="event.stopPropagation()" class="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 transition" title="Googleカレンダーに追加">
            <i data-lucide="calendar-plus" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// 2. 提出物・締切アラートレンダリング
function renderDeadlines(deadlines) {
  const section = document.getElementById('deadlineSection');
  const container = document.getElementById('deadlineList');
  const countEl = document.getElementById('deadlineCount');

  if (!section || !container) return;

  if (deadlines.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  if (countEl) countEl.innerText = `${deadlines.length}件`;

  container.innerHTML = deadlines.map(item => {
    const deadlineDate = item.deadline ? item.deadline.replace(/-/g, '/') : '未定';
    return `
      <div class="p-3 rounded-2xl bg-red-50/90 border border-red-200/80 flex items-center justify-between gap-2">
        <div class="flex items-start gap-2.5 min-w-0">
          <input type="checkbox" onchange="toggleSubmission('${item.id}', this.checked)" class="mt-1 rounded text-red-600 focus:ring-red-400 cursor-pointer w-4 h-4" title="提出済みにする">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-red-200 text-red-800">締切: ${deadlineDate}</span>
              <h5 class="text-xs font-bold text-red-900 truncate">${escapeHtml(item.deadline_description || item.title)}</h5>
            </div>
            <p class="text-[11px] text-red-700/80 truncate mt-0.5">${escapeHtml(item.title)}</p>
          </div>
        </div>
        <button onclick="openDetailModal('${item.id}')" class="px-2 py-1 bg-white/80 hover:bg-white text-[11px] font-bold text-red-700 rounded-lg border border-red-200 shadow-sm flex-shrink-0">
          確認
        </button>
      </div>
    `;
  }).join('');
}

// 3. おたより一覧レンダリング
function renderPosts(posts) {
  const container = document.getElementById('postsList');
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="otayori-card p-8 text-center space-y-2">
        <div class="text-3xl">📭</div>
        <p class="text-xs font-bold text-stone-600">おたよりが見つかりません</p>
        <p class="text-[11px] text-stone-400">右下の「＋」ボタンから英語プリントを追加してください</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts.map(p => {
    const tagsHtml = (p.tags || []).map(t => {
      let colorClass = 'bg-stone-100 text-stone-600';
      let icon = '🏷️';
      if (t.includes('英語') || t.includes('UOI')) { colorClass = 'bg-blue-100 text-blue-800'; icon = '📚'; }
      else if (t.includes('中国語')) { colorClass = 'bg-red-100 text-red-800'; icon = '🀄'; }
      else if (t.includes('アート')) { colorClass = 'bg-purple-100 text-purple-800'; icon = '🎨'; }
      else if (t.includes('Music') || t.includes('音楽')) { colorClass = 'bg-pink-100 text-pink-800'; icon = '🎵'; }
      else if (t.includes('体育') || t.includes('PE')) { colorClass = 'bg-orange-100 text-orange-800'; icon = '⚽'; }
      else if (t.includes('学校行事') || t.includes('行事') || t.includes('遠足')) { colorClass = 'bg-emerald-100 text-emerald-800'; icon = '🏫'; }
      else if (t.includes('提出物')) { colorClass = 'bg-amber-100 text-amber-800'; icon = '⚠️'; }
      return `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${colorClass}">${icon} ${escapeHtml(t)}</span>`;
    }).join('');

    const formattedDate = p.date ? `📅 ${p.date.replace(/-/g, '/')}` : '📅 随時';
    const previewImg = p.image_url || '/static/samples/no_image.svg';

    const itemsBadge = (p.items && p.items.length > 0)
      ? `<span class="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">🎒 持ち物 ${p.items.length}点</span>`
      : '';
    const deadlineBadge = p.deadline
      ? `<span class="text-red-700 bg-red-50 px-1.5 py-0.5 rounded font-bold">⚠️ 締切: ${p.deadline.replace(/-/g, '/')}</span>`
      : '';

    return `
      <div class="otayori-card p-3.5 flex gap-3.5 cursor-pointer hover:border-amber-300 transition" onclick="openDetailModal('${p.id}')">
        <!-- サムネイル画像 -->
        <div class="w-16 h-20 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <img src="${previewImg}" class="w-full h-full object-cover" alt="プリント">
        </div>

        <!-- 本文情報 -->
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              ${tagsHtml}
              <span class="text-[10px] text-stone-400 font-semibold ml-auto">${formattedDate}</span>
            </div>
            <h3 class="text-xs font-extrabold text-stone-900 mt-1 truncate leading-tight">${escapeHtml(p.title)}</h3>
            <p class="text-[10px] text-stone-400 truncate">${escapeHtml(p.title_en || '')}</p>
          </div>
          
          <p class="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
            ${escapeHtml(p.summary || '')}
          </p>

          <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100 text-[10px]">
            <div class="flex items-center gap-1.5 truncate max-w-[190px]">
              ${itemsBadge}
              ${deadlineBadge}
            </div>
            <span class="text-emerald-700 font-bold flex items-center gap-0.5 flex-shrink-0">
              <span>詳細</span>
              <i data-lucide="chevron-right" class="w-3 h-3"></i>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// --- 検索 & フィルター ---
let searchTimeout = null;
function handleSearch() {
  clearTimeout(searchTimeout);
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const q = input.value.trim();

  if (q) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }

  searchTimeout = setTimeout(() => {
    loadPosts(q);
  }, 250);
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  document.getElementById('clearSearchBtn').classList.add('hidden');
  loadPosts('');
}

function filterByTag(tag) {
  activeTag = tag;
  document.querySelectorAll('.tag-filter-btn').forEach(btn => {
    if (btn.innerText.includes(tag) || (tag === 'all' && btn.innerText === 'すべて')) {
      btn.className = 'tag-filter-btn active px-3 py-1.5 rounded-full font-bold bg-stone-800 text-white shadow-sm transition whitespace-nowrap';
    } else {
      btn.className = 'tag-filter-btn px-3 py-1.5 rounded-full font-bold bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 transition whitespace-nowrap';
    }
  });
  loadPosts(document.getElementById('searchInput').value.trim());
}

// --- アップロード & AI解析 ---
function openUploadModal() {
  selectedFile = null;
  document.getElementById('fileInput').value = '';
  document.getElementById('rawTextInput').value = '';
  document.getElementById('selectedFileName').classList.add('hidden');
  openModal('uploadModal');
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file;
    document.getElementById('selectedFileNameText').innerText = file.name;
    document.getElementById('selectedFileName').classList.remove('hidden');
  }
}

function toggleTextInput() {
  const container = document.getElementById('textInputContainer');
  const icon = document.getElementById('textToggleIcon');
  if (container.classList.contains('hidden')) {
    container.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    container.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
}

async function loadSamplePreset(type) {
  closeModal('uploadModal');
  showLoadingToast('AIが英語のおたよりを読取・翻訳中...');

  let sampleText = "";
  let sampleSvg = `/static/samples/${type}.svg`;

  if (type === 'field_trip') {
    sampleText = "Autumn Field Trip Announcement: Friday, September 12th to Port Aquarium. Departure: 8:30 AM, Return: 3:00 PM. Please bring packed lunch, water bottle, leisure sheet, backpack, raincoat. Return signed permission slip by Thursday, September 4th.";
  } else if (type === 'term2') {
    sampleText = "Term 2 Opening Ceremony & Welcome Back: Monday, August 25th (8:15 AM - 11:30 AM, Early Dismissal). Please bring indoor clean shoes, emergency disaster hood, completed summer homework, and health check card.";
  } else if (type === 'pta') {
    sampleText = "PTA Campus Cleanup & Weeding Day: Saturday, August 29th (8:30 AM - 10:30 AM) on school grounds. Bring work gloves, sweat towel, sun protection hat, and water bottle. Return volunteer RSVP by Aug 22nd.";
  } else if (type === 'photo_day') {
    sampleText = "Annual School Photo Day: Monday, September 28th (9:00 AM - 12:00 PM). Dress code: Full formal school uniform with ID badge. Return order envelope by Sept 20th.";
  }

  try {
    const formData = new FormData();
    formData.append('text', sampleText);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    hideLoadingToast();

    if (data.draft) {
      data.draft.image_url = sampleSvg;
      openDraftModal(data.draft);
    }
  } catch (err) {
    hideLoadingToast();
    alert('解析に失敗しました: ' + err.message);
  }
}

async function submitAnalyze() {
  const textVal = document.getElementById('rawTextInput').value.trim();
  if (!selectedFile && !textVal) {
    alert('プリントの写真を選択するか、英語テキストを入力してください。');
    return;
  }

  closeModal('uploadModal');
  showLoadingToast('AIが英語プリントを読み取り、日本語に翻訳中...');

  try {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
    if (textVal) {
      formData.append('text', textVal);
    }

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: サーバーエラー`);
    }

    const data = await res.json();
    hideLoadingToast();

    if (data.draft) {
      openDraftModal(data.draft);
    } else {
      alert('解析結果の取得に失敗しました。');
    }
  } catch (err) {
    hideLoadingToast();
    console.error('AI Analyze error:', err);
    alert('AI解析でエラーが発生しました: ' + err.message);
  }
}

// --- 下書き確認・編集モーダル ---
let isEditingMode = false;
const AVAILABLE_TAGS = ['英語・UOI', '中国語', 'アート', 'Music', '体育・PE', '学校行事', '提出物あり'];

function openDraftModal(draft, isEditing = false) {
  currentDraftData = Object.assign({}, draft);
  isEditingMode = isEditing;

  // モーダルタイトル & ボタン
  document.getElementById('draftModalTitle').innerText = isEditing ? 'おたよりの編集' : 'AI読取 ＆ 翻訳完了（確認・編集）';
  document.getElementById('draftSubmitBtnText').innerText = isEditing ? '変更を保存する' : 'この内容でおたよりを登録';

  document.getElementById('draftTitle').value = draft.title || '';
  document.getElementById('draftTitleEn').value = draft.title_en || '';
  document.getElementById('draftSummary').value = draft.summary || '';
  document.getElementById('draftSourceText').value = draft.source_text || '';

  // タグ選択ボタングループ生成
  currentDraftData.tags = currentDraftData.tags || [];
  renderDraftTagButtons();

  // 日時・場所
  document.getElementById('draftDate').value = draft.date || '';
  document.getElementById('draftLocation').value = draft.location || '';
  document.getElementById('draftTimeStart').value = draft.time_start || '';
  document.getElementById('draftTimeEnd').value = draft.time_end || '';
  
  const dateTimeDetails = document.getElementById('draftDateTimeDetails');
  if (dateTimeDetails) {
    dateTimeDetails.open = Boolean(draft.date || draft.location || draft.time_start);
  }

  // 締切
  document.getElementById('draftDeadline').value = draft.deadline || '';
  document.getElementById('draftDeadlineDesc').value = draft.deadline_description || '';
  const deadlineDetails = document.getElementById('draftDeadlineDetails');
  if (deadlineDetails) {
    deadlineDetails.open = Boolean(draft.deadline);
  }

  // 持ち物
  currentDraftData.items = currentDraftData.items || [];
  renderDraftItems(currentDraftData.items);
  const itemsDetails = document.getElementById('draftItemsDetails');
  if (itemsDetails) {
    itemsDetails.open = (currentDraftData.items.length > 0);
  }

  // 画像プレビュー
  const imgContainer = document.getElementById('draftImageContainer');
  const imgPreview = document.getElementById('draftImagePreview');
  if (draft.image_url) {
    imgPreview.src = draft.image_url;
    imgContainer.classList.remove('hidden');
  } else {
    imgContainer.classList.add('hidden');
  }

  openModal('draftModal');
}

function renderDraftTagButtons() {
  const container = document.getElementById('draftTagsContainer');
  if (!container) return;

  container.innerHTML = AVAILABLE_TAGS.map(t => {
    const isSelected = (currentDraftData.tags || []).includes(t);
    let activeClass = isSelected 
      ? 'bg-stone-900 text-white shadow-sm' 
      : 'bg-stone-100 text-stone-600 hover:bg-stone-200';
    return `
      <button type="button" onclick="toggleDraftTag('${t}')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeClass}">
        ${isSelected ? '✓ ' : ''}${escapeHtml(t)}
      </button>
    `;
  }).join('');
}

function toggleDraftTag(tag) {
  if (!currentDraftData) return;
  currentDraftData.tags = currentDraftData.tags || [];
  const idx = currentDraftData.tags.indexOf(tag);
  if (idx > -1) {
    currentDraftData.tags.splice(idx, 1);
  } else {
    currentDraftData.tags.push(tag);
  }
  renderDraftTagButtons();
}

function renderDraftItems(items) {
  const container = document.getElementById('draftItemsContainer');
  const badge = document.getElementById('draftItemsBadge');

  if (items.length > 0) {
    if (badge) {
      badge.innerText = `${items.length}件`;
      badge.classList.remove('hidden');
    }
    container.innerHTML = items.map((item, idx) => `
      <span class="item-tag cursor-pointer hover:opacity-75 transition" onclick="removeDraftItem(${idx})" title="クリックして削除">
        🎒 ${escapeHtml(item)}
        <i data-lucide="x" class="w-3 h-3"></i>
      </span>
    `).join('');
  } else {
    if (badge) badge.classList.add('hidden');
    container.innerHTML = '<span class="text-[11px] text-stone-400 self-center">持ち物なし（下の入力欄から追加可能）</span>';
  }
  if (window.lucide) lucide.createIcons();
}

function removeDraftItem(index) {
  if (currentDraftData && currentDraftData.items) {
    currentDraftData.items.splice(index, 1);
    renderDraftItems(currentDraftData.items);
  }
}

function addDraftItem() {
  const input = document.getElementById('newDraftItemInput');
  const val = input.value.trim();
  if (val && currentDraftData) {
    currentDraftData.items = currentDraftData.items || [];
    currentDraftData.items.push(val);
    renderDraftItems(currentDraftData.items);
    input.value = '';
  }
}

async function saveDraftPost(event) {
  event.preventDefault();

  const postData = {
    title: document.getElementById('draftTitle').value.trim(),
    title_en: document.getElementById('draftTitleEn').value.trim(),
    date: document.getElementById('draftDate').value || null,
    time_start: document.getElementById('draftTimeStart').value || null,
    time_end: document.getElementById('draftTimeEnd').value || null,
    location: document.getElementById('draftLocation').value.trim(),
    target_child: currentDraftData.target_child || '児童',
    items: currentDraftData.items || [],
    items_en: currentDraftData.items_en || [],
    deadline: document.getElementById('draftDeadline').value || null,
    deadline_description: document.getElementById('draftDeadlineDesc').value.trim(),
    summary: document.getElementById('draftSummary').value.trim(),
    summary_en: currentDraftData.summary_en || '',
    source_text: document.getElementById('draftSourceText').value.trim(),
    source_date_raw: currentDraftData.source_date_raw || '',
    tags: currentDraftData.tags || ['学校連絡'],
    image_url: currentDraftData.image_url || null
  };

  try {
    let url = '/api/posts';
    let method = 'POST';

    if (isEditingMode && currentDraftData && currentDraftData.id) {
      url = `/api/posts/${currentDraftData.id}`;
      method = 'PUT';
    }

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    const result = await res.json();
    closeModal('draftModal');
    showNotificationToast(isEditingMode ? '✏️ おたよりを更新しました！' : '📮 おたよりを登録しました！');
    loadAllData();
  } catch (err) {
    alert('保存エラー: ' + err.message);
  }
}

// --- 詳細モーダル ＆ 編集 ---
function editCurrentPost() {
  if (!activePostDetail) return;
  closeModal('detailModal');
  openDraftModal(activePostDetail, true);
}

async function openDetailModal(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}`);
    const post = await res.json();
    activePostDetail = post;

    document.getElementById('detailTitle').innerText = post.title;
    document.getElementById('detailTitleEn').innerText = post.title_en || '';
    document.getElementById('detailDateDisplay').innerText = post.date ? `${post.date.replace(/-/g, '/')}` : '';
    
    // タグバッジ群
    const badgesContainer = document.getElementById('detailBadgesContainer');
    if (badgesContainer) {
      badgesContainer.innerHTML = (post.tags || []).map(t => {
        let colorClass = 'bg-stone-100 text-stone-700';
        if (t.includes('英語') || t.includes('UOI')) colorClass = 'bg-blue-100 text-blue-800';
        else if (t.includes('中国語')) colorClass = 'bg-red-100 text-red-800';
        else if (t.includes('アート')) colorClass = 'bg-purple-100 text-purple-800';
        else if (t.includes('Music')) colorClass = 'bg-pink-100 text-pink-800';
        else if (t.includes('学校行事') || t.includes('行事')) colorClass = 'bg-emerald-100 text-emerald-800';
        else if (t.includes('提出物')) colorClass = 'bg-amber-100 text-amber-800';
        return `<span class="px-2 py-0.5 rounded-full text-xs font-bold ${colorClass}">${escapeHtml(t)}</span>`;
      }).join('');
    }

    // 日時・場所カード
    const dateTimeCard = document.getElementById('detailDateTimeCard');
    const hasDateTime = Boolean(post.date || post.time_start || post.location || post.deadline);
    if (hasDateTime) {
      dateTimeCard.classList.remove('hidden');
      const timeStr = (post.time_start && post.time_end) ? `${post.time_start} 〜 ${post.time_end}` : (post.time_start || '終日');
      document.getElementById('detailTime').innerText = timeStr;
      document.getElementById('detailLocation').innerText = post.location || '学校';

      // 締切
      const deadlineRow = document.getElementById('detailDeadlineRow');
      if (post.deadline) {
        document.getElementById('detailDeadline').innerText = `${post.deadline.replace(/-/g, '/')} (${post.deadline_description || '提出'})`;
        deadlineRow.classList.remove('hidden');
      } else {
        deadlineRow.classList.add('hidden');
      }
    } else {
      dateTimeCard.classList.add('hidden');
    }

    // 画像
    const imgEl = document.getElementById('detailImage');
    imgEl.src = post.image_url || '/static/samples/no_image.svg';

    // 持ち物（ある場合のみ表示）
    const itemsSection = document.getElementById('detailItemsSection');
    const itemsContainer = document.getElementById('detailItems');
    if ((post.items || []).length > 0) {
      itemsSection.classList.remove('hidden');
      itemsContainer.innerHTML = post.items.map(item => `
        <span class="item-tag text-xs px-2.5 py-1">🎒 ${escapeHtml(item)}</span>
      `).join('');
    } else {
      itemsSection.classList.add('hidden');
    }

    // 要約 ＆ 原文
    document.getElementById('detailSummary').innerText = post.summary || '詳細なし';
    document.getElementById('detailSourceText').innerText = post.source_text || '原文なし';

    openModal('detailModal');
  } catch (err) {
    alert('詳細の取得に失敗しました: ' + err.message);
  }
}

async function deleteCurrentPost() {
  if (!activePostDetail) return;
  if (!confirm(`「${activePostDetail.title}」を削除しますか？`)) return;

  try {
    await fetch(`/api/posts/${activePostDetail.id}`, { method: 'DELETE' });
    closeModal('detailModal');
    showNotificationToast('🗑️ おたよりを削除しました');
    loadAllData();
  } catch (err) {
    alert('削除エラー: ' + err.message);
  }
}

// 提出済みチェック
async function toggleSubmission(postId, isSubmitted) {
  try {
    await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_submitted: isSubmitted })
    });
    loadDeadlines();
    showNotificationToast(isSubmitted ? '✅ 提出済みに更新しました！' : '↩️ 未提出に戻しました');
  } catch (err) {
    console.error('Failed to update submission status:', err);
  }
}

// --- カレンダー連携 URL生成 ---
function buildGoogleCalendarUrl(post) {
  const title = encodeURIComponent(`【学校】${post.title}`);
  const eventDate = (post.date || '').replace(/-/g, '');
  const startT = (post.time_start || '08:30').replace(/:/g, '') + '00';
  const endT = (post.time_end || '15:00').replace(/:/g, '') + '00';
  const dates = `${eventDate}T${startT}/${eventDate}T${endT}`;

  let details = `【行事概要】\n${post.summary || ''}\n\n【持ち物】\n${(post.items || []).join(', ')}`;
  if (post.deadline) {
    details += `\n\n【提出締切】\n${post.deadline} (${post.deadline_description || ''})`;
  }
  details += `\n\n【英語原文】\n${post.title_en || ''}`;

  const loc = encodeURIComponent(post.location || '学校');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${encodeURIComponent(details)}&location=${loc}`;
}

function addToGoogleCalendar() {
  if (!activePostDetail) return;
  const url = buildGoogleCalendarUrl(activePostDetail);
  window.open(url, '_blank');
}

// --- LINE通知モーダル ---
async function openLineModal(postId = null) {
  const targetId = postId || (activePostDetail ? activePostDetail.id : null);
  openModal('lineModal');
  showLineNotification(targetId);
}

let currentLineMessageText = '';

async function showLineNotification(postId) {
  const target = activePostDetail || (currentPosts && currentPosts.length > 0 ? currentPosts[0] : null);
  if (target) {
    const title = target.title || '';
    const summary = target.summary || '';
    currentLineMessageText = `Fairview  school info📢\n重要な予定\n「${title}」\n「${summary}」`;
    const bubble = document.getElementById('linePreviewBubble');
    if (bubble) bubble.innerText = currentLineMessageText;
  }

  try {
    const res = await fetch('/api/line/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId })
    });
    const data = await res.json();
    if (data.message) {
      currentLineMessageText = data.message;
      const bubble = document.getElementById('linePreviewBubble');
      if (bubble) bubble.innerText = data.message;
    }
    const timeEl = document.getElementById('lineTimeDisplay');
    if (timeEl) timeEl.innerText = data.sent_at || '18:00';
  } catch (err) {
    console.log('LINE notify api fetch fallback:', err);
  }
}

function triggerSimulatedLineNotification() {
  showLineNotification(activePostDetail ? activePostDetail.id : null);
}

function notifyViaLine() {
  if (activePostDetail) {
    openLineModal(activePostDetail.id);
  } else {
    openLineModal(null);
  }
}

function shareDirectToLine() {
  let msg = currentLineMessageText;
  if (!msg && activePostDetail) {
    const title = activePostDetail.title || '';
    const summary = activePostDetail.summary || '';
    msg = `Fairview  school info📢\n重要な予定\n「${title}」\n「${summary}」`;
  }
  if (!msg) {
    msg = "Fairview  school info📢\n重要な予定";
  }

  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(msg)}`;
  window.open(lineShareUrl, '_blank');
}

function copyLineMessage() {
  const text = currentLineMessageText || document.getElementById('linePreviewBubble').innerText;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotificationToast('📋 メッセージをコピーしました！');
    }).catch(() => {
      alert('コピーに失敗しました');
    });
  } else {
    showNotificationToast('📋 メッセージをコピーしました！');
  }
}

// --- 設定保存 ---
async function saveSettings(event) {
  event.preventDefault();
  const userName = document.getElementById('settingUserName').value.trim();
  const apiKey = document.getElementById('settingApiKey').value.trim();
  const notifyTime = document.getElementById('settingNotifyTime').value;

  const payload = {
    user_name: userName || 'めぐ',
    notification_time: notifyTime || '18:00'
  };
  if (apiKey) payload.gemini_api_key = apiKey;

  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    closeModal('settingsModal');
    showNotificationToast('⚙️ 設定を保存しました');
    loadSettings();
  } catch (err) {
    alert('設定保存エラー: ' + err.message);
  }
}

function openSettingsModal() {
  openModal('settingsModal');
}

// --- モーダル制御 ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// --- トースト通知 ---
function showNotificationToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xl animate-pop flex items-center gap-2';
  toast.innerHTML = `<span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

let loadingToastEl = null;
function showLoadingToast(msg) {
  if (loadingToastEl) loadingToastEl.remove();
  loadingToastEl = document.createElement('div');
  loadingToastEl.className = 'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center';
  loadingToastEl.innerHTML = `
    <div class="bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-3 animate-pop">
      <div class="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs font-bold text-stone-800">${msg}</p>
    </div>
  `;
  document.body.appendChild(loadingToastEl);
}

function hideLoadingToast() {
  if (loadingToastEl) {
    loadingToastEl.remove();
    loadingToastEl = null;
  }
}

// --- デバイス枠切り替え ---
let isDeviceMode = true;
function toggleDeviceFrame() {
  isDeviceMode = !isDeviceMode;
  const body = document.body;
  const label = document.getElementById('frameToggleText');

  if (isDeviceMode) {
    body.classList.add('device-frame-mode');
    label.innerText = '枠あり';
  } else {
    body.classList.remove('device-frame-mode');
    label.innerText = '全画面';
  }
}

// ユーティリティ
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
