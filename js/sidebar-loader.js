// サイドバーを読み込んで新着を出す魔法のセット
function loadSidebar() {
  fetch("partials/sidebar.html")
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById("sidebar-container");
      if (container) {
        container.innerHTML = data;
        if (typeof diaryData !== 'undefined') {
          renderRecentPosts();
        }
      }
    });
}

function renderRecentPosts() {
  const listContainer = document.getElementById('recent-posts');
  if (!listContainer) return;

  // 1. 最新の3つを取得
  const latestPosts = diaryData.slice(0, 3);

  // 2. リストの中身を作る（❄の色分けと文字サイズ0.9remを徹底！）
  const listHtml = latestPosts.map(post => {
    // 配信日記(true)ならrecent-snow1、配信外(false)ならrecent-snow2
    const snowClass = post.isLive ? 'recent-snow1' : 'recent-snow2';
    
    return `
      <li style="list-style: none; margin-bottom: 12px; line-height: 1.4; font-size: 0.9rem;">
        <span class="${snowClass}" style="margin-right: 5px;">❄</span>
        <a href="post.html?id=${post.id}" style="color: inherit; text-decoration: none;">
          ${post.title}
        </a>
      </li>
    `;
  }).join('');

  // 3. 他を消さないように、ulタグの中身「だけ」を書き換える
  listContainer.style.paddingLeft = "0";
  listContainer.innerHTML = listHtml;
}

// ページが開いたら自動で動くようにする
document.addEventListener("DOMContentLoaded", loadSidebar);