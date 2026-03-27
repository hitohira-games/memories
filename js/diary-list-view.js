function displayList() {
  // 1. URLから「?id=20260407」の数字を読み取る
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');
  
  console.log("読み込もうとしているID:", postId); // 👈 確認用（F12で見れるよ）

  // 2. 名簿（diaryData）からそのIDの情報を探す
  const currentIndex = diaryData.findIndex(item => item.id === postId);
  const postInfo = diaryData[currentIndex];
  
  // 3. 倉庫（diaryContents）からそのIDの本文を探す
  const postBody = diaryContents[postId];

  // 4. 情報と本文が両方見つかったら、HTMLを書き換える
  if (postInfo && postBody) {
    // タイトル類を書き換え
    const titleEl = document.getElementById('post-title');
    if (titleEl) titleEl.textContent = postInfo.title;

    const breadcrumbEl = document.getElementById('post-breadcrumb-title');
    if (breadcrumbEl) breadcrumbEl.textContent = postInfo.title;

    const dateEl = document.getElementById('post-date');
    if (dateEl) dateEl.textContent = postInfo.date;

    const categoryEl = document.getElementById('post-category');
    if (categoryEl) categoryEl.textContent = postInfo.category;

    // タグを書き換え
    const tagContainer = document.getElementById('post-tags');
    if (tagContainer) {
      tagContainer.innerHTML = postInfo.tags.map(tag => 
        `<span class="article-tag">#${tag}</span>`
      ).join(' ');
    }

    // ★ここが一番大事！ 本文を流し込む
    const container = document.getElementById('list-content');
    if (container) {
      container.innerHTML = postBody; 
    }

    // ブラウザのタブ名
    document.title = postInfo.title + " — ❄ ゲームひとひら綴り ❄";

    // 前後のナビゲーションを実行
    updateNavigation(currentIndex);
    
    console.log("表示成功！");
  } else {
    console.log("データが見つかりませんでした。IDが合ってるか確認してね。");
  }
}

// 「前へ・次へ」のリンクを作る関数
function updateNavigation(currentIndex) {
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const prevTitle = document.getElementById('title-prev');
  const nextTitle = document.getElementById('title-next');

  // 一旦全部消して隠す（これで幽霊の線が消える！）
  if(prevBtn) prevBtn.style.display = 'none';
  if(nextBtn) nextBtn.style.display = 'none';

  // --- 前の記事（古い日記） ---
  if (prevBtn && currentIndex < diaryData.length - 1) {
    const prevPost = diaryData[currentIndex + 1];
    prevBtn.href = `post.html?id=${prevPost.id}`;
    if (prevTitle) prevTitle.textContent = prevPost.title;
    prevBtn.style.display = 'flex'; // データがある時だけ出す！
  }

  // --- 次の記事（新しい日記） ---
  if (nextBtn && currentIndex > 0) {
    const nextPost = diaryData[currentIndex - 1];
    nextBtn.href = `post.html?id=${nextPost.id}`;
    if (nextTitle) nextTitle.textContent = nextPost.title;
    nextBtn.style.display = 'flex'; // データがある時だけ出す！
  }
}

// ページの準備ができるのを待ってから魔法をかける
window.onload = function() {
  setTimeout(displayList, 100);
};