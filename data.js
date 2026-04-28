const candidates = [
  {
    id: "oh-se-hoon",
    name: "오세훈",
    party: "국민의힘",
    age: "만 65세",
    education: "고려대 법학 학사·석사·박사",
    career: "서울특별시장, 제16대 국회의원, 변호사",
    photo: "images/oh.jpg",
    mentionCount: 48760,
    representativeKeywords: ["현직 평가", "주거", "교통"],
    controversyIssues: ["현직 시정 평가", "주거 정책 체감도", "언론관/캠프 공방"],
    keywordPeriods: {
      "3d": [
        {
          keyword: "현직 평가",
          count: 4200,
          sentiment: "서울시정 성과와 피로감이 함께 언급됨"
        },
        {
          keyword: "교통",
          count: 3100,
          sentiment: "대중교통, 출퇴근, 도심 이동 관련 반응이 많음"
        },
        {
          keyword: "주거",
          count: 2800,
          sentiment: "재개발, 전세, 주택 공급 이슈와 연결됨"
        }
      ],
      "7d": [
        {
          keyword: "현직 평가",
          count: 8900,
          sentiment: "현 시장으로서의 성과와 책임론이 동시에 나타남"
        },
        {
          keyword: "주거",
          count: 7600,
          sentiment: "부동산 정책 체감도에 대한 의견이 갈림"
        },
        {
          keyword: "교통",
          count: 6900,
          sentiment: "교통 정책의 실효성과 생활 불편 해소 여부가 쟁점"
        },
        {
          keyword: "공약",
          count: 5200,
          sentiment: "기존 정책의 연속성과 새 공약의 차별성에 관심"
        }
      ],
      "30d": [
        {
          keyword: "현직 프리미엄",
          count: 19800,
          sentiment: "인지도와 행정 경험은 강점으로 언급됨"
        },
        {
          keyword: "주거 정책",
          count: 17400,
          sentiment: "주택 공급과 재개발 관련 기대와 비판이 공존"
        },
        {
          keyword: "교통 정책",
          count: 15100,
          sentiment: "생활형 공약으로 주목도가 높음"
        },
        {
          keyword: "시정 평가",
          count: 14300,
          sentiment: "장기 재임에 대한 평가가 선거 판단 요소로 작동"
        }
      ]
    },
    timelines: [
      {
        date: "최근 30일",
        title: "현직 평가 이슈 증가",
        description: "서울시정 성과, 정책 연속성, 장기 재임 평가가 함께 언급되었습니다."
      },
      {
        date: "최근 7일",
        title: "주거·교통 키워드 집중",
        description: "생활 밀착형 정책인 주거와 교통 관련 댓글 반응이 증가했습니다."
      },
      {
        date: "최근 3일",
        title: "후보 경쟁 구도 언급 확대",
        description: "다른 후보와의 비교, 본선 경쟁력, 정당 구도 관련 언급이 나타났습니다."
      }
    ]
  },
  {
    id: "jung-won-oh",
    name: "정원오",
    party: "더불어민주당",
    age: "만 57세",
    education: "한양대 대학원 행정학 박사",
    career: "성동구청장",
    photo: "images/jung.jpg",
    mentionCount: 35420,
    representativeKeywords: ["성동구", "도시행정", "청년"],
    controversyIssues: ["인지도 확장", "서울시정 경험", "당내 경쟁 구도"],
    keywordPeriods: {
      "3d": [
        {
          keyword: "성동구",
          count: 3600,
          sentiment: "지역 행정 경험이 강점으로 언급됨"
        },
        {
          keyword: "청년",
          count: 2500,
          sentiment: "청년 정책과 생활 행정 이미지가 연결됨"
        },
        {
          keyword: "인지도",
          count: 2100,
          sentiment: "서울 전체 후보로서 인지도 확장이 과제로 언급됨"
        }
      ],
      "7d": [
        {
          keyword: "성동구 행정",
          count: 7400,
          sentiment: "구청장 경험과 정책 실행력이 긍정적으로 언급됨"
        },
        {
          keyword: "도시행정",
          count: 6100,
          sentiment: "생활 행정, 지역 개발, 도시 브랜드 관련 반응이 많음"
        },
        {
          keyword: "청년 정책",
          count: 5200,
          sentiment: "청년층을 겨냥한 정책 이미지가 형성됨"
        },
        {
          keyword: "당내 경선",
          count: 4700,
          sentiment: "당내 후보 경쟁과 본선 경쟁력 평가가 함께 나타남"
        }
      ],
      "30d": [
        {
          keyword: "성동구 모델",
          count: 16100,
          sentiment: "성동구 행정 사례를 서울 전체로 확장할 수 있는지가 쟁점"
        },
        {
          keyword: "도시 혁신",
          count: 13800,
          sentiment: "지역 기반 행정 성과에 대한 기대가 언급됨"
        },
        {
          keyword: "인지도",
          count: 12200,
          sentiment: "서울 전역에서의 인지도 확보가 핵심 과제로 보임"
        },
        {
          keyword: "민주당 후보",
          count: 11700,
          sentiment: "정당 지지층 내 경쟁 구도와 후보 적합성 평가가 등장"
        }
      ]
    },
    timelines: [
      {
        date: "최근 30일",
        title: "성동구 행정 경험 언급 증가",
        description: "지역 행정 성과를 서울시 전체 정책으로 확장할 수 있는지가 주요 관심사로 나타났습니다."
      },
      {
        date: "최근 7일",
        title: "당내 경쟁 구도 관심",
        description: "민주당 후보군 안에서의 경쟁력과 본선 가능성이 함께 언급되었습니다."
      },
      {
        date: "최근 3일",
        title: "청년·도시행정 키워드 부상",
        description: "생활 행정, 청년 정책, 도시 혁신 이미지가 댓글 반응에서 확인되었습니다."
      }
    ]
  },
  {
    id: "kim-jae-sub",
    name: "김재섭",
    party: "국민의힘",
    age: "만 38세",
    education: "서울대 법학전문대학원",
    career: "국회의원",
    photo: "images/kim.jpg",
    mentionCount: 21680,
    representativeKeywords: ["청년 보수", "세대교체", "정책 경쟁"],
    controversyIssues: ["경험 부족 논쟁", "세대교체 기대", "본선 경쟁력"],
    keywordPeriods: {
      "3d": [
        {
          keyword: "세대교체",
          count: 2400,
          sentiment: "젊은 후보 이미지에 대한 기대가 나타남"
        },
        {
          keyword: "청년",
          count: 1900,
          sentiment: "청년층 대표성에 대한 관심이 있음"
        },
        {
          keyword: "경험",
          count: 1700,
          sentiment: "행정 경험 부족에 대한 우려도 함께 언급됨"
        }
      ],
      "7d": [
        {
          keyword: "세대교체",
          count: 5300,
          sentiment: "정치 신선함과 변화 요구가 연결됨"
        },
        {
          keyword: "청년 보수",
          count: 4600,
          sentiment: "보수 정당 내 젊은 정치인 이미지가 부각됨"
        },
        {
          keyword: "정책 경쟁",
          count: 3900,
          sentiment: "인지도보다 정책 구체성이 중요하다는 반응이 있음"
        },
        {
          keyword: "경험 논쟁",
          count: 3400,
          sentiment: "시장직 수행 경험에 대한 의문이 제기됨"
        }
      ],
      "30d": [
        {
          keyword: "세대교체론",
          count: 11800,
          sentiment: "기성 정치와 다른 이미지를 기대하는 반응이 있음"
        },
        {
          keyword: "청년 정치",
          count: 9900,
          sentiment: "세대 대표성과 실무 역량을 함께 평가하는 흐름"
        },
        {
          keyword: "본선 경쟁력",
          count: 8600,
          sentiment: "인지도, 조직력, 정책 완성도가 주요 판단 기준"
        },
        {
          keyword: "정책 역량",
          count: 7900,
          sentiment: "구체적인 서울시 정책 제시가 필요하다는 반응"
        }
      ]
    },
    timelines: [
      {
        date: "최근 30일",
        title: "세대교체론 언급 확대",
        description: "젊은 후보 이미지와 변화 요구가 핵심 키워드로 등장했습니다."
      },
      {
        date: "최근 7일",
        title: "경험 부족 논쟁",
        description: "새로운 이미지에 대한 기대와 행정 경험에 대한 우려가 동시에 나타났습니다."
      },
      {
        date: "최근 3일",
        title: "정책 구체성 요구",
        description: "후보 이미지보다 구체적인 서울시 정책이 필요하다는 반응이 보였습니다."
      }
    ]
  }
];