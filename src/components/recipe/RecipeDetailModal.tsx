import React, { useState } from 'react';
import { Recipe, Ingredient } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Clock,
  ChefHat,
  Users,
  Copy,
  ExternalLink,
  Bookmark,
  Sparkles,
  BookOpen,
  Info,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  const {
    wineStyles,
    pairings,
    courses,
    adminSettings,
    user,
    toggleSaveRecipe,
    openCourseDetail,
    logEvent,
    showToast,
  } = useApp();

  const [currentServings, setCurrentServings] = useState<number>(recipe.servings || 2);
  const [copiedIngredient, setCopiedIngredient] = useState<string | null>(null);

  const isSaved = user.savedRecipeIds.includes(recipe.id);

  // Scaled ingredient calculation
  const scaleFactor = currentServings / (recipe.servings || 2);

  const formatScaledAmount = (amount: number, unit: string) => {
    if (unit === '약간' || unit === '줌' || unit === '장' || unit === '줄기' || unit === '바구니') {
      return `${amount} ${unit}`;
    }
    const scaled = Math.round(amount * scaleFactor * 10) / 10;
    return `${scaled} ${unit}`;
  };

  const copyIngredientName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIngredient(name);
    showToast(`'${name}' 재료명이 복사되었습니다. 쇼핑몰 검색창에 붙여넣으세요.`, 'info');
    setTimeout(() => setCopiedIngredient(null), 2000);
  };

  const handleExternalClick = (platform: 'kurly' | 'coupang', ingredient: Ingredient) => {
    logEvent('affiliate_click', {
      platform,
      ingredientName: ingredient.name,
      recipeId: recipe.id,
      isAffiliate: !!ingredient.isAffiliate,
    });
  };

  // Find recommended wine styles
  const recommendedStyles = wineStyles.filter((ws) =>
    recipe.recommendedWineStyleIds?.includes(ws.id)
  );

  // Find related courses
  const relatedCourses = courses.filter((c) =>
    recipe.relatedCourseIds?.includes(c.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] text-[#2C2420] w-full max-w-3xl rounded-xl shadow-2xl border border-[#E0D5C7] overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DFD5] bg-[#FAF7F2] sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#722F37] font-semibold">
                {recipe.category} 레시피
              </span>
              <span className="text-[#C2B2A2]">·</span>
              <span className="text-xs text-[#8C7A6B]">
                검토: {recipe.reviewer} ({recipe.reviewedDate})
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#38271E] font-display">
              {recipe.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveRecipe(recipe.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#722F37] text-white border-[#722F37]'
                  : 'bg-white text-[#722F37] border-[#D6C7B8] hover:bg-[#F3ECE4]'
              }`}
              title={isSaved ? '저장됨' : '레시피 저장'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#7A695B] hover:text-[#2C2420] rounded-lg hover:bg-[#EDE3D6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top Hero Image & Meta Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#F3EDE4] rounded-lg p-4 border border-[#E4D8CA]">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#E2D5C5]">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              {recipe.frenchTitle && (
                <div className="absolute bottom-2 left-2 bg-[#2C2420]/80 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded font-display italic">
                  {recipe.frenchTitle}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                {recipe.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#DECFC0] text-center">
                <div className="p-2 bg-[#FAF7F2] rounded border border-[#DECFC0]/60">
                  <div className="text-[11px] text-[#8C7A6B] flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-[#722F37]" /> 준비/조리
                  </div>
                  <div className="text-xs font-semibold text-[#38271E] mt-0.5">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
                  </div>
                </div>

                <div className="p-2 bg-[#FAF7F2] rounded border border-[#DECFC0]/60">
                  <div className="text-[11px] text-[#8C7A6B] flex items-center justify-center gap-1">
                    <ChefHat className="w-3 h-3 text-[#722F37]" /> 난이도
                  </div>
                  <div className="text-xs font-semibold text-[#38271E] mt-0.5">
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="p-2 bg-[#FAF7F2] rounded border border-[#DECFC0]/60">
                  <div className="text-[11px] text-[#8C7A6B] flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 text-[#722F37]" /> 기준 인분
                  </div>
                  <div className="text-xs font-semibold text-[#38271E] mt-0.5">
                    {recipe.servings}인분
                  </div>
                </div>
              </div>

              {/* Allergen Warning */}
              {recipe.allergenNotes && recipe.allergenNotes.length > 0 && (
                <div className="p-2.5 rounded bg-[#FFF8EE] border border-[#F3DFC1] text-[11px] text-[#8A5012] flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B86500] shrink-0 mt-0.5" />
                  <span>
                    <strong>알레르기 관련 재료</strong>: {recipe.allergenNotes.join(', ')}
                    <br />
                    <span className="text-[10px] text-[#A66822]">
                      (※ 조리 시 사용된 대표 식재료 기준이며, 개인 체질에 따라 조리 전 성분을 확인해 주세요)
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Servings Adjuster & Ingredients List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E2D5C5]">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm sm:text-base text-[#38271E]">
                  필요한 식재료 & 장보기
                </h3>
                <span className="text-xs text-[#8C7A6B]">
                  ({recipe.ingredients.length}개 재료)
                </span>
              </div>

              {/* Servings Stepper */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-[#F3EDE4] px-2.5 py-1 rounded-md border border-[#E0D5C7]">
                <span className="text-xs font-medium text-[#5C4D41]">인분 조절:</span>
                {[1, 2, 3, 4].map((serv) => (
                  <button
                    key={serv}
                    onClick={() => setCurrentServings(serv)}
                    className={`px-2 py-0.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                      currentServings === serv
                        ? 'bg-[#722F37] text-white'
                        : 'text-[#5C4D41] hover:bg-[#E4D8CA]'
                    }`}
                  >
                    {serv}인분
                  </button>
                ))}
              </div>
            </div>

            {/* Note about salt and spices */}
            <div className="text-[11px] text-[#7A695B] bg-[#FAF7F2] p-2 rounded border border-[#E2D5C5] flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#722F37] shrink-0 mt-0.5" />
              <span>
                <strong>계량 조절 안내</strong>: 인분 변경 시 주재료는 자동 비례 계산되지만, 
                <strong> 소금·후추·향신료</strong>는 기호에 맞춰 맛을 보며 조절해 주세요.
              </span>
            </div>

            {/* Ingredients Table */}
            <div className="divide-y divide-[#EAE0D4] border border-[#E2D5C5] rounded-lg overflow-hidden bg-white text-xs">
              {recipe.ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 hover:bg-[#FDFBF7] transition-colors gap-2"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#2C2420]">{ing.name}</span>
                    <span className="font-mono text-[#722F37] font-medium">
                      {formatScaledAmount(ing.amount, ing.unit)}
                    </span>
                    {ing.notes && (
                      <span className="text-[11px] text-[#8C7A6B]">({ing.notes})</span>
                    )}
                  </div>

                  {/* Actions: Copy Name or Kurly / Coupang external links */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => copyIngredientName(ing.name)}
                      className="flex items-center gap-1 text-[11px] px-2 py-1 bg-[#FAF7F2] hover:bg-[#F3ECE4] text-[#6B5A4E] rounded border border-[#DED0C1] transition-colors cursor-pointer"
                      title="재료명 복사"
                    >
                      {copiedIngredient === ing.name ? (
                        <>
                          <Check className="w-3 h-3 text-[#2E7D32]" />
                          <span className="text-[#2E7D32]">복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#8C7A6B]" />
                          <span>재료명 복사</span>
                        </>
                      )}
                    </button>

                    {ing.kurlyUrl ? (
                      <a
                        href={ing.kurlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleExternalClick('kurly', ing)}
                        className="flex items-center gap-1 text-[11px] px-2 py-1 bg-[#5F0080]/10 hover:bg-[#5F0080]/20 text-[#5F0080] font-medium rounded border border-[#5F0080]/30 transition-colors cursor-pointer"
                        title="마켓컬리에서 재료 찾기 (일반 검색 연결)"
                      >
                        <span>컬리</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <a
                        href="https://www.kurly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#99897C] hover:underline"
                      >
                        컬리홈
                      </a>
                    )}

                    {ing.coupangUrl ? (
                      <a
                        href={ing.coupangUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleExternalClick('coupang', ing)}
                        className="flex items-center gap-1 text-[11px] px-2 py-1 bg-[#E42E28]/10 hover:bg-[#E42E28]/20 text-[#E42E28] font-medium rounded border border-[#E42E28]/30 transition-colors cursor-pointer"
                        title="쿠팡에서 재료 찾기"
                      >
                        <span>쿠팡</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <a
                        href="https://www.coupang.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#99897C] hover:underline"
                      >
                        쿠팡홈
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Shopping Disclaimer Note */}
            <div className="text-[11px] text-[#8C7A6B] px-1 space-y-0.5">
              <p>
                • 외부 쇼핑몰 가격과 재고는 판매처 사정에 따라 변동될 수 있으며 장바구니 담기와 구매는 판매처에서 직접 진행됩니다.
              </p>
              {adminSettings.isCoupangApproved && (
                <p className="text-[10px] text-[#A39181]">
                  • {adminSettings.coupangDisclosureNote}
                </p>
              )}
            </div>
          </div>

          {/* Alternative Ingredients */}
          {recipe.alternativeIngredients && recipe.alternativeIngredients.length > 0 && (
            <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#E2D5C5] space-y-2">
              <h4 className="text-xs font-semibold text-[#38271E] flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-[#722F37]" />
                집에 재료가 없다면? (대체 식재료 가이드)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {recipe.alternativeIngredients.map((alt, idx) => (
                  <div key={idx} className="p-2 bg-white rounded border border-[#E2D5C5]">
                    <span className="text-[#8C7A6B] line-through mr-1">{alt.original}</span>
                    <span className="font-semibold text-[#2C2420]">→ {alt.substitute}</span>
                    {alt.note && <p className="text-[11px] text-[#6E5D50] mt-0.5">{alt.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Cooking Steps */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-[#38271E]">조리 순서</h3>
            <div className="space-y-2.5">
              {recipe.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2D5C5] text-xs sm:text-sm leading-relaxed"
                >
                  <span className="font-bold text-[#722F37] font-mono text-sm shrink-0 bg-[#FAF7F2] w-6 h-6 rounded-full flex items-center justify-center border border-[#DECFC0]">
                    {idx + 1}
                  </span>
                  <div className="text-[#382D26]">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Wine Pairings */}
          {recommendedStyles.length > 0 && (
            <div className="p-4 bg-[#F5ECE3] rounded-lg border border-[#DECFC0] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#722F37]" />
                <h4 className="text-sm font-semibold text-[#38271E]">
                  이 요리에 어울리는 추천 와인 스타일
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedStyles.map((ws) => (
                  <div
                    key={ws.id}
                    className="p-3 bg-white rounded-lg border border-[#DECFC0] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#722F37]">
                        {ws.nameKo}
                      </span>
                      <span className="text-[10px] text-[#8C7A6B]">{ws.category}</span>
                    </div>
                    <p className="text-[11px] text-[#5C4D41] leading-normal">
                      {ws.pairingPhilosophy}
                    </p>
                    <div className="text-[10px] text-[#8C7A6B]">
                      적정 음용 온도: {ws.recommendedTemp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Class Links */}
          {relatedCourses.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#E2D5C5]">
              <h4 className="text-xs font-semibold text-[#38271E] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#722F37]" />
                함께 들으면 좋은 관련 무료 클래스
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      openCourseDetail(c.id);
                    }}
                    className="flex items-center justify-between p-2.5 bg-white hover:bg-[#FAF7F2] rounded border border-[#DECFC0] text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#2C2420] group-hover:text-[#722F37]">
                        {c.title}
                      </div>
                      <div className="text-[10px] text-[#8C7A6B]">{c.subtitle}</div>
                    </div>
                    <span className="text-[10px] text-[#722F37] font-semibold">
                      강의 보기 →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E8DFD5] bg-[#FAF7F2] flex items-center justify-between">
          <button
            onClick={() => toggleSaveRecipe(recipe.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#722F37] text-white border-[#722F37]'
                : 'bg-white text-[#722F37] border-[#D6C7B8] hover:bg-[#F3ECE4]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? '내 레시피에 저장됨' : '레시피 보관'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4A3B32] hover:bg-[#38271E] text-white text-xs font-medium rounded-md transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
