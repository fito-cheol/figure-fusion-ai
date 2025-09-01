
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ko';
type TranslationKey = keyof typeof translations.en.ui;
type DescriptionKey = keyof typeof translations.en.descriptions;

const translations = {
  en: {
    ui: {
      // Header
      headerTitle: "Figure Fusion AI",
      headerSubtitle: "Upload a photo and our AI will magically transform it into a stunning, collectible-style figure.",
      // ImageUploader
      uploaderTitle: "Drag & drop an image or click to upload",
      uploaderSubtitle: "PNG, JPG, or WEBP. High resolution recommended.",
      // ResultDisplay
      originalImageTitle: "Original Image",
      generatedImageTitle: "Figure & Package Shot",
      placeholderText: "AI generation will appear here",
      // Buttons
      transformButton: "Transform to Figure",
      regenerateButton: "Re-generate",
      startOverButton: "Start Over",
      // Loader messages
      loaderMsg1: "Warming up the AI's creative circuits...",
      loaderMsg2: "Applying digital paint and polish...",
      loaderMsg3: "Crafting your miniature masterpiece...",
      loaderMsg4: "Shrinking pixels to figure size...",
      loaderMsg5: "This can take a moment, great art needs time.",
      // Errors
      errorTitle: "Error",
      errorUpload: "Please upload an image first.",
      errorGenerate: "The AI could not generate an image. Please try a different image or adjust the options.",
      errorTransform: "An error occurred while transforming the image. Please try again.",
      // TransformOptions
      customizeTitle: "Customize Your Figure",
      coreConceptSection: "Core Concept",
      physicalPropertiesSection: "Physical Properties",
      stagingPoseSection: "Staging & Pose",
      aestheticsSection: "Aesthetics",
      artStyleLabel: "Art Style",
      scaleLabel: "Scale",
      materialLabel: "Material",
      textureLabel: "Surface Texture",
      poseLabel: "Pose",
      baseLabel: "Base",
      backgroundLabel: "Background Scene",
      colorSchemeLabel: "Color Scheme",
      detailingLabel: "Detailing Level",
      // Option values
      '1/12': '1/12 Scale', '1/8': '1/8 Scale', '1/7': '1/7 Scale', '1/6': '1/6 Scale', '1/4': '1/4 Scale',
      'Anime': 'Anime', 'Realistic': 'Realistic', 'Chibi/SD': 'Chibi/SD', 'Stylized': 'Stylized',
      'Matte': 'Matte', 'Glossy': 'Glossy', 'Metallic': 'Metallic', 'Weathered': 'Weathered',
      'None': 'None', 'Simple Disc': 'Simple Disc', 'Themed Diorama': 'Themed Diorama', 'Floating': 'Floating',
      'PVC/ABS': 'PVC/ABS', 'Resin': 'Resin', 'Polystone': 'Polystone', 'Metal': 'Metal',
      'Standing': 'Standing', 'Dynamic/Action': 'Dynamic/Action', 'Sitting': 'Sitting',
      'Original Colors': 'Original Colors', 'Monochrome': 'Monochrome', 'Vibrant': 'Vibrant',
      'Standard': 'Standard', 'High': 'High', 'Ultra': 'Ultra',
      'Studio': 'Studio', 'Bookshelf': 'Bookshelf', 'Desktop': 'Desktop', 'Showcase': 'Showcase',
    },
    descriptions: {
      '1/12': 'Mini scale (approx. 10-15cm), perfect for desktops.',
      '1/8': 'Small scale (approx. 15-20cm), a popular space-saving choice.',
      '1/7': 'Standard anime figure scale (approx. 20-25cm), very common.',
      '1/6': 'Medium scale (approx. 25-30cm), popular for high-end collectibles and action figures.',
      '1/4': 'Large scale (approx. 40-50cm), for highly detailed and impressive statement pieces.',
      'Anime': 'Classic Japanese anime/manga style with large eyes and expressive features.',
      'Realistic': 'Hyper-realistic style with detailed skin textures and accurate anatomy.',
      'Chibi/SD': 'Super-deformed style with a large head and small body for a cute appearance.',
      'Stylized': 'A unique, non-realistic style, like a Western cartoon or fantasy art.',
      'Matte': 'A smooth, non-reflective surface that diffuses light.',
      'Glossy': 'A high-shine, reflective finish for a polished look.',
      'Metallic': 'Simulates the look of real metal, great for armor and weapons.',
      'Weathered': 'Adds an aged or battle-worn look with scratches, dust, or rust.',
      'None': 'The figure stands on its own without a display base.',
      'Simple Disc': 'A clean, elegant circular or square base.',
      'Themed Diorama': 'A scenic base that tells a story, like a battlefield or forest.',
      'Floating': 'A discreet stand that gives a flying or weightless appearance.',
      'PVC/ABS': 'Standard, versatile plastic used for most commercial figures.',
      'Resin': 'High-quality material for capturing fine details, heavier and more brittle.',
      'Polystone': 'A stone-like compound that is heavy and durable.',
      'Metal': 'Uses die-cast metal parts for a premium weight and feel.',
      'Standing': 'A stable, neutral museum-style standing pose.',
      'Dynamic/Action': 'An energetic pose captured mid-movement, like jumping or attacking.',
      'Sitting': 'A relaxed sitting or kneeling pose.',
      'Original Colors': 'Uses the color palette from the uploaded image.',
      'Monochrome': 'Renders the figure in a single color scheme, like grayscale.',
      'Vibrant': 'Enhances the original colors to be more saturated and eye-catching.',
      'Standard': 'A balanced level of detail suitable for the scale.',
      'High': 'Adds fine details like clothing textures and intricate expressions.',
      'Ultra': 'Captures microscopic details for the highest level of realism.',
      'Studio': 'A clean, neutral background for a professional product shot.',
      'Bookshelf': 'Places the figure on a bookshelf among books for a cozy feel.',
      'Desktop': 'A modern desk environment with items like a keyboard or monitor.',
      'Showcase': 'Inside a glass display case with dramatic lighting.',
    }
  },
  ko: {
    ui: {
      headerTitle: "피규어 퓨전 AI",
      headerSubtitle: "사진을 업로드하면 AI가 마법처럼 멋진 수집가 스타일의 피규어로 변환해 드립니다.",
      uploaderTitle: "이미지를 드래그 앤 드롭하거나 클릭하여 업로드하세요",
      uploaderSubtitle: "PNG, JPG, 또는 WEBP. 고해상도를 권장합니다.",
      originalImageTitle: "원본 이미지",
      generatedImageTitle: "피규어 & 패키지 샷",
      placeholderText: "AI 생성 결과가 여기에 표시됩니다",
      transformButton: "피규어로 변환하기",
      regenerateButton: "다시 생성하기",
      startOverButton: "처음부터 시작",
      loaderMsg1: "AI의 창의 회로를 예열 중입니다...",
      loaderMsg2: "디지털 페인트와 광택을 적용 중입니다...",
      loaderMsg3: "당신의 미니어처 걸작을 제작 중입니다...",
      loaderMsg4: "픽셀을 피규어 크기로 줄이는 중입니다...",
      loaderMsg5: "훌륭한 예술에는 시간이 필요합니다. 잠시만 기다려주세요.",
      errorTitle: "오류",
      errorUpload: "먼저 이미지를 업로드해주세요.",
      errorGenerate: "AI가 이미지를 생성하지 못했습니다. 다른 이미지를 사용하거나 옵션을 조정해보세요.",
      errorTransform: "이미지를 변환하는 중 오류가 발생했습니다. 다시 시도해주세요.",
      customizeTitle: "피규어 커스터마이징",
      coreConceptSection: "핵심 컨셉",
      physicalPropertiesSection: "물리적 속성",
      stagingPoseSection: "연출 및 포즈",
      aestheticsSection: "미적 요소",
      artStyleLabel: "아트 스타일",
      scaleLabel: "스케일",
      materialLabel: "재질",
      textureLabel: "표면 질감",
      poseLabel: "포즈",
      baseLabel: "베이스",
      backgroundLabel: "배경",
      colorSchemeLabel: "색상 구성",
      detailingLabel: "디테일 수준",
      '1/12': '1/12 스케일', '1/8': '1/8 스케일', '1/7': '1/7 스케일', '1/6': '1/6 스케일', '1/4': '1/4 스케일',
      'Anime': '애니메이션', 'Realistic': '사실적', 'Chibi/SD': '치비/SD', 'Stylized': '스타일화',
      'Matte': '무광', 'Glossy': '유광', 'Metallic': '메탈릭', 'Weathered': '웨더링',
      'None': '없음', 'Simple Disc': '단순 디스크', 'Themed Diorama': '테마 디오라마', 'Floating': '플로팅',
      'PVC/ABS': 'PVC/ABS', 'Resin': '레진', 'Polystone': '폴리스톤', 'Metal': '메탈',
      'Standing': '서있는 자세', 'Dynamic/Action': '역동적/액션', 'Sitting': '앉은 자세',
      'Original Colors': '원본 색상', 'Monochrome': '단색', 'Vibrant': '선명한 색상',
      'Standard': '표준', 'High': '높음', 'Ultra': '최상',
      'Studio': '스튜디오', 'Bookshelf': '책장', 'Desktop': '책상', 'Showcase': '장식장',
    },
    descriptions: {
      '1/12': '미니 스케일(약 10-15cm), 데스크탑에 적합합니다.',
      '1/8': '소형 스케일(약 15-20cm), 공간 절약에 좋은 인기있는 선택입니다.',
      '1/7': '표준 애니메이션 피규어 스케일(약 20-25cm), 매우 일반적입니다.',
      '1/6': '중형 스케일(약 25-30cm), 고급 수집품 및 액션 피규어에 인기가 많습니다.',
      '1/4': '대형 스케일(약 40-50cm), 매우 상세하고 인상적인 작품을 위한 선택입니다.',
      'Anime': '큰 눈과 표현력이 풍부한 특징을 가진 클래식한 일본 애니메이션/망가 스타일입니다.',
      'Realistic': '상세한 피부 질감과 정확한 해부학을 갖춘 초사실적인 스타일입니다.',
      'Chibi/SD': '큰 머리와 작은 몸을 가진 슈퍼 데포르메 스타일로 귀여운 외모를 연출합니다.',
      'Stylized': '서양 카툰이나 판타지 아트와 같은 독특하고 비현실적인 스타일입니다.',
      'Matte': '빛을 분산시키는 부드럽고 무반사 표면입니다.',
      'Glossy': '세련된 느낌을 주는 고광택의 반사 마감입니다.',
      'Metallic': '실제 금속의 모습을 시뮬레이션하여 갑옷이나 무기에 적합합니다.',
      'Weathered': '긁힘, 먼지, 녹 등 낡거나 전투를 겪은 듯한 느낌을 추가합니다.',
      'None': '피규어가 디스플레이 베이스 없이 스스로 서 있습니다.',
      'Simple Disc': '깔끔하고 우아한 원형 또는 사각형 베이스입니다.',
      'Themed Diorama': '전장이나 숲처럼 스토리를 전달하는 장면이 있는 베이스입니다.',
      'Floating': '피규어가 날고 있거나 무중력 상태인 것처럼 보이게 하는 별도의 스탠드입니다.',
      'PVC/ABS': '대부분의 상업용 피규어에 사용되는 표준적이고 다용도의 플라스틱입니다.',
      'Resin': '미세한 디테일을 표현하기 위한 고품질 소재로, 더 무겁고 깨지기 쉽습니다.',
      'Polystone': '무겁고 내구성이 있는 돌과 같은 질감의 합성물입니다.',
      'Metal': '프리미엄 무게감과 느낌을 위해 다이캐스트 금속 부품을 사용합니다.',
      'Standing': '안정적이고 중립적인 박물관 스타일의 서있는 자세입니다.',
      'Dynamic/Action': '점프하거나 공격하는 등 움직이는 중간을 포착한 역동적인 포즈입니다.',
      'Sitting': '편안하게 앉거나 무릎을 꿇은 자세입니다.',
      'Original Colors': '업로드된 이미지의 색상 팔레트를 사용합니다.',
      'Monochrome': '피규어를 그레이스케일과 같은 단일 색상 구성으로 렌더링합니다.',
      'Vibrant': '원본 색상을 더욱 채도 높고 눈에 띄게 향상시킵니다.',
      'Standard': '스케일에 적합한 균형 잡힌 수준의 디테일입니다.',
      'High': '의상 질감이나 복잡한 표정과 같은 미세한 디테일을 추가합니다.',
      'Ultra': '최고 수준의 사실감을 위해 미세한 디테일까지 포착합니다.',
      'Studio': '전문적인 제품 사진을 위한 깔끔하고 중립적인 배경입니다.',
      'Bookshelf': '아늑한 느낌을 주기 위해 피규어를 책장 위 책들 사이에 배치합니다.',
      'Desktop': '키보드나 모니터 같은 소품이 있는 현대적인 책상 환경입니다.',
      'Showcase': '드라마틱한 조명이 있는 유리 장식장 내부입니다.',
    }
  }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
    td: (key: DescriptionKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('ko'); // Default to Korean

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: TranslationKey): string => {
        return translations[language].ui[key] || translations.en.ui[key];
    };
    
    const td = (key: DescriptionKey): string => {
        return translations[language].descriptions[key] || translations.en.descriptions[key] || '';
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, td }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
