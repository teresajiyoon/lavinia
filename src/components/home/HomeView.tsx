import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RecipeDetailModal } from '../recipe/RecipeDetailModal';
import {
  Search,
  Wine,
  Utensils,
  ArrowRight,
  Sparkles,
  Bookmark,
  CheckCircle,
  Package,
  BookOpen,
  Clock,
  ChefHat,
  Info,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    pairings,
    recipes,
    courses,
    wineStyles,
    kitProduct,
    setActiveTab,
    openRecipeDetail,
    openCourseDetail,
    selectedRecipeId,
    setSelectedRecipeId,
    logEvent,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      logEvent('pairing_search', { query: searchQuery });
      setActiveTab('pairing');
    }
  };

  const todayPairing = pairings[0]; // Mushroom cream pasta pairing
  const todayRecipe = recipes.find((r) => r.id === todayPairing?.recipeId);
  const featuredCourses = courses.slice(0, 3);
  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId);

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F3EDE4] border-b border-[#E2D5C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#DECFC0] text-xs font-semibold text-[#722F37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>오늘의 식탁에 어울리는 와인을 찾아보세요</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#38271E] font-display leading-[1.15] tracking-tight">
              와인이 쉬워지는 식탁, <br />
              <span className="text-[#722F37]">라비니아 와인데뷔</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C4D41] leading-relaxed max-w-xl">
              어려운 프랑스 산지와 빈티지를 억지로 외우지 마세요. 
              오늘 저녁 먹을 음식만 고르면 어울리는 와인 스타일을 추천하고, 
              재료 장보기와 조리법, 무료 기초 클래스까지 한 번에 이어집니다.
            </p>

            {/* Quick Search Box */}
            <form onSubmit={handleSearch} className="max-w-lg flex gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="오늘 어떤 음식을 드실 건가요? (예: 삼겹살, 파스타, 연어)"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#D6C7B8] rounded-xl text-xs sm:text-sm text-[#2C2420] placeholder-[#A39282] focus:outline-none focus:ring-2 focus:ring-[#722F37]/30 shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer shadow-sm shrink-0"
              >
                페어링 찾기
              </button>
            </form>

            {/* Dual CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('pairing')}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#4A151D] hover:bg-[#381016] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>음식으로 찾기</span>
              </button>
              <button
                onClick={() => setActiveTab('pairing')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#722F37] text-xs sm:text-sm font-semibold rounded-lg border border-[#D6C7B8] shadow-2xs transition-colors cursor-pointer"
              >
                <Wine className="w-4 h-4" />
                <span>와인으로 찾기</span>
              </button>
            </div>
          </div>

          {/* Hero Dining Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#E2D5C5]">
              <img
                src="/src/assets/images/lavinia_hero_table_1790745553919.jpg"
                alt="라비니아 와인과 식탁"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#2C2420]/80 backdrop-blur-md rounded-xl text-white text-xs space-y-0.5">
                <div className="font-semibold font-display">Accord Mets & Vins</div>
                <div className="text-[11px] text-[#E5D8CC]">
                  한식과 프렌치가 자연스럽게 어우러지는 파리지앵 홈 다이닝
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. TODAY'S PAIRING HIGHLIGHT */}
        {todayPairing && (
          <section className="bg-white rounded-2xl border border-[#E2D5C5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#EAE0D4]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#722F37] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 오늘의 추천 페어링 조합
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#38271E] font-display mt-0.5">
                  {todayPairing.dishName} &amp; 버터리한 샤르도네
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('pairing')}
                className="text-xs font-semibold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                전체 10개 조합 탐색하기 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#DECFC0] relative">
                <img
                  src="/src/assets/images/recipe_mushroom_pasta_1790745580309.jpg"
                  alt={todayPairing.dishName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#722F37] text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  오늘의 추천
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-[#8C7A6B] flex items-center gap-2">
                    <span>{todayPairing.dishCategory}</span>
                    <span>·</span>
                    <span>{todayPairing.situation}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2420] font-display">
                    왜 이 조합일까요?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                    {todayPairing.matchReason}
                  </p>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] text-xs text-[#6E5D50] space-y-1">
                  <div className="font-semibold text-[#38271E]">소믈리에의 팁:</div>
                  <p>{todayPairing.sommelierTip}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {todayRecipe && (
                    <button
                      onClick={() => openRecipeDetail(todayRecipe.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>레시피 & 장보기 보기</span>
                    </button>
                  )}
                  {todayPairing.courseId && (
                    <button
                      onClick={() => openCourseDetail(todayPairing.courseId!)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#FAF7F2] text-[#5C4D41] text-xs font-semibold rounded-lg border border-[#DECFC0] transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>페어링 기초 강의 수강</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. WINE STARTER CLASSES SPOTLIGHT */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#E8DFD5]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#722F37] font-semibold">
                WINE EDUCATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#38271E] font-display mt-0.5">
                모니가 전하는 친절한 와인 클래스
              </h2>
              <p className="text-xs text-[#6E5D50] mt-0.5">
                와인 종류, 라벨 읽기, 테이스팅의 5개 기초 강좌를 무료로 시작해 보세요.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('classes')}
              className="text-xs font-semibold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              전체 커리큘럼 보기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#E2D5C5] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#722F37] font-bold">제 {c.orderNumber}강</span>
                    <span className="text-[11px] px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32] rounded font-semibold border border-[#C8E6C9]">
                      무료
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#38271E] font-display">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#5C4D41] line-clamp-2">{c.subtitle}</p>

                  <div className="text-[11px] text-[#8C7A6B] flex items-center gap-2 pt-2 border-t border-[#EAE0D4]">
                    <Clock className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>{c.durationMinutes}분 소요</span>
                    <span>·</span>
                    <span>슬라이드 {c.slideDeck?.length || 0}장</span>
                  </div>
                </div>

                <button
                  onClick={() => openCourseDetail(c.id)}
                  className="w-full py-2 bg-[#FAF7F2] hover:bg-[#F3ECE4] text-[#722F37] border border-[#DECFC0] rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>강의 학습하기</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. RECIPES LIST SPOTLIGHT (10 CANDIDATES) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#E8DFD5]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#722F37] font-semibold">
                RECIPES & SHOPPING
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#38271E] font-display mt-0.5">
                와인과 함께하는 홈 다이닝 레시피 (10종)
              </h2>
              <p className="text-xs text-[#6E5D50] mt-0.5">
                인분 조절 계산과 컬리·쿠팡 재료 연결, 대체 식재료 안내를 제공합니다.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('pairing')}
              className="text-xs font-semibold text-[#722F37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              페어링 필터로 찾기 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {recipes.map((r) => (
              <div
                key={r.id}
                onClick={() => openRecipeDetail(r.id)}
                className="bg-white rounded-xl border border-[#E2D5C5] overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#FAF7F2] overflow-hidden relative">
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 right-1.5 bg-[#2C2420]/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                      {r.prepTimeMinutes + r.cookTimeMinutes}분
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] text-[#8C7A6B]">{r.category}</div>
                    <h3 className="font-bold text-[#38271E] text-xs sm:text-sm font-display truncate">
                      {r.title}
                    </h3>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-1 border-t border-[#EAE0D4] flex items-center justify-between text-[11px] text-[#722F37] font-semibold">
                  <span>레시피 열기</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. KIT SHOWCASE BANNER */}
        <section className="bg-gradient-to-r from-[#4A151D] to-[#722F37] rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-[#E5B5B9] font-medium border border-white/20">
              <Package className="w-3.5 h-3.5" />
              <span>와인데뷔 키트 출시 사전 안내</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
              소믈리에 나이프, 아로마 가이드, 테이스팅 패드를 한 상자에.
            </h2>

            <p className="text-xs sm:text-sm text-[#E5D8CC] leading-relaxed max-w-xl">
              와인 자체를 판매하지 않는 정직한 원칙으로, 입문자가 가장 필요로 하는 도구와 교재, 
              평생 무료 온라인 클래스 혜택을 담았습니다.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('kit')}
                className="px-5 py-3 bg-white hover:bg-[#FAF7F2] text-[#4A151D] text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                키트 상세 구성 & 사전 알림 신청 →
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10">
              <img
                src="/src/assets/images/kit_winedebut_box_1790745566731.jpg"
                alt="와인데뷔 키트"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Render Recipe Modal if opened */}
      {activeRecipe && (
        <RecipeDetailModal
          recipe={activeRecipe}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
};
