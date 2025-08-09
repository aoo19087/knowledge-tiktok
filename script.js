/*
 * The data for the knowledge cards is embedded directly in this script to avoid
 * cross‑origin issues when loading via the file:// protocol. Each entry
 * contains a Japanese question and its corresponding answer.
 */
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
  { question: 'なぜ満月は大きく見えるときがあるの？', answer: '地平線近くでは錯覚で大きく見える『月の錯視』。' },
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
  { question: '昔は『トマトは毒』と信じられていた？', answer: 'ヨーロッパではナス科＝毒のイメージがあったから。' }
];

// Shuffle the cards to randomize the order on each load
knowledgeCards.sort(() => Math.random() - 0.5);

// Reference to the container element
const container = document.getElementById('cards-container');

// Iterate through each card and build the DOM structure
knowledgeCards.forEach((card) => {
  const section = document.createElement('div');
  section.className = 'card';

  // Random pastel background using HSL; using lightness to keep it soft
  const hue = Math.floor(Math.random() * 360);
  section.style.backgroundColor = `hsl(${hue}, 70%, 93%)`;

  const questionEl = document.createElement('h2');
  questionEl.textContent = card.question;

  const toggleButton = document.createElement('button');
  toggleButton.textContent = '答えを見る';

  const answerEl = document.createElement('p');
  answerEl.className = 'answer';
  answerEl.textContent = card.answer;

  toggleButton.addEventListener('click', () => {
    const visible = answerEl.style.display === 'block';
    answerEl.style.display = visible ? 'none' : 'block';
    toggleButton.textContent = visible ? '答えを見る' : '隠す';
  });

  section.appendChild(questionEl);
  section.appendChild(toggleButton);
  section.appendChild(answerEl);
  container.appendChild(section);
});
