const params = new URLSearchParams(window.location.search);
const candidateId = params.get("id");

const candidate = candidates.find((item) => item.id === candidateId) || candidates[0];

const candidateName = document.querySelector("#candidateName");
const candidateSubtitle = document.querySelector("#candidateSubtitle");
const profileCard = document.querySelector("#profileCard");
const summaryContent = document.querySelector("#summaryContent");
const keywordList = document.querySelector("#keywordList");
const keywordChart = document.querySelector("#keywordChart");
const timelineList = document.querySelector("#timelineList");
const periodButtons = document.querySelectorAll(".period-button");

let activePeriod = "7d";

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

function renderHeader() {
  document.title = `${candidate.name} 상세 페이지`;
  candidateName.textContent = candidate.name;
  candidateSubtitle.textContent = `${candidate.party} · 언급량 ${formatNumber(candidate.mentionCount)}건`;
}

function renderProfile() {
  profileCard.innerHTML = `
    ${createPortrait(candidate)}

    <div class="profile-info">
      <h2>${candidate.name}</h2>
      <p class="party">${candidate.party}</p>

      <dl>
        <dt>나이</dt>
        <dd>${candidate.age}</dd>

        <dt>학력</dt>
        <dd>${candidate.education}</dd>

        <dt>경력</dt>
        <dd>${candidate.career}</dd>

        <dt>전체 언급량</dt>
        <dd>${formatNumber(candidate.mentionCount)}건</dd>
      </dl>
    </div>
  `;
}

function renderSummary() {
  const keywordHTML = candidate.representativeKeywords
    .map((keyword) => `<span class="keyword-chip">${keyword}</span>`)
    .join("");

  const issueHTML = candidate.controversyIssues
    .map((issue) => `
      <div class="summary-item">
        <h3>${issue}</h3>
        <p>이 쟁점은 후보의 이미지, 정책 평가, 유권자 반응을 해석할 때 함께 봐야 하는 항목입니다.</p>
      </div>
    `)
    .join("");

  summaryContent.innerHTML = `
    <h3>대표 키워드</h3>
    <div class="keyword-chip-wrap">
      ${keywordHTML}
    </div>

    <h3>주요 쟁점</h3>
    <div class="summary-list">
      ${issueHTML}
    </div>
  `;
}

function getActiveKeywords() {
  return candidate.keywordPeriods[activePeriod] || [];
}

function renderKeywords() {
  const keywords = getActiveKeywords();

  keywordList.innerHTML = keywords
    .map((item) => `
      <article class="keyword-card">
        <div class="keyword-card-top">
          <strong>${item.keyword}</strong>
          <span class="keyword-count">${formatNumber(item.count)}건</span>
        </div>
        <p>${item.sentiment}</p>
      </article>
    `)
    .join("");
}

function renderChart() {
  const keywords = getActiveKeywords();

  if (keywords.length === 0) {
    keywordChart.innerHTML = `<p>표시할 키워드 데이터가 없습니다.</p>`;
    return;
  }

  const maxCount = Math.max(...keywords.map((item) => item.count));

  keywordChart.innerHTML = keywords
    .map((item) => {
      const width = Math.round((item.count / maxCount) * 100);

      return `
        <div class="chart-row">
          <div class="chart-label">${item.keyword}</div>
          <div class="chart-track">
            <div class="chart-bar" style="width: ${width}%"></div>
          </div>
          <div class="chart-value">${formatNumber(item.count)}</div>
        </div>
      `;
    })
    .join("");
}

function renderTimeline() {
  timelineList.innerHTML = candidate.timelines
    .map((item) => `
      <article class="timeline-item">
        <div class="timeline-date">${item.date}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `)
    .join("");
}

function setActiveButton() {
  periodButtons.forEach((button) => {
    if (button.dataset.period === activePeriod) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

periodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activePeriod = button.dataset.period;
    setActiveButton();
    renderKeywords();
    renderChart();
  });
});

renderHeader();
renderProfile();
renderSummary();
renderKeywords();
renderChart();
renderTimeline();
setActiveButton();