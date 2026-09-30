import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { Home, Sparkles, BookOpen, Package, BookMarked } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, isAdminMode, setSelectedRecipeId, setSelectedCourseId } = useApp();

  const handleTabClick = (tab: ActiveTab) => {
    setSelectedRecipeId(null);
    setSelectedCourseId(null);
    setActiveTab(tab);
  };

  if (isAdminMode) {
    return null; // Admin dashboard has its own responsive sidebar/tabs
  }

  const items: { tab: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'home', label: '홈', icon: Home },
    { tab: 'pairing', label: '페어링', icon: Sparkles },
    { tab: 'classes', label: '클래스', icon: BookOpen },
    { tab: 'kit', label: '키트', icon: Package },
    { tab: 'my-records', label: '내 기록', icon: BookMarked },
  ];

  return (
    <nav
      aria-label="모바일 하단 메뉴"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E5DACD] h-14 px-2 flex items-center justify-around shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => handleTabClick(item.tab)}
            className={`flex flex-col items-center justify-center w-full py-1 text-xs transition-colors cursor-pointer ${
              isActive ? 'text-[#722F37] font-semibold' : 'text-[#8C7A6B] hover:text-[#4A3B32]'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            <span className="text-[11px] leading-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
