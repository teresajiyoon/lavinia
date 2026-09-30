import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TastingNote } from '../../types';
import { RecipeDetailModal } from '../recipe/RecipeDetailModal';
import {
  Bookmark,
  BookOpen,
  Wine,
  Plus,
  Trash2,
  Sparkles,
  Utensils,
  Star,
  User,
  LogOut,
  LogIn,
} from 'lucide-react';

export const MyRecordsView: React.FC = () => {
  const {
    user,
    loginUser,
    logoutUser,
    recipes,
    pairings,
    courses,
    wineStyles,
    addTastingNote,
    deleteTastingNote,
    openRecipeDetail,
    openCourseDetail,
    selectedRecipeId,
    setSelectedRecipeId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'notes' | 'recipes' | 'pairings' | 'courses'>('notes');
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // New Note Form State
  const [noteWineName, setNoteWineName] = useState('');
  const [noteType, setNoteType] = useState<TastingNote['type']>('레드');
  const [noteVintage, setNoteVintage] = useState('');
  const [noteGrape, setNoteGrape] = useState('');
  const [noteAcidity, setNoteAcidity] = useState(3);
  const [noteTannin, setNoteTannin] = useState(3);
  const [noteBody, setNoteBody] = useState(3);
  const [noteSweetness, setNoteSweetness] = useState(1);
  const [noteRating, setNoteRating] = useState(4);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [notePairedFood, setNotePairedFood] = useState('');
  const [noteMemo, setNoteMemo] = useState('');

  // Login form for simulation
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');

  const commonAromas = [
    '체리·딸기',
    '블랙베리',
    '풋사과·라임',
    '복숭아·모과',
    '바닐라·버터',
    '오크·삼나무',
    '허브·풀내음',
    '부싯돌·미네랄',
    '버섯·낙엽',
    '후추·향신료',
    '구운 빵·효모',
    '꿀·말린 과일',
  ];

  const toggleAroma = (aroma: string) => {
    setSelectedAromas((prev) =>
      prev.includes(aroma) ? prev.filter((a) => a !== aroma) : [...prev, aroma]
    );
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteWineName) return;

    addTastingNote({
      wineName: noteWineName,
      type: noteType,
      vintage: noteVintage || undefined,
      grapeVariety: noteGrape || undefined,
      date: new Date().toISOString().split('T')[0],
      acidity: noteAcidity,
      tannin: noteTannin,
      body: noteBody,
      sweetness: noteSweetness,
      rating: noteRating,
      aromas: selectedAromas,
      pairedFood: notePairedFood,
      memo: noteMemo,
    });

    setIsAddNoteOpen(false);
    setNoteWineName('');
    setNoteVintage('');
    setNoteGrape('');
    setSelectedAromas([]);
    setNotePairedFood('');
    setNoteMemo('');
  };

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName) return;
    loginUser(loginName, loginEmail || 'user@example.com');
  };

  const savedRecipesList = recipes.filter((r) => user.savedRecipeIds.includes(r.id));
  const savedPairingsList = pairings.filter((p) => user.savedPairingIds.includes(p.id));
  const activeRecipe = recipes.find((r) => r.id === selectedRecipeId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#E2D5C5] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#DECFC0] flex items-center justify-center text-[#722F37]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#38271E] font-display">
                {user.isLoggedIn ? `${user.name}님의 와인 기록` : '게스트 모드 (비회원)'}
              </h1>
              {user.isLoggedIn && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#722F37] border border-[#DECFC0] font-semibold">
                  회원
                </span>
              )}
            </div>
            <p className="text-xs text-[#8C7A6B] mt-0.5">
              {user.isLoggedIn
                ? user.email
                : '비회원은 기본 탐색이 가능하며, 저장과 와인노트는 로그인 후 안전하게 보관됩니다.'}
            </p>
          </div>
        </div>

        <div>
          {user.isLoggedIn ? (
            <button
              onClick={logoutUser}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6E5D50] hover:text-[#722F37] rounded-md border border-[#DECFC0] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> 로그아웃
            </button>
          ) : (
            <form onSubmit={handleSimulatedLogin} className="flex items-center gap-2">
              <input
                type="text"
                required
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="이름 입력"
                className="px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#722F37] text-white rounded-md hover:bg-[#5C232B] transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" /> 간편 시작
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DECFC0] text-xs sm:text-sm overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'notes'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <Wine className="w-4 h-4" />
          <span>나의 와인노트 ({user.tastingNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'recipes'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>보관한 레시피 ({savedRecipesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pairings')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'pairings'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>저장한 페어링 ({savedPairingsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'courses'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>수강 중인 클래스 ({user.completedCourseIds.length}개 완료)</span>
        </button>
      </div>

      {/* Tab Panels */}
      {/* 1. Tasting Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6E5D50]">
              직접 마신 와인의 색, 산미, 타닌, 향과 함께 먹은 음식을 기록해 나만의 취향 지도를 완성하세요.
            </p>
            <button
              onClick={() => setIsAddNoteOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>새 와인노트 작성</span>
            </button>
          </div>

          {user.tastingNotes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#E2D5C5] space-y-3">
              <Wine className="w-8 h-8 text-[#A39282] mx-auto" />
              <h3 className="text-sm font-semibold text-[#38271E]">
                아직 기록된 와인노트가 없습니다.
              </h3>
              <p className="text-xs text-[#8C7A6B]">
                오늘 저녁 마신 와인의 느낌을 첫 노트로 남겨보세요.
              </p>
              <button
                onClick={() => setIsAddNoteOpen(true)}
                className="px-4 py-2 text-xs bg-[#722F37] text-white rounded-md hover:bg-[#5C232B] transition-colors cursor-pointer"
              >
                첫 와인 기록하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {user.tastingNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-xl border border-[#E2D5C5] p-5 shadow-xs space-y-4 hover:border-[#DECFC0] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
                        <span className="font-semibold text-[#722F37]">{note.type}</span>
                        <span>·</span>
                        <span>{note.date}</span>
                        {note.vintage && <span>· {note.vintage}</span>}
                      </div>
                      <h3 className="text-base font-bold text-[#38271E] font-display mt-0.5">
                        {note.wineName}
                      </h3>
                      {note.grapeVariety && (
                        <p className="text-xs text-[#8C7A6B]">{note.grapeVariety}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < note.rating
                              ? 'fill-[#D4A373] text-[#D4A373]'
                              : 'text-[#DECFC0]'
                          }`}
                        />
                      ))}
                      <button
                        onClick={() => deleteTastingNote(note.id)}
                        className="ml-2 text-[#A39282] hover:text-[#C62828] p-1 cursor-pointer"
                        title="노트 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Flavor Metrics */}
                  <div className="grid grid-cols-4 gap-2 p-2.5 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] text-center text-xs">
                    <div>
                      <div className="text-[10px] text-[#8C7A6B]">산미</div>
                      <div className="font-bold text-[#722F37] font-mono">{note.acidity} / 5</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C7A6B]">타닌</div>
                      <div className="font-bold text-[#722F37] font-mono">{note.tannin} / 5</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C7A6B]">바디</div>
                      <div className="font-bold text-[#722F37] font-mono">{note.body} / 5</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8C7A6B]">당도</div>
                      <div className="font-bold text-[#722F37] font-mono">{note.sweetness} / 5</div>
                    </div>
                  </div>

                  {/* Aromas & Food */}
                  {note.aromas && note.aromas.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {note.aromas.map((ar, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#F3EDE4] text-[#5C4D41] border border-[#E0D5C7]"
                        >
                          {ar}
                        </span>
                      ))}
                    </div>
                  )}

                  {note.pairedFood && (
                    <div className="text-xs text-[#5C4D41] flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-[#722F37]" />
                      <span>함께한 요리: <strong>{note.pairedFood}</strong></span>
                    </div>
                  )}

                  {note.memo && (
                    <p className="text-xs text-[#4A3B32] bg-[#FDFBF7] p-3 rounded-lg border border-[#EAE0D4] leading-relaxed">
                      {note.memo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Saved Recipes */}
      {activeTab === 'recipes' && (
        <div className="space-y-4">
          {savedRecipesList.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#E2D5C5] text-xs text-[#8C7A6B]">
              보관한 레시피가 없습니다. 페어링 메뉴에서 마음에 드는 요리를 북마크해 보세요.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedRecipesList.map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-xl border border-[#E2D5C5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-[#FAF7F2] overflow-hidden relative">
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[11px] text-[#722F37] font-semibold px-2 py-0.5 rounded">
                      {r.difficulty}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-[#38271E] text-sm sm:text-base font-display">
                      {r.title}
                    </h3>
                    <p className="text-xs text-[#6E5D50] line-clamp-2">{r.description}</p>
                    <div className="pt-2">
                      <button
                        onClick={() => openRecipeDetail(r.id)}
                        className="w-full py-2 bg-[#FAF7F2] hover:bg-[#F3ECE4] text-[#722F37] border border-[#DECFC0] rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        레시피 보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Saved Pairings */}
      {activeTab === 'pairings' && (
        <div className="space-y-4">
          {savedPairingsList.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#E2D5C5] text-xs text-[#8C7A6B]">
              저장한 페어링 조합이 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedPairingsList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-xl border border-[#E2D5C5] space-y-2 shadow-xs"
                >
                  <h3 className="font-bold text-[#38271E] font-display text-base">
                    {p.dishName}
                  </h3>
                  <p className="text-xs text-[#5C4D41] leading-relaxed">{p.matchReason}</p>
                  <div className="text-[11px] text-[#8C7A6B]">
                    대안: {p.alternativeChoice}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.slice(0, 5).map((c) => {
              const isDone = user.completedCourseIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-xl border border-[#E2D5C5] flex items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <span className="text-[11px] font-mono text-[#722F37] font-semibold">
                      제 {c.orderNumber}강
                    </span>
                    <h3 className="text-sm font-bold text-[#38271E] font-display mt-0.5">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#8C7A6B]">{c.subtitle}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isDone
                          ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                          : 'bg-[#FAF7F2] text-[#8C7A6B] border border-[#DECFC0]'
                      }`}
                    >
                      {isDone ? '수강 완료' : '학습 가능'}
                    </span>
                    <button
                      onClick={() => openCourseDetail(c.id)}
                      className="text-xs text-[#722F37] font-semibold hover:underline cursor-pointer"
                    >
                      강의실 열기 →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Tasting Note Modal */}
      {isAddNoteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAddNoteOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 border border-[#DECFC0] shadow-2xl my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D4]">
              <h3 className="text-base font-bold text-[#38271E] font-display flex items-center gap-1.5">
                <Wine className="w-4 h-4 text-[#722F37]" />
                새 와인 테이스팅 노트 작성
              </h3>
              <button
                onClick={() => setIsAddNoteOpen(false)}
                className="text-[#8C7A6B] hover:text-[#2C2420] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-[#38271E] mb-1">와인 이름 *</label>
                  <input
                    type="text"
                    required
                    value={noteWineName}
                    onChange={(e) => setNoteWineName(e.target.value)}
                    placeholder="예: 샤블리 장 마크 브로카르"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#38271E] mb-1">와인 종류</label>
                  <select
                    value={noteType}
                    onChange={(e) => setNoteType(e.target.value as TastingNote['type'])}
                    className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none cursor-pointer"
                  >
                    <option value="레드">레드</option>
                    <option value="화이트">화이트</option>
                    <option value="로제">로제</option>
                    <option value="스파클링">스파클링</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#38271E] mb-1">빈티지 (수확년도)</label>
                  <input
                    type="text"
                    value={noteVintage}
                    onChange={(e) => setNoteVintage(e.target.value)}
                    placeholder="예: 2021 또는 NV"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                  />
                </div>
              </div>

              {/* 4 Flavor Sliders */}
              <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#DECFC0] space-y-3">
                <div className="font-semibold text-[#38271E] text-xs">맛의 4대 요소 체크 (1~5점)</div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>산미 (침샘 자극)</span>
                      <span className="font-mono font-bold text-[#722F37]">{noteAcidity}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={noteAcidity}
                      onChange={(e) => setNoteAcidity(Number(e.target.value))}
                      className="w-full accent-[#722F37] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>타닌 (떫은맛)</span>
                      <span className="font-mono font-bold text-[#722F37]">{noteTannin}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={noteTannin}
                      onChange={(e) => setNoteTannin(Number(e.target.value))}
                      className="w-full accent-[#722F37] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>바디 (무게감)</span>
                      <span className="font-mono font-bold text-[#722F37]">{noteBody}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={noteBody}
                      onChange={(e) => setNoteBody(Number(e.target.value))}
                      className="w-full accent-[#722F37] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>당도 (단맛)</span>
                      <span className="font-mono font-bold text-[#722F37]">{noteSweetness}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={noteSweetness}
                      onChange={(e) => setNoteSweetness(Number(e.target.value))}
                      className="w-full accent-[#722F37] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Aroma Selector */}
              <div>
                <label className="block font-semibold text-[#38271E] mb-1.5">
                  느껴진 대표 아로마 키워드 (다중 선택)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {commonAromas.map((ar) => {
                    const isChecked = selectedAromas.includes(ar);
                    return (
                      <button
                        type="button"
                        key={ar}
                        onClick={() => toggleAroma(ar)}
                        className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                          isChecked
                            ? 'bg-[#722F37] text-white border-[#722F37]'
                            : 'bg-white text-[#5C4D41] border-[#DECFC0] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {ar}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">함께 곁들인 요리</label>
                <input
                  type="text"
                  value={notePairedFood}
                  onChange={(e) => setNotePairedFood(e.target.value)}
                  placeholder="예: 버섯 크림 파스타"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">한 줄 테이스팅 감상</label>
                <textarea
                  rows={2}
                  value={noteMemo}
                  onChange={(e) => setNoteMemo(e.target.value)}
                  placeholder="맛의 첫인상, 다음에도 사고 싶은지 솔직한 감상을 적어보세요."
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(false)}
                  className="px-3.5 py-2 text-xs text-[#6E5D50] hover:bg-[#FAF7F2] rounded-md border border-[#DECFC0] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#722F37] hover:bg-[#5C232B] text-white rounded-md transition-colors cursor-pointer"
                >
                  와인노트 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Render Recipe Modal if needed */}
      {activeRecipe && (
        <RecipeDetailModal
          recipe={activeRecipe}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </div>
  );
};
