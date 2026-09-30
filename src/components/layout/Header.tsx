import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Wine, Search, Bookmark, BookOpen, Package, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, isAdminMode, setIsAdminMode, user, setSelectedRecipeId, setSelectedCourseId } = useApp();

  const handleNav = (tab: ActiveTab) => {
    setSelectedRecipeId(null);
    setSelectedCourseId(null);
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('home')}
            className="group text-left flex items-baseline gap-2 cursor-pointer focus-visible:outline-none"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-[#4A151D] group-hover:text-[#722F37] transition-colors">
              LAVINIA
            </span>
            <span className="text-xs tracking-widest text-[#8C7A6B] font-medium hidden sm:inline">
              라비니아
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'home' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            홈
          </button>
          <button
            onClick={() => handleNav('pairing')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'pairing' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            페어링 & 레시피
          </button>
          <button
            onClick={() => handleNav('classes')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'classes' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            와인 클래스
          </button>
          <button
            onClick={() => handleNav('kit')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'kit' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            와인데뷔 키트
          </button>
          <button
            onClick={() => handleNav('my-records')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'my-records' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            내 기록
          </button>
          <button
            onClick={() => handleNav('about-faq')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'about-faq' && !isAdminMode
                ? 'text-[#722F37] font-semibold border-b-2 border-[#722F37]'
                : 'text-[#5C4F44] hover:text-[#2C2420]'
            }`}
          >
            브랜드 & FAQ
          </button>
        </nav>

        {/* Zone 3: Actions (Admin Mode Toggle & User Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              const nextMode = !isAdminMode;
              setIsAdminMode(nextMode);
              if (nextMode) {
                setActiveTab('admin');
              } else if (activeTab === 'admin') {
                setActiveTab('home');
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
              isAdminMode
                ? 'bg-[#722F37] text-white border-[#722F37] shadow-sm ring-2 ring-[#722F37]/30'
                : 'bg-white text-[#722F37] border-[#D6C7B8] hover:bg-[#F4ECE2]'
            }`}
            title="콘텐츠 및 주문 인증을 관리하는 독립 관리자 모드"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAdminMode ? '관리자 모드 실행 중' : '관리자 모드'}
            </span>
            <span className="sm:hidden">관리자</span>
          </button>

          {user.isLoggedIn ? (
            <button
              onClick={() => handleNav('my-records')}
              className="flex items-center gap-1.5 text-xs font-medium text-[#4A3B32] hover:text-[#722F37] bg-white/80 border border-[#E0D5C7] rounded-md px-2.5 py-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#722F37]" />
              <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => handleNav('my-records')}
              className="text-xs font-medium text-[#722F37] hover:underline cursor-pointer"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
