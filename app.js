const candidateGrid = document.querySelector("#candidateGrid");
const searchInput = document.querySelector("#searchInput");
const partyFilter = document.querySelector("#partyFilter");
const electionCountdown = document.querySelector("#electionCountdown");

function formatNumber(value) {
  return Number(value).toLocaleString("ko-KR");
}

function getInitial(name) {
  return name.slice(0, 1);
}

function createPortrait(candidate) {
  if (candidate.photo) {
    return `
      <div class="portrait-wrap">
        <img src="${candidate.photo}" alt="${candidate.name} 프로필 사진">
      </div>
    `;
  }

  return `
    <div class="portrait-wrap">
      <div class="portrait-placeholder">${getInitial(candidate.name)}</div>
    </div>
  `;
}

function getDdayText(daysLeft) {
  if (daysLeft > 0) {
    return `D-${daysLeft}`;
  }

  if (daysLeft === 0) {
    return "D-DAY";
  }

  return `D+${Math.abs(daysLeft)}`;
}

function renderElectionCountdown() {
  if (!electionCountdown) {
    return;
  }

  const electionDate = new Date(2026, 5, 3);
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const millisecondsPerDay = 86400000;
  const daysLeft = Math.ceil((electionDate - todayOnly) / millisecondsPerDay);

  electionCountdown.innerHTML = `
    <div class="countdown-card">
      <span class="countdown-label">제9회 전국동시지방선거</span>
      <strong class="countdown-dday">${getDdayText(daysLeft)}</strong>
      <span class="countdown-date">2026. 06. 03. 수요일</span>
    </div>
  `;
}

function renderPartyOptions() {
  const parties = [...new Set(candidates.map((candidate) => candidate.party))];

  parties.forEach((party) => {
    const option = document.createElement("option");
    option.value = party;
    option.textContent = party;
    partyFilter.appendChild(option);
  });
}

function candidateMatchesSearch(candidate, searchText) {
  const targetText = [
    candidate.name,
    candidate.party,
    candidate.career,
    candidate.education,
    ...candidate.representativeKeywords,
    ...candidate.controversyIssues
  ].join(" ");

  return targetText.toLowerCase().includes(searchText.toLowerCase());
}

function renderCandidates() {
  const searchText = searchInput.value.trim();
  const selectedParty = partyFilter.value;

  const filtered = candidates.filter((candidate) => {
    const partyMatched = selectedParty === "all" || candidate.party === selectedParty;
    const searchMatched = searchText === "" || candidateMatchesSearch(candidate, searchText);

    return partyMatched && searchMatched;
  });

  candidateGrid.innerHTML = "";

  if (filtered.length === 0) {
    candidateGrid.innerHTML = `
      <div class="empty-message">
        조건에 맞는 후보가 없습니다.
      </div>
    `;
    return;
  }

  filtered.forEach((candidate) => {
    const card = document.createElement("article");
    card.className = "candidate-card";

    const keywordChips = candidate.representativeKeywords
      .map((keyword) => `<span class="keyword-chip">${keyword}</span>`)
      .join("");

    card.innerHTML = `
      ${createPortrait(candidate)}

      <div class="candidate-summary">
        <h2>${candidate.name}</h2>
        <p class="party">${candidate.party}</p>
        <p class="mention-count">언급량 ${formatNumber(candidate.mentionCount)}건</p>

        <div class="keyword-chip-wrap">
          ${keywordChips}
        </div>

        <a class="detail-link" href="candidate.html?id=${candidate.id}">
          자세히 보기
        </a>
      </div>
    `;

    candidateGrid.appendChild(card);
  });
}

renderElectionCountdown();
renderPartyOptions();
renderCandidates();

searchInput.addEventListener("input", renderCandidates);
partyFilter.addEventListener("change", renderCandidates);
