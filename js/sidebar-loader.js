async function loadSidebar() {
  try {
    const response = await fetch("partials/sidebar.html");
    const html = await response.text();
    const container = document.getElementById("sidebar-container");
    if (container) {
      container.innerHTML = html;
      console.log("★1: サイドバーの枠組み読み込み完了！");
      await renderRecentPostsFromGAS();
    }
  } catch (err) {
    console.error("★サイドバー枠エラー:", err);
  }
}

async function renderRecentPostsFromGAS() {
  const listContainer = document.getElementById('recent-posts-list');
  if (!listContainer) {
    console.error("★エラー: recent-posts-list がHTMLに見当たらないよ！");
    return;
  }

  const GAS_URL = "https://script.google.com/macros/s/AKfycbzB1DkBAyrV5YZrStVlr8AU4jbf-s0NEzYghrjr-rA51JB_DBh3wMulhbokJNcGIYB-/exec"; 

  try {
    console.log("★2: GASにデータを取りに行くよ...");
    const res = await fetch(GAS_URL);
    const allData = await res.json();
    
    console.log("★3: GASから届いた全データ:", allData);

    if (!allData || allData.length === 0) {
      console.log("★4: データが空っぽみたい...");
      listContainer.innerHTML = "<li>記事がまだありません</li>";
      return;
    }

    // IDで並び替えて最新3件
    const latestPosts = allData.sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 3);
    console.log("★5: 表示する3件はこれ:", latestPosts);

    let html = '';
    latestPosts.forEach(post => {
      const snowClass = (post.type === "配信") ? 'recent-snow1' : 'recent-snow2';
      const linkDest = (post.type === "配信外") ? 'post-off.html' : 'post.html';
      html += `
        <li style="margin-bottom: 12px; line-height: 1.4; list-style: none;">
          <span class="${snowClass}" style="margin-right: 5px;">❄</span>
          <a href="${linkDest}?id=${post.id}" style="color: inherit; text-decoration: none;">
            ${post.title}
          </a>
        </li>`;
    });

    listContainer.innerHTML = html;
    console.log("★6: 画面に新着日記を出したよ！");

  } catch (e) {
    console.error("★7: GASの読み込みで失敗したよ:", e);
    listContainer.innerHTML = "<li>読み込みエラーが発生しました</li>";
  }
}

document.addEventListener("DOMContentLoaded", loadSidebar);