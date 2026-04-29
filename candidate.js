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
const timelineChart = document.querySelector("#timelineChart");
const periodButtons = document.querySelectorAll(".period-button");

let activePeriod = "7d";
let activeTimelineIndex = getDefaultTimelineIndex();

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

function getDefaultTimelineIndex() {
  if (!candidate.timelines || candidate.timelines.length === 0) {
    return 0;
  }

  const explicitDefaultIndex = candidate.timelines.findIndex((item) => {
    return item.defaultOpen === true;
  });

  if (explicitDefaultIndex >= 0) {
    return explicitDefaultIndex;
  }

  const sevenDayIndex = candidate.timelines.findIndex((item) => {
    return String(item.date).includes("최근 7일") || item.period === "7d";
  });

  if (sevenDayIndex >= 0) {
    return sevenDayIndex;
  }

  return 0;
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
  if (!timelineList) {
    return;
  }

  const timelines = candidate.timelines || [];

  timelineList.innerHTML = timelines
    .map((item, index) => {
      const isActive = activeTimelineIndex === index;

      return `
        <button
          class="timeline-select-card ${isActive ? "active" : ""}"
          type="button"
          data-index="${index}"
          aria-pressed="${isActive}"
        >
          <span class="timeline-date">${item.date}</span>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".timeline-select-card").forEach((button) => {
    button.addEventListener("click", () => {
      activeTimelineIndex = Number(button.dataset.index);
      renderTimeline();
      renderTimelineChart();
    });
  });
}

function getTimelineSeries(timeline) {
  const rawSeries = timeline.series7d || timeline.weeklySeries || timeline.series || [];

  return rawSeries.map((item, index) => {
    return {
      label: item.label || item.date || `${index + 1}일`,
      value: Number(item.value ?? item.count ?? 0)
    };
  });
}

function renderTimelineChart() {
  if (!timelineChart) {
    return;
  }

  const timelines = candidate.timelines || [];
  const timeline = timelines[activeTimelineIndex];

  if (!timeline) {
    timelineChart.innerHTML = `
      <div class="timeline-chart-card">
        <p class="timeline-chart-empty">표시할 타임라인 데이터가 없습니다.</p>
      </div>
    `;
    return;
  }

  const series = getTimelineSeries(timeline);

  if (series.length === 0) {
    timelineChart.innerHTML = `
      <div class="timeline-chart-card">
        <h3>${timeline.chartTitle || `${timeline.title} 언급량`}</h3>
        <p class="timeline-chart-empty">이 이슈에는 최근 7일 시계열 데이터가 없습니다.</p>
      </div>
    `;
    return;
  }

  const maxValue = Math.max(...series.map((item) => item.value), 1);

  const barsHTML = series
    .map((item) => {
      const height = item.value === 0 ? 0 : Math.max(8, Math.round((item.value / maxValue) * 100));

      return `
        <div class="timeline-bar-item">
          <span class="timeline-bar-value">${formatNumber(item.value)}</span>

          <div class="timeline-bar-frame">
            <div class="timeline-bar" style="height: ${height}%"></div>
          </div>

          <span class="timeline-bar-label">${item.label}</span>
        </div>
      `;
    })
    .join("");

  const peak = series.reduce((maxItem, item) => {
    return item.value > maxItem.value ? item : maxItem;
  }, series[0]);

  timelineChart.innerHTML = `
    <article class="timeline-chart-card">
      <div class="timeline-chart-title-row">
        <div>
          <span class="timeline-chart-kicker">최근 7일 시계열</span>
          <h3>${timeline.chartTitle || `${timeline.title} 언급량`}</h3>
        </div>

        <div class="timeline-peak-box">
          <span>최고점</span>
          <strong>${formatNumber(peak.value)}</strong>
          <small>${peak.label}</small>
        </div>
      </div>

      <div class="timeline-bar-chart" aria-label="${timeline.title} 최근 7일 언급량">
        ${barsHTML}
      </div>
    </article>
  `;
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
renderTimelineChart();
setActiveButton();
