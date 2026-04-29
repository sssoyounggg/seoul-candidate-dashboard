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
let activeTimelineIndex = 0;

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
    .map((item, index) => {
      const isActive = activeTimelineIndex === index;

      return `
        <button class="timeline-select-card ${isActive ? "active" : ""}" type="button" data-index="${index}">
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

function getPointPosition(item, index, series, padding, chartWidth, chartHeight, minValue, maxValue) {
  const x =
    series.length === 1
      ? padding.left + chartWidth / 2
      : padding.left + (index / (series.length - 1)) * chartWidth;

  const allValuesSame = maxValue === minValue;

  const y = allValuesSame
    ? padding.top + chartHeight / 2
    : padding.top + chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;

  return {
    ...item,
    x,
    y
  };
}

function renderTimelineChart() {
  if (!timelineChart) {
    return;
  }

  const timeline = candidate.timelines[activeTimelineIndex];

  if (!timeline) {
    timelineChart.innerHTML = `<p class="timeline-chart-empty">표시할 타임라인이 없습니다.</p>`;
    return;
  }

  const series = Array.isArray(timeline.series) ? timeline.series : [];

  if (series.length === 0) {
    timelineChart.innerHTML = `
      <div class="timeline-chart-panel">
        <div class="timeline-chart-head">
          <div>
            <strong>${timeline.title}</strong>
            <p>${timeline.description}</p>
          </div>
        </div>
        <p class="timeline-chart-empty">이 타임라인 항목에는 아직 시계열 데이터가 없습니다.</p>
      </div>
    `;
    return;
  }

  const width = 760;
  const height = 300;
  const padding = {
    top: 32,
    right: 34,
    bottom: 58,
    left: 64
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = series.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const points = series.map((item, index) => {
    return getPointPosition(
      item,
      index,
      series,
      padding,
      chartWidth,
      chartHeight,
      minValue,
      maxValue
    );
  });

  const linePath = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ");

  const bottomY = padding.top + chartHeight;

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x.toFixed(1)} ${bottomY}
    L ${points[0].x.toFixed(1)} ${bottomY}
    Z
  `;

  const middleValue = Math.round((maxValue + minValue) / 2);
  const gridValues = [maxValue, middleValue, minValue];

  const gridLines = gridValues
    .map((value) => {
      const allValuesSame = maxValue === minValue;

      const y = allValuesSame
        ? padding.top + chartHeight / 2
        : padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

      return `
        <g>
          <line class="timeline-svg-grid" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>
          <text class="timeline-svg-y-label" x="${padding.left - 12}" y="${y + 4}" text-anchor="end">${formatNumber(value)}</text>
        </g>
      `;
    })
    .join("");

  const pointCircles = points
    .map((point) => `
      <g>
        <circle class="timeline-svg-point" cx="${point.x}" cy="${point.y}" r="5"></circle>
        <text class="timeline-svg-point-label" x="${point.x}" y="${point.y - 12}" text-anchor="middle">${formatNumber(point.value)}</text>
        <title>${point.date}: ${formatNumber(point.value)}건</title>
      </g>
    `)
    .join("");

  const xLabels = points
    .map((point, index) => {
      const shouldShow = points.length <= 7 || index === 0 || index === points.length - 1;

      if (!shouldShow) {
        return "";
      }

      return `
        <text class="timeline-svg-x-label" x="${point.x}" y="${height - 22}" text-anchor="middle">${point.date}</text>
      `;
    })
    .join("");

  const peak = series.reduce((maxItem, item) => {
    return item.value > maxItem.value ? item : maxItem;
  }, series[0]);

  timelineChart.innerHTML = `
    <div class="timeline-chart-panel">
      <div class="timeline-chart-head">
        <div>
          <strong>${timeline.title} 시계열 그래프</strong>
          <p>${timeline.description}</p>
        </div>

        <div class="timeline-peak-box">
          <span>최고 언급량</span>
          <strong>${formatNumber(peak.value)}건</strong>
          <small>${peak.date}</small>
        </div>
      </div>

      <svg class="timeline-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${timeline.title} 시계열 그래프">
        ${gridLines}

        <line class="timeline-svg-axis" x1="${padding.left}" y1="${bottomY}" x2="${width - padding.right}" y2="${bottomY}"></line>
        <line class="timeline-svg-axis" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${bottomY}"></line>

        <path class="timeline-svg-area" d="${areaPath}"></path>
        <path class="timeline-svg-line" d="${linePath}"></path>

        ${pointCircles}
        ${xLabels}
      </svg>

      <p class="timeline-chart-caption">
        이 그래프는 선택한 타임라인 이슈의 시간 흐름별 언급량을 보여줍니다.
      </p>
    </div>
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
