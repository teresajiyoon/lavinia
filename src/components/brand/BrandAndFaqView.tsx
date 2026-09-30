import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wine,
  HelpCircle,
  Mail,
  Send,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const BrandAndFaqView: React.FC = () => {
  const { submitInquiry, showToast } = useApp();

  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);

  // Inquiry Form state
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqCategory, setInqCategory] = useState<'키트/도구 문의' | '강의 수강 문의' | '페어링 상담' | '비즈니스/제휴'>('키트/도구 문의');
  const [inqTitle, setInqTitle] = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName || !inqEmail || !inqTitle || !inqMessage) {
      showToast('모든 필수 항목을 입력해 주세요.', 'warning');
      return;
    }

    submitInquiry({
      userName: inqName,
      email: inqEmail,
      category: inqCategory,
      title: inqTitle,
      message: inqMessage,
    });

    setSubmitted(true);
    setInqName('');
    setInqEmail('');
    setInqTitle('');
    setInqMessage('');
  };

  const faqs = [
    {
      q: '와인데뷔 키트에 실제 와인도 포함되어 배송되나요?',
      a: '아닙니다. 대한민국 주류 통신판매 및 청소년 보호법 규정상 온라인을 통한 알코올 와인 판매는 금지되어 있습니다. 라비니아는 와인을 직접 판매하지 않으며, 와인을 즐기기 위한 필수 도구(소믈리에 오프너, 진공 스토퍼 등)와 아로마 가이드, 테이스팅 노트, 온라인 강의 수강권으로 구성된 입문 교육 패키지입니다.',
    },
    {
      q: '와인을 전혀 모르는 초보자도 바로 따라 할 수 있나요?',
      a: '네, 라비니아는 복잡한 품종 이름이나 프랑스어 발음을 외우지 않아도 오늘 저녁 메뉴(파스타, 삼겹살, 불고기 등)를 검색하면 어울리는 와인의 스타일과 맛의 이유를 직관적으로 알려드립니다. 무료 기초 강의를 통해 5분 만에 색과 라벨의 비밀도 쉽게 이해하실 수 있습니다.',
    },
    {
      q: '네이버 스마트스토어에서 키트를 구매한 뒤 강의는 어떻게 수강하나요?',
      a: '스마트스토어에서 와인데뷔 키트를 구매하신 후, 앱의 [키트 상세] 화면에서 [구매 인증 신청]을 눌러 주문번호와 구매자 성함을 입력해 주세요. 운영자가 실제 주문 내역을 대조 확인 후 평생 무료 수강 권한을 회원 계정에 승인해 드립니다.',
    },
    {
      q: '강의에 실제 비디오 영상이 포함되어 있나요?',
      a: '현재 첫 버전에서는 전문 슬라이드 원고, 대본, 핵심 요약, 3문항 퀴즈와 홈 실습 가이드를 통해 읽기·슬라이드형으로 완벽히 학습하실 수 있습니다. 고화질 영상 콘텐츠는 전문 촬영 및 편집 공정에 따라 순차적으로 업데이트될 예정이며, 라비니아는 제작되지 않은 가짜 동영상 화면을 제공하지 않습니다.',
    },
    {
      q: '식재료 장보기의 마켓컬리와 쿠팡 링크는 어떻게 운영되나요?',
      a: '마켓컬리는 회원의 편의를 돕기 위한 일반 상품 검색 연결이며 별도 수수료 제휴가 발생하지 않습니다. 쿠팡 파트너스는 공정거래위원회 지침에 따라 제휴 여부와 경제적 이해관계 안내 문구를 명확히 고지하고 있습니다.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Brand Story Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#722F37]">
            <Sparkles className="w-3.5 h-3.5" /> 식탁 위의 프렌치 라이프스타일
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#38271E] font-display">
            라비니아 (LAVINIA) 브랜드 이야기
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5D50] leading-relaxed max-w-2xl">
            라비니아는 와인이 어렵고 격식 차려야만 마시는 술이 아니라, 
            오늘 저녁 사랑하는 사람과 나누는 식탁을 가장 향기롭게 만들어주는 일상의 친구가 되기를 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D5C5] shadow-xs">
          <div className="space-y-3.5 text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
            <h3 className="text-base font-bold text-[#38271E] font-display">
              프랑스 현지의 삶을 한국의 식탁으로
            </h3>
            <p>
              파리의 소박한 비스트로와 가정집 식탁에서는 어려운 품종 이야기를 길게 하지 않습니다. 
              ‘오늘 구운 닭고기에는 산뜻한 화이트 한 잔’, ‘남은 치즈와 바게트에는 부드러운 레드 한 모금’처럼 
              자연스러운 조화가 있을 뿐입니다.
            </p>
            <p>
              라비니아는 프랑스 생활과 전문 소믈리에 교육 경험을 바탕으로, 
              삼겹살, 불고기, 김치전 같은 한국인의 친숙한 밥상에도 찰떡같이 맞아떨어지는 
              진솔하고 정직한 페어링을 제안합니다.
            </p>
            <div className="pt-2 text-xs text-[#8C7A6B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#722F37]" />
              <span>확인된 전문 경험과 실제 식문화 연구만을 기반으로 콘텐츠를 제공합니다.</span>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#DECFC0] space-y-3 text-xs">
            <h4 className="font-bold text-[#38271E] text-xs uppercase tracking-wider">
              라비니아 운영 및 문의처 안내
            </h4>
            <div className="space-y-1.5 text-[#5C4D41]">
              <div><strong>브랜드명</strong>: 라비니아 (LAVINIA)</div>
              <div><strong>대표 상품</strong>: 와인데뷔 (Wine Debut) 스타터키트</div>
              <div><strong>공식 판매처</strong>: 네이버 스마트스토어 (라비니아 공식)</div>
              <div><strong>고객 문의</strong>: contact@lavinia-wine.kr</div>
              <div><strong>운영 시간</strong>: 평일 10:00 ~ 17:00 (주말·공휴일 제외)</div>
            </div>
            <p className="text-[11px] text-[#8C7A6B] pt-2 border-t border-[#EAE0D4]">
              ※ 라비니아는 고객의 신뢰를 위해 허위 매출, 과장된 자격증, 미검증 후기를 일절 작성하지 않습니다.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#722F37]" />
          <h2 className="text-xl font-bold text-[#38271E] font-display">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E2D5C5] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#38271E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-[#722F37] font-mono">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#8C7A6B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C7A6B] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 pb-4 text-xs sm:text-sm text-[#5C4D41] leading-relaxed bg-[#FAF7F2] border-t border-[#EAE0D4]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 1:1 Inquiry Form */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D5C5] shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#722F37] uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5" /> 1:1 고객 문의
          </div>
          <h2 className="text-xl font-bold text-[#38271E] font-display">
            라비니아 팀에 문의 남기기
          </h2>
          <p className="text-xs text-[#6E5D50] mt-1">
            키트 구성, 강의 수강, 제휴 협업 등 궁금하신 점을 남겨주시면 담당자가 검토 후 답변드립니다.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#FAF7F2] rounded-xl border border-[#C8E6C9] text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-[#2E7D32] mx-auto" />
            <h3 className="font-bold text-sm text-[#1B5E20]">문의가 성공적으로 접수되었습니다.</h3>
            <p className="text-xs text-[#5C4D41]">
              등록하신 이메일로 영업일 기준 1~2일 내에 정성껏 답변을 보내드리겠습니다.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-3 px-4 py-1.5 text-xs bg-white text-[#722F37] border border-[#DECFC0] rounded-md hover:bg-[#FAF7F2] cursor-pointer"
            >
              새로운 문의 작성하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#38271E] mb-1">성함 / 닉네임 *</label>
                <input
                  type="text"
                  required
                  value={inqName}
                  onChange={(e) => setInqName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">답변받으실 이메일 *</label>
                <input
                  type="email"
                  required
                  value={inqEmail}
                  onChange={(e) => setInqEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">문의 분류</label>
                <select
                  value={inqCategory}
                  onChange={(e) => setInqCategory(e.target.value as any)}
                  className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none cursor-pointer"
                >
                  <option value="키트/도구 문의">키트/도구 문의</option>
                  <option value="강의 수강 문의">강의 수강 문의</option>
                  <option value="페어링 상담">페어링 상담</option>
                  <option value="비즈니스/제휴">비즈니스/제휴</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#38271E] mb-1">제목 *</label>
              <input
                type="text"
                required
                value={inqTitle}
                onChange={(e) => setInqTitle(e.target.value)}
                placeholder="문의 제목을 입력해 주세요"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#38271E] mb-1">문의 내용 *</label>
              <textarea
                rows={4}
                required
                value={inqMessage}
                onChange={(e) => setInqMessage(e.target.value)}
                placeholder="궁금하신 내용을 자세하게 남겨주시면 보다 정확하고 빠른 답변이 가능합니다."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>문의 보내기</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
