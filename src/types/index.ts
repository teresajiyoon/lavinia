/**
 * LAVINIA Core Data Models
 */

export type ContentStatus = '초안' | '검토' | '예약' | '공개' | '보관';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  kurlyUrl?: string;
  coupangUrl?: string;
  isAffiliate?: boolean;
  notes?: string;
}

export interface AlternativeIngredient {
  original: string;
  substitute: string;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  frenchTitle?: string;
  description: string;
  imageUrl: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: '쉬움' | '보통' | '도전';
  category: '파스타' | '육류' | '해산물' | '한식' | '치즈/안주' | '채소/가정식';
  ingredients: Ingredient[];
  steps: string[];
  alternativeIngredients: AlternativeIngredient[];
  allergenNotes: string[];
  recommendedWineStyleIds: string[];
  relatedCourseIds: string[];
  status: ContentStatus;
  reviewedDate: string;
  reviewer: string;
  isDraftCandidate?: boolean;
}

export interface WineStyle {
  id: string;
  nameKo: string;
  nameFr: string;
  category: '레드' | '화이트' | '로제' | '스파클링';
  body: number; // 1-5
  acidity: number; // 1-5
  tannin: number; // 1-5
  sweetness: number; // 1-5
  characteristics: string[];
  recommendedTemp: string;
  regionSummary: string;
  pairingPhilosophy: string;
}

export interface PairingItem {
  id: string;
  dishName: string;
  dishCategory: '파스타' | '육류' | '해산물' | '한식' | '치즈/안주' | '채소/가정식';
  spicyLevel: 0 | 1 | 2 | 3; // 0=안매움, 1=약간 매콤, 2=중간 매움, 3=칼칼함
  sauceType: '크림/치즈' | '토마토' | '오일/허브' | '간장/양념' | '고추장/매운양념' | '소금/원물';
  cookingMethod: '굽기' | '팬/볶기' | '끓이기/찜' | '신선/플레이트';
  situation: '둘만의 저녁' | '퇴근 후 혼밥' | '손님 초대' | '주말 브런치';
  primaryStyleId: string;
  secondaryStyleId: string;
  matchReason: string;
  alternativeChoice: string;
  sommelierTip: string;
  recipeId?: string;
  courseId?: string;
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  visualPrompt: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  orderNumber: number;
  title: string;
  frenchTitle?: string;
  subtitle: string;
  category: '기초' | '프랑스 산지' | '음식 페어링' | '실습';
  isFree: boolean;
  proposedPrice: number; // e.g. 19000 (관리자 검토용 제안가)
  durationMinutes: number;
  status: ContentStatus;
  hasActualVideo: boolean; // false means slide & script based learning
  videoStatusNote: string;
  learningObjectives: string[];
  scriptMarkdown: string;
  slideDeck: SlideItem[];
  narrationScript?: string;
  narrationVoiceoverScript?: string;
  subtitlesText: string;
  summaryText: string;
  keyTerms: { term: string; explanation: string }[];
  comprehensionQuizzes: QuizItem[];
  practicalExercise: {
    title: string;
    description: string;
    homeActionTip: string;
  };
  relatedRecipeId?: string;
  sources: string;
  reviewedDate: string;
  reviewer: string;
}

export interface KitProduct {
  id: string;
  name: string;
  subheading: string;
  description: string;
  proposedPrice: number; // 49,000원 제안가
  isPriceConfirmed: boolean;
  status: '준비 중 (출시 알림 신청)' | '판매 중';
  imageUrl: string;
  components: {
    title: string;
    spec: string;
    purpose: string;
  }[];
  includedCourseBenefits: string[];
  shippingNotice: string;
  smartStoreUrl: string;
  naverProductNumber: string;
  preorderCount: number;
}

export interface TastingNote {
  id: string;
  wineName: string;
  type: '레드' | '화이트' | '로제' | '스파클링';
  vintage?: string;
  grapeVariety?: string;
  date: string;
  acidity: number; // 1-5
  tannin: number; // 1-5
  body: number; // 1-5
  sweetness: number; // 1-5
  rating: number; // 1-5
  aromas: string[];
  pairedFood: string;
  memo: string;
}

export interface PurchaseClaim {
  id: string;
  userName: string;
  userPhoneLast4: string;
  orderNumber: string;
  storeName: string;
  claimDate: string;
  status: '대기' | '승인' | '반려';
  reviewNote?: string;
  productType: '와인데뷔 키트' | '유료 강의';
}

export interface Inquiry {
  id: string;
  userName: string;
  email: string;
  category: '키트/도구 문의' | '강의 수강 문의' | '페어링 상담' | '비즈니스/제휴';
  title: string;
  message: string;
  createdAt: string;
  status: '접수 대기' | '답변 완료';
  replyContent?: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName:
    | 'pairing_search'
    | 'recipe_view'
    | 'recipe_save'
    | 'affiliate_click'
    | 'course_preview'
    | 'lesson_start'
    | 'lesson_complete'
    | 'kit_view'
    | 'checkout_click'
    | 'verified_purchase';
  timestamp: string;
  meta: Record<string, string | number | boolean>;
}

export interface AdminSettings {
  coupangPartnersCommissionRate: number; // e.g. 3.0%
  isCoupangApproved: boolean;
  coupangDisclosureNote: string;
  kurlyDisclosureNote: string;
  naverCommerceApiStatus: '미연결 (네이버 커머스 API 심사 대기)' | '연동 준비 중' | '조회 연동 완료';
  naverStoreUrl: string;
  naverProductNumber: string;
  monthlyOperatingCosts: {
    domainHosting: number;
    database: number;
    videoCdn: number;
    marketingBudget: number;
    packagingLogistics: number;
  };
}
