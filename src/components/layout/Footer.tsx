import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wine, Info, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { adminSettings, setActiveTab } = useApp();

  return (
    <footer className="bg-[#F3EDE4] border-t border-[#E2D5C5] text-[#6E5D50] text-xs pt-10 pb-20 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Purpose Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#E2D5C5]/70">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-[#4A151D] tracking-tight">
                LAVINIA 라비니아
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#722F37] border border-[#D9CAB8]">
                와인데뷔 & 라이프스타일
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#5C4D41] max-w-lg">
              라비니아는 와인 입문 스타터키트 <strong>와인데뷔</strong>와 함께 일상의 식탁에서 어울리는 와인을 쉽게 배우고, 
              재료 장보기와 조리까지 자연스럽게 이어가는 와인 라이프스타일 서비스입니다. 프랑스 현지 식문화와 와인 교육 경험을 
              한국의 정겨운 식탁과 연결합니다.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <button
                onClick={() => setActiveTab('about-faq')}
                className="text-[#722F37] font-medium hover:underline cursor-pointer"
              >
                브랜드 스토리 & 자주 묻는 질문(FAQ)
              </button>
              <span className="text-[#C2B2A2]">·</span>
              <button
                onClick={() => setActiveTab('kit')}
                className="text-[#722F37] font-medium hover:underline cursor-pointer"
              >
                와인데뷔 키트 안내
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#382D26] mb-3 text-xs uppercase tracking-wider">
              쇼핑 & 제휴 투명성 안내
            </h4>
            <ul className="space-y-2 text-[11px] leading-normal text-[#6E5D50]">
              <li className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0 mt-0.5" />
                <span>
                  <strong>마켓컬리</strong>: 편의를 위한 일반 구매 링크이며 별도 제휴 수수료가 발생하지 않습니다.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0 mt-0.5" />
                <span>
                  <strong>쿠팡 파트너스</strong>: {adminSettings.coupangDisclosureNote}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#382D26] mb-3 text-xs uppercase tracking-wider">
              주류 판매 및 전자상거래 준수
            </h4>
            <div className="text-[11px] leading-relaxed text-[#6E5D50] space-y-2">
              <p className="flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#722F37] shrink-0 mt-0.5" />
                <span>
                  국내 주류 통신판매 규정 및 청소년 보호법에 따라 라비니아 웹앱 및 키트에는 <strong>실제 알코올 와인이 포함되어 있지 않으며</strong> 와인 자체를 판매하지 않습니다.
                </span>
              </p>
              <p>
                키트 구매는 공식 <strong>네이버 스마트스토어</strong>를 통해 안전하게 진행됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Operational Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A6B] gap-4">
          <p>© {new Date().getFullYear()} LAVINIA (라비니아). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>스마트스토어 연동 지원</span>
            <span>·</span>
            <span>소믈리에 검토 데이터 기반</span>
            <span>·</span>
            <span>반응형 웹앱 v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
