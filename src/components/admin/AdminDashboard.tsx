import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Course,
  Recipe,
  PairingItem,
  ContentStatus,
  Ingredient,
} from '../../types';
import {
  ShieldCheck,
  BookOpen,
  Utensils,
  Sparkles,
  Package,
  ShoppingBag,
  FileCheck2,
  Mail,
  BarChart3,
  Sliders,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  DollarSign,
  Download,
  Upload,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    pairings,
    addPairing,
    updatePairing,
    deletePairing,
    wineStyles,
    kitProduct,
    updateKitProduct,
    adminSettings,
    updateAdminSettings,
    purchaseClaims,
    updatePurchaseClaimStatus,
    inquiries,
    answerInquiry,
    analyticsEvents,
    setIsAdminMode,
    setActiveTab,
    showToast,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<
    'courses' | 'recipes' | 'pairings' | 'kit_store' | 'claims' | 'affiliate' | 'inquiries' | 'stats'
  >('courses');

  // Course editing modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isNewCourse, setIsNewCourse] = useState(false);

  // Recipe editing modal state
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isNewRecipe, setIsNewRecipe] = useState(false);

  // Inquiry reply modal state
  const [replyingInquiryId, setReplyingInquiryId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Course Form handlers
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    if (isNewCourse) {
      addCourse(editingCourse);
    } else {
      updateCourse(editingCourse);
    }
    setEditingCourse(null);
  };

  // Recipe Form handlers
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe) return;
    if (isNewRecipe) {
      addRecipe(editingRecipe);
    } else {
      updateRecipe(editingRecipe);
    }
    setEditingRecipe(null);
  };

  // Export & Import backup
  const handleExportBackup = () => {
    const backupData = {
      courses,
      recipes,
      pairings,
      kitProduct,
      adminSettings,
      purchaseClaims,
      inquiries,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lavinia_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('전체 운영 데이터 백업 파일이 다운로드되었습니다.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#4A151D] text-white rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-6 h-6 text-[#E5B5B9]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-display">
              라비니아 독립 관리자 콘솔 (Admin Console)
            </h1>
            <p className="text-xs text-[#E5B5B9]">
              코드 수정 없이 강의, 레시피, 페어링, 스마트스토어 주문 인증, 제휴 설정을 안전하게 관리합니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-colors cursor-pointer"
            title="JSON 파일로 전체 데이터 백업"
          >
            <Download className="w-3.5 h-3.5" />
            <span>백업 다운로드</span>
          </button>
          <button
            onClick={() => {
              setIsAdminMode(false);
              setActiveTab('home');
            }}
            className="px-3.5 py-1.5 bg-white text-[#4A151D] text-xs font-bold rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            관리자 모드 나가기
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#DECFC0] pb-2 text-xs overflow-x-auto">
        <button
          onClick={() => setCurrentTab('courses')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'courses'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>와인 강의 관리 ({courses.length})</span>
        </button>

        <button
          onClick={() => setCurrentTab('recipes')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'recipes'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>레시피 관리 ({recipes.length})</span>
        </button>

        <button
          onClick={() => setCurrentTab('pairings')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'pairings'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>페어링 매핑 ({pairings.length})</span>
        </button>

        <button
          onClick={() => setCurrentTab('kit_store')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'kit_store'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>키트 & 스마트스토어 설정</span>
        </button>

        <button
          onClick={() => setCurrentTab('claims')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'claims'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>
            구매 인증 검토 (
            {purchaseClaims.filter((c) => c.status === '대기').length}건 대기)
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('affiliate')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'affiliate'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>제휴 쇼핑 & 수수료</span>
        </button>

        <button
          onClick={() => setCurrentTab('inquiries')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'inquiries'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>고객 문의 ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setCurrentTab('stats')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
            currentTab === 'stats'
              ? 'bg-[#722F37] text-white font-semibold'
              : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#FAF7F2]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>운영 통계 & 예산 분석</span>
        </button>
      </div>

      {/* 1. COURSES TAB */}
      {currentTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#38271E]">와인 클래스 커리큘럼 관리</h2>
              <p className="text-xs text-[#8C7A6B]">
                모니가 제작한 대본, 슬라이드, 요약, 퀴즈를 검토하고 상태(초안/검토/예약/공개/보관)를 전환합니다.
              </p>
            </div>
            <button
              onClick={() => {
                setIsNewCourse(true);
                setEditingCourse({
                  id: 'course-' + Date.now(),
                  orderNumber: courses.length + 1,
                  title: '',
                  subtitle: '',
                  category: '기초',
                  isFree: true,
                  proposedPrice: 0,
                  durationMinutes: 7,
                  status: '초안',
                  hasActualVideo: false,
                  videoStatusNote: '슬라이드 및 텍스트 대본 기반 강의',
                  learningObjectives: [''],
                  scriptMarkdown: '',
                  slideDeck: [],
                  narrationScript: '',
                  subtitlesText: '',
                  summaryText: '',
                  keyTerms: [],
                  comprehensionQuizzes: [],
                  practicalExercise: { title: '', description: '', homeActionTip: '' },
                  sources: '라비니아 소믈리에 교육팀',
                  reviewedDate: new Date().toISOString().split('T')[0],
                  reviewer: '운영자',
                });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 새 강의 등록
            </button>
          </div>

          <div className="border border-[#DECFC0] rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#DECFC0] text-[#7A695B]">
                  <th className="p-3 font-semibold w-12 text-center">차시</th>
                  <th className="p-3 font-semibold">강의 제목 & 부제</th>
                  <th className="p-3 font-semibold">카테고리</th>
                  <th className="p-3 font-semibold">유무료 / 제안가</th>
                  <th className="p-3 font-semibold">콘텐츠 상태</th>
                  <th className="p-3 font-semibold">슬라이드/퀴즈</th>
                  <th className="p-3 font-semibold text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE0D4]">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-center text-[#722F37]">
                      {c.orderNumber}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-[#38271E]">{c.title}</div>
                      <div className="text-[11px] text-[#8C7A6B]">{c.subtitle}</div>
                    </td>
                    <td className="p-3">{c.category}</td>
                    <td className="p-3">
                      {c.isFree ? (
                        <span className="text-[#2E7D32] font-semibold">무료</span>
                      ) : (
                        <span className="font-mono text-[#722F37]">
                          {c.proposedPrice.toLocaleString()}원
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          updateCourse({ ...c, status: e.target.value as ContentStatus })
                        }
                        className="bg-[#FAF7F2] border border-[#DECFC0] rounded px-2 py-1 text-xs text-[#38271E] cursor-pointer"
                      >
                        <option value="초안">초안</option>
                        <option value="검토">검토</option>
                        <option value="예약">예약</option>
                        <option value="공개">공개</option>
                        <option value="보관">보관</option>
                      </select>
                    </td>
                    <td className="p-3 text-[11px] text-[#8C7A6B]">
                      {c.slideDeck?.length || 0}장 / {c.comprehensionQuizzes?.length || 0}문제
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setIsNewCourse(false);
                            setEditingCourse(c);
                          }}
                          className="p-1.5 text-[#5C4D41] hover:text-[#722F37] border border-[#DECFC0] rounded hover:bg-white cursor-pointer"
                          title="자료 수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`[${c.title}] 강의를 삭제하시겠습니까?`)) {
                              deleteCourse(c.id);
                            }
                          }}
                          className="p-1.5 text-[#A39282] hover:text-[#C62828] border border-[#DECFC0] rounded hover:bg-white cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. RECIPES TAB */}
      {currentTab === 'recipes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#38271E]">레시피 콘텐츠 관리</h2>
              <p className="text-xs text-[#8C7A6B]">
                요리 후보 10종의 재료량, 단계, 쇼핑 링크, 어울리는 와인 매핑을 수정합니다.
              </p>
            </div>
            <button
              onClick={() => {
                setIsNewRecipe(true);
                setEditingRecipe({
                  id: 'recipe-' + Date.now(),
                  title: '',
                  description: '',
                  imageUrl: '/src/assets/images/recipe_mushroom_pasta_1790745580309.jpg',
                  servings: 2,
                  prepTimeMinutes: 15,
                  cookTimeMinutes: 15,
                  difficulty: '쉬움',
                  category: '파스타',
                  ingredients: [],
                  steps: [''],
                  alternativeIngredients: [],
                  allergenNotes: [],
                  recommendedWineStyleIds: ['oaked-chardonnay'],
                  relatedCourseIds: [],
                  status: '공개',
                  reviewedDate: new Date().toISOString().split('T')[0],
                  reviewer: '라비니아 소믈리에팀',
                });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 새 레시피 등록
            </button>
          </div>

          <div className="border border-[#DECFC0] rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#DECFC0] text-[#7A695B]">
                  <th className="p-3 font-semibold">요리명</th>
                  <th className="p-3 font-semibold">카테고리 / 난이도</th>
                  <th className="p-3 font-semibold">시간 / 인분</th>
                  <th className="p-3 font-semibold">재료 수</th>
                  <th className="p-3 font-semibold">공개 상태</th>
                  <th className="p-3 font-semibold">검토자</th>
                  <th className="p-3 font-semibold text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE0D4]">
                {recipes.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#38271E]">{r.title}</div>
                      <div className="text-[11px] text-[#8C7A6B]">{r.frenchTitle}</div>
                    </td>
                    <td className="p-3">
                      <span>{r.category}</span> · <span className="font-medium">{r.difficulty}</span>
                    </td>
                    <td className="p-3">
                      {r.prepTimeMinutes + r.cookTimeMinutes}분 · {r.servings}인분
                    </td>
                    <td className="p-3">{r.ingredients.length}개 재료</td>
                    <td className="p-3">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          updateRecipe({ ...r, status: e.target.value as ContentStatus })
                        }
                        className="bg-[#FAF7F2] border border-[#DECFC0] rounded px-2 py-1 text-xs cursor-pointer"
                      >
                        <option value="초안">초안</option>
                        <option value="검토">검토</option>
                        <option value="예약">예약</option>
                        <option value="공개">공개</option>
                        <option value="보관">보관</option>
                      </select>
                    </td>
                    <td className="p-3 text-[11px] text-[#8C7A6B]">{r.reviewer}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setIsNewRecipe(false);
                            setEditingRecipe(r);
                          }}
                          className="p-1.5 text-[#5C4D41] hover:text-[#722F37] border border-[#DECFC0] rounded hover:bg-white cursor-pointer"
                          title="레시피 수정"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`[${r.title}] 레시피를 삭제하시겠습니까?`)) {
                              deleteRecipe(r.id);
                            }
                          }}
                          className="p-1.5 text-[#A39282] hover:text-[#C62828] border border-[#DECFC0] rounded hover:bg-white cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PAIRINGS TAB */}
      {currentTab === 'pairings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#38271E]">음식-와인 페어링 규칙 관리</h2>
              <p className="text-xs text-[#8C7A6B]">
                요리별 최우선 추천 와인과 대안, 소믈리에 매칭 근거 텍스트를 관리합니다.
              </p>
            </div>
          </div>

          <div className="border border-[#DECFC0] rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#DECFC0] text-[#7A695B]">
                  <th className="p-3 font-semibold">음식명</th>
                  <th className="p-3 font-semibold">소스 / 맵기</th>
                  <th className="p-3 font-semibold">최우선 추천 스타일</th>
                  <th className="p-3 font-semibold">대안 선택</th>
                  <th className="p-3 font-semibold">연결 레시피</th>
                  <th className="p-3 font-semibold text-right">삭제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE0D4]">
                {pairings.map((p) => {
                  const style = wineStyles.find((ws) => ws.id === p.primaryStyleId);
                  return (
                    <tr key={p.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-3 font-bold text-[#38271E]">{p.dishName}</td>
                      <td className="p-3">
                        {p.sauceType} · 맵기 {p.spicyLevel}
                      </td>
                      <td className="p-3 font-semibold text-[#722F37]">
                        {style?.nameKo || p.primaryStyleId}
                      </td>
                      <td className="p-3 text-[11px] text-[#6E5D50] max-w-xs truncate">
                        {p.alternativeChoice}
                      </td>
                      <td className="p-3 text-[11px] text-[#8C7A6B]">
                        {p.recipeId || '연결 없음'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`[${p.dishName}] 페어링을 삭제하시겠습니까?`)) {
                              deletePairing(p.id);
                            }
                          }}
                          className="p-1.5 text-[#A39282] hover:text-[#C62828] border border-[#DECFC0] rounded hover:bg-white cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. KIT & SMARTSTORE TAB */}
      {currentTab === 'kit_store' && (
        <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#DECFC0]">
            <h2 className="text-base font-bold text-[#38271E]">
              와인데뷔 키트 및 네이버 스마트스토어 연동 설정
            </h2>
            <p className="text-xs text-[#8C7A6B] mt-0.5">
              공식 커머스 API 심사 준비 전까지는 정직한 스토어 URL 및 상품번호 매핑과 구매 인증 큐로 운영합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  키트 상품명
                </label>
                <input
                  type="text"
                  value={kitProduct.name}
                  onChange={(e) =>
                    updateKitProduct({ ...kitProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  관리자 검토용 제안 판매가 (원)
                </label>
                <input
                  type="number"
                  value={kitProduct.proposedPrice}
                  onChange={(e) =>
                    updateKitProduct({
                      ...kitProduct,
                      proposedPrice: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  상품 판매 상태
                </label>
                <select
                  value={kitProduct.status}
                  onChange={(e) =>
                    updateKitProduct({
                      ...kitProduct,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none cursor-pointer"
                >
                  <option value="준비 중 (출시 알림 신청)">준비 중 (출시 알림 신청)</option>
                  <option value="판매 중">판매 중 (스마트스토어 구매 활성화)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  네이버 스마트스토어 상품 URL
                </label>
                <input
                  type="text"
                  value={kitProduct.smartStoreUrl}
                  onChange={(e) =>
                    updateKitProduct({
                      ...kitProduct,
                      smartStoreUrl: e.target.value,
                    })
                  }
                  placeholder="https://smartstore.naver.com/..."
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  네이버 스마트스토어 상품번호
                </label>
                <input
                  type="text"
                  value={kitProduct.naverProductNumber}
                  onChange={(e) =>
                    updateKitProduct({
                      ...kitProduct,
                      naverProductNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  네이버 커머스 API 연동 상태
                </label>
                <div className="p-2.5 bg-[#FAF7F2] rounded border border-[#DECFC0] text-[#722F37] font-semibold">
                  {adminSettings.naverCommerceApiStatus}
                </div>
                <p className="text-[11px] text-[#8C7A6B] mt-1">
                  ※ 공식 안내(apicenter.commerce.naver.com): 센터 가입, 애플리케이션 등록, 주문 조회 권한 심사 완료 후 자동 연동이 지원됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CLAIMS TAB */}
      {currentTab === 'claims' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#38271E]">스마트스토어 구매 인증 대기 큐</h2>
              <p className="text-xs text-[#8C7A6B]">
                고객이 제출한 주문번호를 네이버 스마트스토어 판매자센터 주문 내역과 대조한 뒤 승인하여 강의 권한을 부여합니다.
              </p>
            </div>
          </div>

          <div className="border border-[#DECFC0] rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#DECFC0] text-[#7A695B]">
                  <th className="p-3 font-semibold">신청 일시</th>
                  <th className="p-3 font-semibold">구매자 성함 (전화끝자리)</th>
                  <th className="p-3 font-semibold">주문번호</th>
                  <th className="p-3 font-semibold">신청 상품</th>
                  <th className="p-3 font-semibold">심사 상태</th>
                  <th className="p-3 font-semibold text-right">검토 및 처리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE0D4]">
                {purchaseClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="p-3 text-[11px] text-[#8C7A6B] font-mono">{claim.claimDate}</td>
                    <td className="p-3 font-bold text-[#38271E]">
                      {claim.userName} ({claim.userPhoneLast4})
                    </td>
                    <td className="p-3 font-mono text-[#722F37] font-semibold">
                      {claim.orderNumber}
                    </td>
                    <td className="p-3">{claim.productType}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          claim.status === '승인'
                            ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                            : claim.status === '반려'
                            ? 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                            : 'bg-[#FFF9C4] text-[#F57F17] border border-[#FFF59D]'
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {claim.status === '대기' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              updatePurchaseClaimStatus(
                                claim.id,
                                '승인',
                                '관리자 네이버 스마트스토어 주문 대조 확인 완료'
                              )
                            }
                            className="px-2.5 py-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded text-xs font-semibold cursor-pointer"
                          >
                            승인 (수강권 부여)
                          </button>
                          <button
                            onClick={() =>
                              updatePurchaseClaimStatus(
                                claim.id,
                                '반려',
                                '주문번호 불일치 또는 취소/반품 주문'
                              )
                            }
                            className="px-2.5 py-1 bg-white hover:bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2] rounded text-xs font-semibold cursor-pointer"
                          >
                            반려
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#8C7A6B]">
                          {claim.reviewNote || '처리 완료'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. AFFILIATE TAB */}
      {currentTab === 'affiliate' && (
        <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#DECFC0]">
            <h2 className="text-base font-bold text-[#38271E]">
              제휴 쇼핑 링크 및 경제적 이해관계 고지 설정
            </h2>
            <p className="text-xs text-[#8C7A6B] mt-0.5">
              공정거래위원회 추천보증 심사지침에 따라 경제적 이해관계(대가성 문구)를 관리합니다.
            </p>
          </div>

          <div className="space-y-4 text-xs max-w-2xl">
            <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#DECFC0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#38271E]">
                  쿠팡 파트너스 승인 여부
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateAdminSettings({
                      ...adminSettings,
                      isCoupangApproved: !adminSettings.isCoupangApproved,
                    })
                  }
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    adminSettings.isCoupangApproved
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#DECFC0] text-[#5C4D41]'
                  }`}
                >
                  {adminSettings.isCoupangApproved ? '승인 완료 상태' : '미승인 (일반 연결)'}
                </button>
              </div>
              <p className="text-[11px] text-[#8C7A6B]">
                ※ 제휴 승인 전에는 수익이 발생한다고 표시하지 않으며, 승인 시에만 대가성 문구가 고지됩니다.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-[#38271E] mb-1">
                쿠팡 파트너스 수수료율 설정 (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={adminSettings.coupangPartnersCommissionRate}
                onChange={(e) =>
                  updateAdminSettings({
                    ...adminSettings,
                    coupangPartnersCommissionRate: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#38271E] mb-1">
                쿠팡 파트너스 대가성 문구
              </label>
              <textarea
                rows={2}
                value={adminSettings.coupangDisclosureNote}
                onChange={(e) =>
                  updateAdminSettings({
                    ...adminSettings,
                    coupangDisclosureNote: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#38271E] mb-1">
                마켓컬리 구매 연결 안내 문구
              </label>
              <textarea
                rows={2}
                value={adminSettings.kurlyDisclosureNote}
                onChange={(e) =>
                  updateAdminSettings({
                    ...adminSettings,
                    kurlyDisclosureNote: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. INQUIRIES TAB */}
      {currentTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#38271E]">고객 1:1 문의 접수함</h2>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-white p-5 rounded-xl border border-[#DECFC0] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#722F37]">{inq.category}</span>
                    <span>·</span>
                    <span className="font-bold text-[#38271E]">{inq.userName}</span>
                    <span>({inq.email})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8C7A6B]">{inq.createdAt}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        inq.status === '답변 완료'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#FFF9C4] text-[#F57F17]'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-bold text-[#2C2420]">{inq.title}</div>
                <p className="text-xs text-[#5C4D41] bg-[#FAF7F2] p-3 rounded-lg leading-relaxed">
                  {inq.message}
                </p>

                {inq.replyContent && (
                  <div className="text-xs text-[#2E7D32] bg-[#F4F9F4] p-3 rounded-lg border border-[#C8E6C9] space-y-1">
                    <div className="font-bold">✓ 관리자 등록 답변:</div>
                    <p className="leading-relaxed">{inq.replyContent}</p>
                  </div>
                )}

                {inq.status === '접수 대기' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        const reply = prompt('답변 내용을 입력하세요:');
                        if (reply) {
                          answerInquiry(inq.id, reply);
                        }
                      }}
                      className="px-3.5 py-1.5 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-md cursor-pointer"
                    >
                      답변 작성하기
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. STATS & BUDGET TAB */}
      {currentTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#DECFC0] shadow-xs">
              <div className="text-xs text-[#8C7A6B]">페어링 검색 (pairing_search)</div>
              <div className="text-xl font-bold font-mono text-[#722F37] mt-1">
                {analyticsEvents.filter((e) => e.eventName === 'pairing_search').length}회
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DECFC0] shadow-xs">
              <div className="text-xs text-[#8C7A6B]">레시피 조회 (recipe_view)</div>
              <div className="text-xl font-bold font-mono text-[#722F37] mt-1">
                {analyticsEvents.filter((e) => e.eventName === 'recipe_view').length}회
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DECFC0] shadow-xs">
              <div className="text-xs text-[#8C7A6B]">제휴 클릭 (affiliate_click)</div>
              <div className="text-xl font-bold font-mono text-[#722F37] mt-1">
                {analyticsEvents.filter((e) => e.eventName === 'affiliate_click').length}회
              </div>
              <div className="text-[10px] text-[#8C7A6B] mt-0.5">※ 제휴 클릭은 매출이 아님</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#DECFC0] shadow-xs">
              <div className="text-xs text-[#8C7A6B]">확인된 구매 (verified_purchase)</div>
              <div className="text-xl font-bold font-mono text-[#2E7D32] mt-1">
                {analyticsEvents.filter((e) => e.eventName === 'verified_purchase').length}건
              </div>
            </div>
          </div>

          {/* Monthly Operating Cost Simulator from Plan */}
          <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#722F37]" />
              <h3 className="text-base font-bold text-[#38271E] font-display">
                월 운영비 및 손익 시뮬레이터 (계획서 제11장 기준)
              </h3>
            </div>

            <p className="text-xs text-[#6E5D50] leading-relaxed">
              도메인, 호스팅, 데이터베이스, 영상 CDN, 마케팅 예산을 입력해 월 손익 분기점(필요 키트/강의 판매 수량)을 계산합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#DECFC0]">
                <div className="text-[#8C7A6B]">월 도메인 & 호스팅</div>
                <div className="text-sm font-bold font-mono text-[#38271E] mt-1">
                  {adminSettings.monthlyOperatingCosts.domainHosting.toLocaleString()}원
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#DECFC0]">
                <div className="text-[#8C7A6B]">월 영상/자료 CDN 전송비</div>
                <div className="text-sm font-bold font-mono text-[#38271E] mt-1">
                  {adminSettings.monthlyOperatingCosts.videoCdn.toLocaleString()}원
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#DECFC0]">
                <div className="text-[#8C7A6B]">월 권장 마케팅 예산</div>
                <div className="text-sm font-bold font-mono text-[#722F37] mt-1">
                  {adminSettings.monthlyOperatingCosts.marketingBudget.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Edit Modal */}
      {editingCourse && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setEditingCourse(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 border border-[#DECFC0] shadow-2xl my-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D4]">
              <h3 className="text-base font-bold text-[#38271E] font-display">
                {isNewCourse ? '새 강의 등록' : `[${editingCourse.title}] 강의 편집`}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-[#8C7A6B] hover:text-[#2C2420] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">차시 번호</label>
                  <input
                    type="number"
                    value={editingCourse.orderNumber}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        orderNumber: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">카테고리</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  >
                    <option value="기초">기초</option>
                    <option value="프랑스 산지">프랑스 산지</option>
                    <option value="음식 페어링">음식 페어링</option>
                    <option value="실습">실습</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">강의 제목 *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">부제 (간략 설명)</label>
                  <input
                    type="text"
                    value={editingCourse.subtitle}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, subtitle: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">유료 / 무료 여부</label>
                  <select
                    value={editingCourse.isFree ? 'free' : 'paid'}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        isFree: e.target.value === 'free',
                      })
                    }
                    className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  >
                    <option value="free">무료 입문 강좌</option>
                    <option value="paid">유료 단품 강좌</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">제안 판매가 (원)</label>
                  <input
                    type="number"
                    value={editingCourse.proposedPrice}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        proposedPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">강의 대본 (Markdown)</label>
                  <textarea
                    rows={6}
                    value={editingCourse.scriptMarkdown}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        scriptMarkdown: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">핵심 요약문</label>
                  <textarea
                    rows={2}
                    value={editingCourse.summaryText}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        summaryText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-3 py-1.5 text-xs text-[#6E5D50] hover:bg-[#FAF7F2] rounded-md border border-[#DECFC0]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#722F37] text-white rounded-md"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recipe Edit Modal */}
      {editingRecipe && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setEditingRecipe(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 space-y-4 border border-[#DECFC0] shadow-2xl my-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D4]">
              <h3 className="text-base font-bold text-[#38271E] font-display">
                {isNewRecipe ? '새 레시피 등록' : `[${editingRecipe.title}] 레시피 편집`}
              </h3>
              <button
                onClick={() => setEditingRecipe(null)}
                className="text-[#8C7A6B] hover:text-[#2C2420] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRecipe} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">레시피 제목 *</label>
                  <input
                    type="text"
                    required
                    value={editingRecipe.title}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">카테고리</label>
                  <select
                    value={editingRecipe.category}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  >
                    <option value="파스타">파스타</option>
                    <option value="육류">육류</option>
                    <option value="해산물">해산물</option>
                    <option value="한식">한식</option>
                    <option value="치즈/안주">치즈/안주</option>
                    <option value="채소/가정식">채소/가정식</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">기준 인분</label>
                  <input
                    type="number"
                    value={editingRecipe.servings}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        servings: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold mb-1">간단 설명</label>
                  <textarea
                    rows={2}
                    value={editingRecipe.description}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="px-3 py-1.5 text-xs text-[#6E5D50] hover:bg-[#FAF7F2] rounded-md border border-[#DECFC0]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#722F37] text-white rounded-md"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
