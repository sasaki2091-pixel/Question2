// ===== 設定 =====
const names = [
    "アイカ工業株式会社 佐藤太郎 様",
    "アイカ工業株式会社 鈴木一郎 様",
    "アイカ工業株式会社 高橋健 様",
    "アイカ工業株式会社 田中翔 様",
    "アイカ工業株式会社 伊藤誠 様",
  
    "山田建設株式会社 山田花子 様",
    "山田建設株式会社 中村直樹 様",
    "山田建設株式会社 小林大輔 様",
    "山田建設株式会社 加藤悠 様",
    "山田建設株式会社 吉田修 様",
  
    "佐藤住宅株式会社 佐藤美咲 様",
    "佐藤住宅株式会社 山口達也 様",
    "佐藤住宅株式会社 松本健太 様",
    "佐藤住宅株式会社 井上亮 様",
    "佐藤住宅株式会社 木村拓也 様",
  
    "大分ホーム株式会社 阿部祐介 様",
    "大分ホーム株式会社 森田直人 様",
    "大分ホーム株式会社 清水亮介 様",
    "大分ホーム株式会社 石井剛 様",
    "大分ホーム株式会社 岡田翔太 様",
  
    "九州リフォーム株式会社 藤田健 様",
    "九州リフォーム株式会社 原田悠斗 様",
    "九州リフォーム株式会社 三浦直樹 様",
    "九州リフォーム株式会社 近藤亮 様",
    "九州リフォーム株式会社 石田裕也 様",
  
    "西日本建装株式会社 内田達也 様",
    "西日本建装株式会社 西村健太 様",
    "西日本建装株式会社 福田翔 様",
    "西日本建装株式会社 坂本悠 様",
    "西日本建装株式会社 岩田誠 様",
  
    "大分デザイン工房株式会社 村上大樹 様",
    "大分デザイン工房株式会社 長谷川直人 様",
    "大分デザイン工房株式会社 金子翔 様",
    "大分デザイン工房株式会社 宮本健 様",
    "大分デザイン工房株式会社 柴田亮 様",
  
    "九州インテリア株式会社 小川達也 様",
    "九州インテリア株式会社 安藤翔 様",
    "九州インテリア株式会社 平野健太 様",
    "九州インテリア株式会社 川口直樹 様",
    "九州インテリア株式会社 大野誠 様",
  
    "福岡建築設計事務所 石川翔太 様",
    "福岡建築設計事務所 新井健 様",
    "福岡建築設計事務所 小野直人 様",
    "福岡建築設計事務所 永井亮 様",
    "福岡建築設計事務所 横山達也 様",
  
    "南九州住宅株式会社 菅原健太 様",
    "南九州住宅株式会社 中川翔 様",
    "南九州住宅株式会社 橋本直樹 様",
    "南九州住宅株式会社 山崎誠 様",
    "南九州住宅株式会社 関口悠 様",
  
    "スマート建材株式会社 本田健 様",
    "スマート建材株式会社 松井翔 様",
    "スマート建材株式会社 神谷直人 様",
    "スマート建材株式会社 小泉亮 様",
    "スマート建材株式会社 高木誠 様",
  
    "未来ハウス株式会社 野口健太 様",
    "未来ハウス株式会社 黒田翔 様",
    "未来ハウス株式会社 大西直樹 様",
    "未来ハウス株式会社 川崎亮 様",
    "未来ハウス株式会社 岸本誠 様",
  
    "リノベーション九州株式会社 今井健 様",
    "リノベーション九州株式会社 秋山翔 様",
    "リノベーション九州株式会社 水野直人 様",
    "リノベーション九州株式会社 谷口亮 様",
    "リノベーション九州株式会社 久保誠 様",
  
    "都市建築パートナーズ株式会社 竹内健 様",
    "都市建築パートナーズ株式会社 赤坂翔 様",
    "都市建築パートナーズ株式会社 星野直人 様",
    "都市建築パートナーズ株式会社 大塚亮 様",
    "都市建築パートナーズ株式会社 早川誠 様"
];


const list = document.getElementById("list");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("winnerOverlay");
const winnerName = document.getElementById("winnerName");

// ===== リスト生成（無限スクロール用）=====
for (let i = 0; i < 10; i++) {
  names.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = name;
    list.appendChild(div);
  });
}

let position = 0;
let speed = 300;
let timer = null;

// ===== スタート =====
startBtn.addEventListener("click", start);
function start() {
  clearInterval(timer);
  speed = 100;
  overlay.classList.add("hidden");

  const items = document.querySelectorAll(".item");
  const itemHeight = items[0].offsetHeight;

  // ランダムな開始位置
  const randomIndex = Math.floor(Math.random() * names.length);
  position = -randomIndex * itemHeight;
  list.style.top = position + "px";

  timer = setInterval(() => {
    position -= speed;
    list.style.top = position + "px";

    // 無限スクロール
    if (Math.abs(position) > list.offsetHeight / 2) {
      position = 0;
    }

    // 減速処理（変更なし）
    if (speed > 10) {
      speed *= 0.985;
    } else if (speed > 1) {
      speed *= 0.993;
    } else {
      // ===== 中央停止フェーズ（ここだけ修正） =====
      if (Math.abs(position % itemHeight) < speed) {
        clearInterval(timer);

        // ▼ ここでは一切 position を動かさない
        // ▼ すでに中央に来た瞬間なのでそのまま止める

        setTimeout(() => {
          decideWinner();
        }, 500);
      }
    }
  }, 16);
}

// function start() {
//   clearInterval(timer);
//   speed = 100;
//   overlay.classList.add("hidden");

//   const items = document.querySelectorAll(".item");
//   const itemHeight = items[0].offsetHeight;


// // ランダムな開始位置
// const randomIndex = Math.floor(Math.random() * names.length);
// position = -randomIndex * itemHeight;
// list.style.top = position + "px";

// timer = setInterval(() => {
//   position -= speed;
//   list.style.top = position + "px";

//   // 無限スクロール
//   if (Math.abs(position) > list.offsetHeight / 2) {
//     position = 0;
//   }

//   // 減速処理
//   if (speed > 10) {
//     speed *= 0.985;
//   } else if (speed > 1) {
//     speed *= 0.993;
//   } else {
//     // ===== 完全停止フェーズ =====
//     clearInterval(timer);

//     // ▼ 中央に一番近い行を計算
//     const offset = position % itemHeight;
//     position -= offset;

//     // ▼ ピタッと中央に吸着
//     list.style.top = position + "px";

//     // ▼「止まった感」を作る間
//     setTimeout(() => {
//       decideWinner();
//     }, 500);
//   }
// }, 16);
// }


// ===== 当選判定 =====
function decideWinner() {
  const frame = document.querySelector(".frame");
  const frameRect = frame.getBoundingClientRect();
  const lineY = frameRect.top + frameRect.height / 2;

  const items = document.querySelectorAll(".item");

  let closest = null;
  let minDiff = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const diff = Math.abs(center - lineY);

    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  showWinner(closest.textContent);
}

// ===== 当選演出 =====
function showWinner(name) {
  winnerName.textContent = name;
  overlay.classList.remove("hidden");
}

