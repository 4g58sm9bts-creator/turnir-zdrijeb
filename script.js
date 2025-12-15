const TEAMS = [
  "MNK Pag",
  "MNK Kolan",
  "MNK Mornar",
  "MNK Gorica",
  "MNK Rtina",
  "Veterani Pag",
  "Forca",
  "Cavali",
  "Mlade nade",
  "Tenkisti Zadar",
  "Pumpa baš iz Brabusa",
  "Papataži Pag",
  "O.Š. Juraj Dalmatinac Pag",
  "Stara Novalja",
  "M.A.M Povljana / Plovanija",
  "Julovica boys",
  "Separe",
  "Hajduk Vlašići",
];

const resultsEl = document.getElementById("results");
const drawBtn = document.getElementById("drawBtn");
const copyBtn = document.getElementById("copyBtn");

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pairTeams(teams) {
  const pairs = [];
  for (let i = 0; i < teams.length; i += 2) {
    pairs.push([teams[i], teams[i + 1]]);
  }
  return pairs;
}

function renderRound(title, pairs) {
  const div = document.createElement("div");
  div.className = "round";
  div.innerHTML = `
    <h2>${title}</h2>
    <ol>
      ${pairs.map(
        ([a, b], i) => `<li>${a} vs ${b}</li>`
      ).join("")}
    </ol>
  `;
  resultsEl.appendChild(div);
}

drawBtn.addEventListener("click", () => {
  resultsEl.innerHTML = "";
  copyBtn.disabled = false;

  const shuffled = shuffle(TEAMS);

  // PRETKOLO I – 12 ekipa
  const pre1Teams = shuffled.slice(0, 12);
  const pre2Direct = shuffled.slice(12);

  const pre1Pairs = pairTeams(pre1Teams);
  renderRound("Pretkolo I", pre1Pairs);

  // PRETKOLO II – 12 ekipa
  const pre2Teams = [
    ...pre1Pairs.map((_, i) => `Pobjednik PK1-${i + 1}`),
    ...pre2Direct,
  ];

  const pre2Pairs = pairTeams(pre2Teams);
  renderRound("Pretkolo II", pre2Pairs);

  // ČETVRTFINALE
  const qfTeams = pre2Pairs.map((_, i) => `Pobjednik PK2-${i + 1}`);
  const qfPairs = pairTeams(qfTeams);
  renderRound("Četvrtfinale", qfPairs);

  // POLUFINALE
  const sfTeams = qfPairs.map((_, i) => `Pobjednik QF-${i + 1}`);
  const sfPairs = pairTeams(sfTeams);
  renderRound("Polufinale", sfPairs);

  // FINALE
  renderRound("Finale", [["Pobjednik SF-1", "Pobjednik SF-2"]]);

  copyBtn.onclick = async () => {
    const text = Array.from(document.querySelectorAll(".round"))
      .map(r => r.innerText)
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Kopirano!";
    setTimeout(() => copyBtn.textContent = "Kopiraj ždrijeb", 1200);
  };
});
