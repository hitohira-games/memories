console.log("エンジン起動したで！データの中身はこれや：", diaryData);


function displayArticles() {
  // 「id」じゃなくて「class」の名前で場所を探すように変えたで！
  const listContainer = document.querySelector('.article-list');
  
  if (!listContainer) {
    console.error("エラー：'.article-list'というクラスが見つからへんよ！");
    return;
  }

  listContainer.innerHTML = ''; // 中身を一度空っぽにする

  // 最新5件をループで回す
  const latestFive = diaryData.slice(0, 5);

  latestFive.forEach(item => {
    // ゆうちゃんが作ったカードのデザインをそのまま流し込む
    const card = `
      <a href="${item.url}" class="article-card">
        <div class="card-top">
          <span class="card-category">${item.category}</span>
          <span class="card-date">${item.date}</span>
        </div>
        <p class="card-article-title">${item.title}</p>
        <p class="card-excerpt">${item.excerpt}</p>
        <div class="card-tags">
          ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
      </a>
    `;
    listContainer.innerHTML += card;
  });
}

function displayArticles() {
  const listContainer = document.querySelector('.article-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  // diaryData（一覧用データ）を回す
  diaryData.slice(0, 5).forEach(item => {
    // リンク先を post.html?id=○○ に変えるのがコツ！
    const card = `
      <a href="post.html?id=${item.id}" class="article-card">
        <div class="card-top">
          <span class="card-category">${item.category}</span>
          <span class="card-date">${item.date}</span>
        </div>
        <p class="card-article-title">${item.title}</p>
        <p class="card-excerpt">${item.excerpt}</p>
        <div class="card-tags">
          ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
      </a>
    `;
    listContainer.innerHTML += card;
  });
}
displayArticles();

// 実行！
displayArticles();