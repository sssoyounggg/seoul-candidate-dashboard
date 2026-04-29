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
        date: "최근 7일",
        title: "현직 시정 평가 이슈 증가",
        description: "서울시정 성과, 정책 연속성, 장기 재임 평가가 함께 언급되었습니다.",
        chartTitle: "현직 시정 평가 언급량",
        defaultOpen: true,
        series7d: [
          { label: "1일", value: 64 },
          { label: "2일", value: 78 },
          { label: "3일", value: 95 },
          { label: "4일", value: 121 },
          { label: "5일", value: 108 },
          { label: "6일", value: 132 },
          { label: "7일", value: 147 }
        ]
      },
      {
        date: "최근 7일",
        title: "주거·교통 키워드 집중",
        description: "생활 밀착형 정책인 주거와 교통 관련 댓글 반응이 증가했습니다.",
        chartTitle: "주거·교통 언급량",
        series7d: [
          { label: "1일", value: 52 },
          { label: "2일", value: 61 },
          { label: "3일", value: 88 },
          { label: "4일", value: 103 },
          { label: "5일", value: 97 },
          { label: "6일", value: 114 },
          { label: "7일", value: 126 }
        ]
      },
      {
        date: "최근 7일",
        title: "후보 경쟁 구도 언급 확대",
        description: "다른 후보와의 비교, 본선 경쟁력, 정당 구도 관련 언급이 나타났습니다.",
        chartTitle: "후보 경쟁 구도 언급량",
        series7d: [
          { label: "1일", value: 33 },
          { label: "2일", value: 45 },
          { label: "3일", value: 59 },
          { label: "4일", value: 72 },
          { label: "5일", value: 84 },
          { label: "6일", value: 91 },
          { label: "7일", value: 107 }
        ]
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
        date: "최근 7일",
        title: "성동구 행정 경험 언급 증가",
        description: "지역 행정 성과를 서울시 전체 정책으로 확장할 수 있는지가 주요 관심사로 나타났습니다.",
        chartTitle: "성동구 행정 경험 언급량",
        defaultOpen: true,
        series7d: [
          { label: "1일", value: 44 },
          { label: "2일", value: 58 },
          { label: "3일", value: 73 },
          { label: "4일", value: 86 },
          { label: "5일", value: 92 },
          { label: "6일", value: 101 },
          { label: "7일", value: 116 }
        ]
      },
      {
        date: "최근 7일",
        title: "당내 경쟁 구도 관심",
        description: "민주당 후보군 안에서의 경쟁력과 본선 가능성이 함께 언급되었습니다.",
        chartTitle: "당내 경쟁 구도 언급량",
        series7d: [
          { label: "1일", value: 39 },
          { label: "2일", value: 47 },
          { label: "3일", value: 66 },
          { label: "4일", value: 82 },
          { label: "5일", value: 77 },
          { label: "6일", value: 93 },
          { label: "7일", value: 110 }
        ]
      },
      {
        date: "최근 7일",
        title: "청년·도시행정 키워드 부상",
        description: "생활 행정, 청년 정책, 도시 혁신 이미지가 댓글 반응에서 확인되었습니다.",
        chartTitle: "청년·도시행정 언급량",
        series7d: [
          { label: "1일", value: 28 },
          { label: "2일", value: 36 },
          { label: "3일", value: 49 },
          { label: "4일", value: 63 },
          { label: "5일", value: 71 },
          { label: "6일", value: 85 },
          { label: "7일", value: 94 }
        ]
      }
    ]
  },
  {
    id: "kwon-young-guk",
    name: "권영국",
    party: "정의당",
    age: "만 62세",
    education: "서울대 공과대학 금속공학과 졸업",
    career: "정의당 대표, 변호사, 전 민주사회를 위한 변호사모임 노동위원장",
    photo: "",
    mentionCount: 28640,
    representativeKeywords: ["노동", "불평등", "생존비용"],
    controversyIssues: ["서울시장 출마 선언", "생존비용 절감 공약", "TBS·노동권 이슈"],
    keywordPeriods: {
      "3d": [
        {
          keyword: "TBS",
          count: 3100,
          sentiment: "공공성, 임금체불, 노동권 이슈와 연결되어 언급됨"
        },
        {
          keyword: "노동권",
          count: 2800,
          sentiment: "서울시가 직간접 고용 노동 문제에 책임져야 한다는 주장이 부각됨"
        },
        {
          keyword: "생존비용",
          count: 2300,
          sentiment: "교통·주거·의료 등 필수 생활비 부담 완화 공약과 연결됨"
        }
      ],
      "7d": [
        {
          keyword: "서울시장 출마",
          count: 6500,
          sentiment: "진보정당 후보로서의 출마 의미와 선거 구도가 함께 언급됨"
        },
        {
          keyword: "생존비용",
          count: 5900,
          sentiment: "생활비 부담을 낮추겠다는 메시지가 핵심 공약으로 해석됨"
        },
        {
          keyword: "노동",
          count: 5400,
          sentiment: "노동자 권리, 산업재해, 서울시 책임론과 연결됨"
        },
        {
          keyword: "불평등",
          count: 4700,
          sentiment: "서울의 주거·소득·지역 불평등 문제를 전면에 세운 흐름"
        }
      ],
      "30d": [
        {
          keyword: "정의당 후보",
          count: 13200,
          sentiment: "정의당 대표의 서울시장 출마와 진보정당 선거 구도가 함께 주목됨"
        },
        {
          keyword: "생존비용 공약",
          count: 11800,
          sentiment: "주거·교통·의료 비용 부담 완화를 중심으로 언급됨"
        },
        {
          keyword: "노동 중심 서울",
          count: 10300,
          sentiment: "노동권 보장, 공공성 강화 메시지가 부각됨"
        },
        {
          keyword: "용산 출마선언",
          count: 9600,
          sentiment: "개발, 불평등, 용산참사 맥락을 연결한 출마 메시지가 언급됨"
        }
      ]
    },
    timelines: [
      {
        date: "2026. 4. 8",
        title: "서울시장 출마 선언",
        description: "권영국 정의당 대표가 서울시장 선거 출마를 공식 선언했습니다.",
        chartTitle: "출마 선언 언급량",
        defaultOpen: true,
        series7d: [
          { label: "1일", value: 42 },
          { label: "2일", value: 68 },
          { label: "3일", value: 119 },
          { label: "4일", value: 157 },
          { label: "5일", value: 132 },
          { label: "6일", value: 101 },
          { label: "7일", value: 87 }
        ]
      },
      {
        date: "최근 7일",
        title: "생존비용 절감 공약 부각",
        description: "주거, 교통, 의료처럼 시민이 매일 부담하는 비용을 낮추겠다는 공약이 주요 키워드로 등장했습니다.",
        chartTitle: "생존비용 공약 언급량",
        series7d: [
          { label: "1일", value: 35 },
          { label: "2일", value: 49 },
          { label: "3일", value: 73 },
          { label: "4일", value: 91 },
          { label: "5일", value: 106 },
          { label: "6일", value: 128 },
          { label: "7일", value: 144 }
        ]
      },
      {
        date: "최근 7일",
        title: "TBS·노동권 이슈 확대",
        description: "TBS 방문과 노사 간담회 이슈를 계기로 공공성, 임금체불, 노동권 관련 언급이 늘었습니다.",
        chartTitle: "TBS·노동권 언급량",
        series7d: [
          { label: "1일", value: 21 },
          { label: "2일", value: 33 },
          { label: "3일", value: 47 },
          { label: "4일", value: 76 },
          { label: "5일", value: 118 },
          { label: "6일", value: 151 },
          { label: "7일", value: 173 }
        ]
      }
    ]
  }
];
