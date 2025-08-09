/*
 * 雑学サイトのフロントエンドロジック。
 *
 * このスクリプトでは、1枚ずつカードを表示し、
 *   - 「答えを見る」ボタンで答えの表示/非表示の切り替え
 *   - 「もっと知る」ボタンでランダムに関連する雑学をレコメンド
 *   - 「次は◯◯に関する知識」リンクで次のカードへ移動
 *   - 匿名フィードバックをメールで送信
 * ができるようにしています。
 */

// 雑学カードのデータ。各オブジェクトに質問と回答を格納する。
const knowledgeCards = [
  { question: 'なぜ猫は喉を鳴らすのか？', answer: 'リラックスや安心、甘えたいとき、時には痛みや不安を和らげるためにも鳴らす。' },
  { question: 'コーヒーを飲むベストな時間は？', answer: '朝起きてすぐではなく、起きて90分後〜午前中が効果的。' },
  { question: '世界一短い戦争とは？', answer: '1896年のイギリス・ザンジバル戦争で38分で終わった。' },
  { question: 'なぜバナナは曲がっているの？', answer: '太陽の光に向かって成長するから。' },
  { question: 'ペンギンはなぜ寒さに耐えられるの？', answer: '厚い脂肪と密生した羽毛、仲間とくっつく習性があるから。' },
  { question: '宇宙で最も熱い惑星は？', answer: '金星、表面温度は約460°C。' },
  { question: 'なぜ玉ねぎを切ると涙が出るの？', answer: '硫黄化合物が揮発して目を刺激するから。' },
  { question: '世界で一番深い海は？', answer: 'マリアナ海溝、約11000m。' },
  { question: 'サメはなぜずっと泳ぎ続けるの？', answer: '一部の種は泳がないとエラに酸素が届かないから。' },
  { question: 'ミツバチはどうやって花粉を運ぶの？', answer: '脚の花粉バスケットに花粉を丸めて持ち帰る。' },
  { question: 'カメの寿命が長い理由は？', answer: '代謝が遅く、外敵が少ないから。' },
  { question: 'なぜ指の関節を鳴らすの？', answer: '関節液の中の気泡が弾ける音。' },
  { question: '地球の一日は本当は何時間？', answer: '24時間より少し長く、約24時間と0.0001秒。' },
  { question: '実は存在する『透明な魚』って？', answer: 'グラスキャットフィッシュやバリアタスフィッシュが有名。' },
  { question: '鳥はなぜV字で飛ぶの？', answer: '空気抵抗を減らし、エネルギーを節約できるから。' },
  { question: '「青いバラ」は本当にあるの？', answer: '自然界にはないが、遺伝子操作や染色で作られた。' },
  { question: '世界一小さい哺乳類は？', answer: 'トウキョウトガリネズミやキクガシラコウモリ（体重2g前後）。' },
  { question: '飛行機の窓が丸い理由は？', answer: '四角いと角に圧力が集中して壊れやすくなるから。' },
  { question: 'なぜ満月は大きく見えるときがあるの？', answer: '地平線近くでは錯覚で大きく見える「月の錯視」。' },
  { question: 'パンダが白黒なのはなぜ？', answer: '雪や森でカモフラージュしつつ、仲間との認識もしやすくするため。' },
  { question: '宇宙飛行士が宇宙で泣くとどうなる？', answer: '涙が頬を流れず、目の表面に球状にたまる。' },
  { question: '実は食べられる花って？', answer: 'ナスタチウム、ビオラ、バラなどが食用になる。' },
  { question: '世界一古い生き物は？', answer: '5000年以上生きるマツ（ブリッスルコーンパイン）。' },
  { question: 'クジラはなぜ歌うの？', answer: '仲間とのコミュニケーションや求愛のため。' },
  { question: '火山の中の温度ってどれくらい？', answer: '溶岩は約700〜1200°C。' },
  { question: 'なぜ氷は水に浮くの？', answer: '固体になると密度が下がるから。' },
  { question: '世界一大きい雪の結晶のサイズは？', answer: '直径38cm（アメリカ、1887年記録）。' },
  { question: '人間の骨はどれくらい強いの？', answer: '同じ重量の鉄よりも強い。' },
  { question: '世界一長い単語は？', answer: 'タンパク質の化学名で、19万文字以上。' },
  { question: '昔は「トマトは毒」と信じられていた？', answer: 'ヨーロッパではナス科＝毒のイメージがあったから。' }
];

// 現在表示しているカードのインデックス
let currentIndex = 0;

/**
 * 指定したインデックスのカードを描画する関数。
 * @param {number} index 表示するカードのインデックス
 */
function renderCard(index) {
  const container = document.getElementById('card-container');
  container.innerHTML = '';
  const card = knowledgeCards[index];
  // カード全体のラッパー
  const section = document.createElement('div');
  section.className = 'card';
  // ランダムなパステル背景色を設定
  const hue = Math.floor(Math.random() * 360);
  section.style.backgroundColor = `hsl(${hue}, 70%, 93%)`;
  // 質問
  const questionEl = document.createElement('h2');
  questionEl.textContent = card.question;
  // 答え（非表示にしておく）
  const answerEl = document.createElement('p');
  answerEl.className = 'answer';
  answerEl.textContent = card.answer;
  answerEl.style.display = 'none';
  // 答えを見るボタン
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '答えを見る';
  toggleButton.addEventListener('click', () => {
    const visible = answerEl.style.display === 'block';
    answerEl.style.display = visible ? 'none' : 'block';
    toggleButton.textContent = visible ? '答えを見る' : '隠す';
  });
  // もっと知るボタン（AIレコメンド風）
  const moreButton = document.createElement('button');
  moreButton.textContent = 'もっと知る';
  moreButton.style.marginLeft = '8px';
  moreButton.addEventListener('click', () => {
    const recIndex = getRandomIndex(currentIndex);
    const rec = knowledgeCards[recIndex];
    // 簡易的にアラートで関連知識を提示
    alert(`おすすめ: ${rec.question}\n${rec.answer}`);
  });
  // 次へリンク
  const nextIndex = (index + 1) % knowledgeCards.length;
  const nextLink = document.createElement('a');
  nextLink.href = '#';
  nextLink.textContent = `次は「${knowledgeCards[nextIndex].question}」に関する知識`;
  nextLink.style.display = 'block';
  nextLink.style.marginTop = '1rem';
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = nextIndex;
    renderCard(currentIndex);
    // ページ上部へスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // 要素を組み立て
  section.appendChild(questionEl);
  // ボタンコンテナを使って横並びに配置
  const buttonWrapper = document.createElement('div');
  buttonWrapper.appendChild(toggleButton);
  buttonWrapper.appendChild(moreButton);
  section.appendChild(buttonWrapper);
  section.appendChild(answerEl);
  section.appendChild(nextLink);
  container.appendChild(section);
}

/**
 * 現在のインデックスを除いてランダムなインデックスを返す。
 * @param {number} exclude 除外するインデックス
 * @returns {number} ランダムなインデックス
 */
function getRandomIndex(exclude) {
  let idx;
  do {
    idx = Math.floor(Math.random() * knowledgeCards.length);
  } while (idx === exclude && knowledgeCards.length > 1);
  return idx;
}

/**
 * フィードバック送信処理。ユーザーのメッセージをメールクライアントに渡す。
 */
function sendFeedback() {
  const textarea = document.getElementById('feedback-input');
  const message = textarea.value.trim();
  if (message.length === 0) {
    alert('フィードバックを入力してください。');
    return;
  }
  // 開発者のメールアドレス（必要に応じて変更してください）
  const developerEmail = 'ryouga20011225@icloud.com';
  const subject = encodeURIComponent('雑学サイトへのフィードバック');
  const body = encodeURIComponent(message);
  const mailtoLink = `mailto:${developerEmail}?subject=${subject}&body=${body}`;
  // ユーザーのデフォルトメールクライアントで送信
  window.location.href = mailtoLink;
  // 入力欄をクリア
  textarea.value = '';
  alert('フィードバックありがとうございます！');
}

// 初期化処理
window.addEventListener('DOMContentLoaded', () => {
  // 最初のカードを表示
  renderCard(currentIndex);
  // フィードバック送信ボタンのリスナーを設定
  const fbBtn = document.getElementById('feedback-submit');
  fbBtn.addEventListener('click', sendFeedback);
});
