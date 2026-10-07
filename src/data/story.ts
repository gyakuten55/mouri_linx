export const story = [
  "Origin",
  "Encounter",
  "Turning Point",
  "Founding LINX",
  "Now",
].map((title, index) => ({
  title,
  text:
    index === 0
      ? "正式なエピソードを後から差し替えるための余白。人物の背景が静かに伝わる設計です。"
      : "本文は本人の言葉に置き換える前提で、写真と見出しのリズムを優先しています。",
}));
