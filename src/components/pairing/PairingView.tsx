import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PairingItem, WineStyle } from '../../types';
import { RecipeDetailModal } from '../recipe/RecipeDetailModal';
import {
  Search,
  Sparkles,
  Utensils,
  Wine,
  Filter,
  Bookmark,
  BookOpen,
  ArrowRight,
  Flame,
  RotateCcw,
  Info,
} from 'lucide-react';

export const PairingView: React.FC = () => {
  const {
    pairings,
    wineStyles,
    recipes,
    user,
    toggleSavePairing,
    openRecipeDetail,
    openCourseDetail,
    selectedRecipeId,
    setSelectedRecipeId,
    logEvent,
  } = useApp();

  const [mode, setMode] = useState<'food_to_wine' | 'wine_to_food'>('food_to_wine');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpicy, setSelectedSpicy] = useState<string>('all');
  const [selectedSauce, setSelectedSauce] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedSituation, setSelectedSituation] = useState<string>('all');
  const [selectedWineStyleId, setSelectedWineStyleId] = useState<string>('dry-riesling');

  // Selected recipe modal state
  const activeRecipe = useMemo(() => {
    if (!selectedRecipeId) return null;
    return recipes.find((r) => r.id === selectedRecipeId) || null;
  }, [selectedRecipeId, recipes]);

  const categories = ['all', '파스타', '육류', '해산물', '한식', '치즈/안주', '채소/가정식'];
  const spicyLevels = [
    { label: '전체 맵기', val: 'all' },
    { label: '안매움 (0)', val: '0' },
    { label: '약간 매콤 (1)', val: '1' },
    { label: '중간 매움 (2)', val: '2' },
  ];
  const sauceTypes = ['all', '크림/치즈', '토마토', '오일/허브', '간장/양념', '고추장/매운양념', '소금/원물'];
  const situations = ['all', '둘만의 저녁', '퇴근 후 혼밥', '손님 초대', '주말 브런치'];

  const filteredPairings = useMemo(() => {
    if (mode === 'wine_to_food') {
      // Find dishes where primary or secondary matches the chosen wine style
      return pairings.filter(
        (p) =>
          p.primaryStyleId === selectedWineStyleId ||
          p.secondaryStyleId === selectedWineStyleId
      );
    }

    return pairings.filter((p) => {
      // Search
      const matchesSearch =
        searchTerm === '' ||
        p.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.matchReason.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const matchesCat = selectedCategory === 'all' || p.dishCategory === selectedCategory;

      // Spicy
      const matchesSpicy = selectedSpicy === 'all' || p.spicyLevel.toString() === selectedSpicy;

      // Sauce
      const matchesSauce = selectedSauce === 'all' || p.sauceType === selectedSauce;

      // Situation
      const matchesSituation = selectedSituation === 'all' || p.situation === selectedSituation;

      return matchesSearch && matchesCat && matchesSpicy && matchesSauce && matchesSituation;
    });
  }, [
    mode,
    selectedWineStyleId,
    pairings,
    searchTerm,
    selectedCategory,
    selectedSpicy,
    selectedSauce,
    selectedSituation,
  ]);

  const getWineStyle = (id: string): WineStyle | undefined => {
    return wineStyles.find((ws) => ws.id === id);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logEvent('pairing_search', { query: searchTerm, category: selectedCategory });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSpicy('all');
    setSelectedSauce('all');
    setSelectedMethod('all');
    setSelectedSituation('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Title & Direction Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8DFD5]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#722F37] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 검토된 소믈리에 페어링 데이터
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#38271E] font-display">
            음식과 와인 페어링
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5D50] mt-1 max-w-2xl">
            단순히 이름만으로 추천하지 않습니다. 소스의 무게감, 맵기, 조리법을 분석해 검증된 와인 스타일 2~3가지를 실패 없는 이유와 함께 제안합니다.
          </p>
        </div>

        {/* Mode Switcher: Food -> Wine vs Wine -> Food */}
        <div className="inline-flex p-1 bg-[#EFE7DC] rounded-lg border border-[#D9CAB8] self-start md:self-auto">
          <button
            onClick={() => setMode('food_to_wine')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              mode === 'food_to_wine'
                ? 'bg-white text-[#722F37] shadow-sm font-semibold'
                : 'text-[#6E5D50] hover:text-[#2C2420]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>음식으로 와인 찾기</span>
          </button>
          <button
            onClick={() => setMode('wine_to_food')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              mode === 'wine_to_food'
                ? 'bg-white text-[#722F37] shadow-sm font-semibold'
                : 'text-[#6E5D50] hover:text-[#2C2420]'
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            <span>집에 있는 와인으로 찾기</span>
          </button>
        </div>
      </div>

      {/* Filter Surface */}
      {mode === 'food_to_wine' ? (
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#E2D5C5] shadow-xs space-y-4">
          {/* Search Row */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="음식 이름이나 재료를 검색해 보세요 (예: 버섯 크림 파스타, 삼겹살, 김치전)"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D8C9B9] rounded-lg text-xs sm:text-sm text-[#2C2420] placeholder-[#A39282] focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer shrink-0"
            >
              조합 검색
            </button>
          </form>

          {/* Interactive Filter Pills */}
          <div className="space-y-2.5 pt-1">
            {/* Food Categories */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#8C7A6B] font-medium mr-1 text-[11px] shrink-0">요리 분류:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#722F37] text-white font-medium'
                      : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#F3ECE4]'
                  }`}
                >
                  {cat === 'all' ? '전체 요리' : cat}
                </button>
              ))}
            </div>

            {/* Sauce & Spiciness & Situation */}
            <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#EAE0D4] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C7A6B] text-[11px]">소스:</span>
                <select
                  value={selectedSauce}
                  onChange={(e) => setSelectedSauce(e.target.value)}
                  className="bg-white border border-[#DECFC0] text-[#38271E] rounded px-2 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">전체 소스</option>
                  {sauceTypes.filter((s) => s !== 'all').map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[#8C7A6B] text-[11px]">맵기:</span>
                <select
                  value={selectedSpicy}
                  onChange={(e) => setSelectedSpicy(e.target.value)}
                  className="bg-white border border-[#DECFC0] text-[#38271E] rounded px-2 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  {spicyLevels.map((s) => (
                    <option key={s.val} value={s.val}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[#8C7A6B] text-[11px]">상황:</span>
                <select
                  value={selectedSituation}
                  onChange={(e) => setSelectedSituation(e.target.value)}
                  className="bg-white border border-[#DECFC0] text-[#38271E] rounded px-2 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">전체 상황</option>
                  {situations.filter((st) => st !== 'all').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-[#7A695B] hover:text-[#722F37] ml-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> 필터 초기화
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Wine -> Food Mode Selector */
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#E2D5C5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#38271E]">
              현재 가지고 계신 와인 스타일을 선택하세요:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {wineStyles.map((ws) => (
              <button
                key={ws.id}
                onClick={() => setSelectedWineStyleId(ws.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedWineStyleId === ws.id
                    ? 'bg-[#722F37] text-white border-[#722F37] shadow-sm'
                    : 'bg-white text-[#38271E] border-[#DECFC0] hover:bg-[#F3ECE4]'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider opacity-80">
                  {ws.category} · {ws.regionSummary.split('/')[0]}
                </div>
                <div className="text-xs sm:text-sm font-bold mt-0.5">{ws.nameKo}</div>
                <div className="text-[10px] opacity-75 truncate mt-1">{ws.nameFr}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
        <span>
          추천 결과 <strong>{filteredPairings.length}</strong>개 조합
        </span>
        <span className="text-[11px]">
          ※ 추천은 취향에 따른 제안이며 식탁의 즐거움을 돕는 가이드입니다.
        </span>
      </div>

      {/* Pairing Cards Grid */}
      {filteredPairings.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E2D5C5] space-y-3">
          <Utensils className="w-8 h-8 text-[#A39282] mx-auto" />
          <h3 className="text-sm font-semibold text-[#38271E]">
            조건에 일치하는 페어링 조합이 없습니다.
          </h3>
          <p className="text-xs text-[#8C7A6B] max-w-sm mx-auto">
            필터를 초기화하거나 다른 검색어로 찾아보세요. 라비니아 소믈리에팀이 매월 새로운 페어링 데이터를 검토 후 업데이트하고 있습니다.
          </p>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs bg-[#722F37] text-white rounded-md hover:bg-[#5C232B] transition-colors cursor-pointer"
          >
            모든 요리 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPairings.map((item) => {
            const primary = getWineStyle(item.primaryStyleId);
            const secondary = getWineStyle(item.secondaryStyleId);
            const isSaved = user.savedPairingIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E2D5C5] shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
                        <span>{item.dishCategory}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.cookingMethod}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.situation}</span>
                        {item.spicyLevel > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center text-[#C62828] font-medium text-[11px]">
                              <Flame className="w-3 h-3 mr-0.5" /> 맵기 {item.spicyLevel}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#38271E] font-display mt-0.5">
                        {item.dishName}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleSavePairing(item.id)}
                      className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#722F37] text-white border-[#722F37]'
                          : 'bg-[#FAF7F2] text-[#8C7A6B] border-[#DECFC0] hover:text-[#722F37]'
                      }`}
                      title={isSaved ? '저장됨' : '조합 저장'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Primary Recommendation Showcase */}
                  {primary && (
                    <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#722F37] uppercase tracking-wider flex items-center gap-1">
                          <Wine className="w-3 h-3" /> 최우선 추천 스타일
                        </span>
                        <span className="text-[10px] text-[#8C7A6B]">{primary.category}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#2C2420]">
                        {primary.nameKo}
                        <span className="text-xs font-normal text-[#8C7A6B] ml-1.5 font-display italic">
                          ({primary.nameFr})
                        </span>
                      </div>
                      <p className="text-xs text-[#5C4D41] leading-relaxed">
                        {item.matchReason}
                      </p>
                    </div>
                  )}

                  {/* Alternative Wine Choice */}
                  <div className="text-xs text-[#6E5D50] bg-[#FDFBF7] p-2.5 rounded border border-[#EDE3D6] space-y-1">
                    <div className="font-semibold text-[#38271E] text-[11px]">
                      대안 선택 (집에 해당 와인이 없을 때):
                    </div>
                    <p className="text-[11px] text-[#6E5D50] leading-normal">
                      {item.alternativeChoice}
                    </p>
                  </div>

                  {/* Sommelier Tip */}
                  <div className="flex items-start gap-1.5 text-[11px] text-[#7A695B]">
                    <Info className="w-3.5 h-3.5 text-[#722F37] shrink-0 mt-0.5" />
                    <span>
                      <strong>소믈리에 팁</strong>: {item.sommelierTip}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-[#EAE0D4] gap-2">
                  {item.recipeId ? (
                    <button
                      onClick={() => openRecipeDetail(item.recipeId!)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#722F37] hover:underline cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>레시피 & 장보기 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#A39282]">레시피 검토 준비 중</span>
                  )}

                  {item.courseId && (
                    <button
                      onClick={() => openCourseDetail(item.courseId!)}
                      className="flex items-center gap-1 text-xs text-[#5C4D41] hover:text-[#722F37] cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>관련 강의 수강</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Render Recipe Modal if selected */}
      {activeRecipe && (
        <RecipeDetailModal
          recipe={activeRecipe}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
};
