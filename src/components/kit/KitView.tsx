import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  CheckCircle,
  ExternalLink,
  Bell,
  ShieldAlert,
  Sparkles,
  Info,
  Gift,
  FileCheck2,
} from 'lucide-react';

export const KitView: React.FC = () => {
  const {
    kitProduct,
    updateKitProduct,
    submitPurchaseClaim,
    adminSettings,
    setActiveTab,
    showToast,
    logEvent,
  } = useApp();

  const [notificationEmail, setNotificationEmail] = useState('');
  const [notificationSubmitted, setNotificationSubmitted] = useState(false);

  // Purchase claim modal state
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimUserName, setClaimUserName] = useState('');
  const [claimPhoneLast4, setClaimPhoneLast4] = useState('');
  const [claimOrderNumber, setClaimOrderNumber] = useState('');

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationEmail || !notificationEmail.includes('@')) {
      showToast('올바른 이메일 주소를 입력해 주세요.', 'warning');
      return;
    }
    updateKitProduct({
      ...kitProduct,
      preorderCount: kitProduct.preorderCount + 1,
    });
    setNotificationSubmitted(true);
    showToast('와인데뷔 키트 출시 알림 신청이 완료되었습니다!', 'success');
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimUserName || !claimOrderNumber) {
      showToast('주문자 성함과 스마트스토어 주문번호를 입력해 주세요.', 'warning');
      return;
    }

    submitPurchaseClaim({
      userName: claimUserName,
      userPhoneLast4: claimPhoneLast4 || '0000',
      orderNumber: claimOrderNumber,
      storeName: '라비니아 네이버 스마트스토어',
      productType: '와인데뷔 키트',
    });

    setIsClaimModalOpen(false);
    setClaimUserName('');
    setClaimPhoneLast4('');
    setClaimOrderNumber('');
  };

  const handleSmartStoreClick = () => {
    logEvent('checkout_click', {
      product: 'winedebut_kit',
      platform: 'naver_smartstore',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8DFD5]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#722F37] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 라비니아 시그니처 스타터키트
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#38271E] font-display">
            {kitProduct.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5D50] mt-1 max-w-2xl">
            {kitProduct.subheading}
          </p>
        </div>

        {/* Claim Button */}
        <button
          onClick={() => setIsClaimModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#722F37] bg-white border border-[#D6C7B8] hover:bg-[#FAF7F2] rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>이미 구매하셨나요? [구매 인증 신청]</span>
        </button>
      </div>

      {/* Main Product Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Kit Image */}
        <div className="lg:col-span-6 space-y-3">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#E2D5C5] border border-[#DCCEC0] shadow-sm relative">
            <img
              src={kitProduct.imageUrl}
              alt="와인데뷔 스타터키트"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute top-3 left-3 bg-[#4A151D]/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
              {kitProduct.status}
            </div>
          </div>

          <div className="p-3 bg-[#FFF8EE] rounded-lg border border-[#F3DFC1] text-[11px] text-[#8A5012] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B86500] shrink-0 mt-0.5" />
            <div>
              <strong>주류 온라인 판매 준수 안내</strong>:
              대한민국 주류 전자상거래 규정상 키트 내에 <strong>알코올 와인은 포함되지 않습니다</strong>. 
              검증된 도구와 아로마 가이드, 테이스팅 노트 및 온라인 클래스 평생 수강 혜택으로 구성됩니다.
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Purchase Call to Action */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D5C5] shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="text-xs text-[#8C7A6B] flex items-center justify-between">
              <span>상품 분류: 와인 입문 도구 & 교육 패키지</span>
              <span className="font-mono">네이버 상품코드: {kitProduct.naverProductNumber}</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#722F37] font-mono">
                {kitProduct.proposedPrice.toLocaleString()}원
              </span>
              <span className="text-xs text-[#8C7A6B]">
                (운영자 검토용 제안가 / 출시 시 확정 예정)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed pt-2">
              {kitProduct.description}
            </p>
          </div>

          {/* Included Course Benefits */}
          <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#722F37] flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" /> 키트 구매 시 주어지는 특별 혜택
            </h4>
            <ul className="space-y-1.5 text-xs text-[#4A3B32]">
              {kitProduct.includedCourseBenefits.map((bnf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <span>{bnf}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions: SmartStore Link vs Launch Notification */}
          <div className="space-y-4 pt-2 border-t border-[#EAE0D4]">
            {kitProduct.smartStoreUrl ? (
              <a
                href={kitProduct.smartStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSmartStoreClick}
                className="w-full py-3.5 px-4 bg-[#03C75A] hover:bg-[#02B150] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>네이버 스마트스토어에서 구매하기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="p-3 text-center text-xs text-[#8C7A6B] bg-[#FAF7F2] rounded-lg border border-[#DECFC0]">
                스마트스토어 상품 등록 준비 중입니다.
              </div>
            )}

            {/* Launch Notification Signup Form */}
            <div className="p-4 bg-[#F8F4ED] rounded-xl border border-[#DECFC0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#38271E] flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-[#722F37]" /> 출시 알림 신청
                </span>
                <span className="text-[11px] text-[#722F37] font-semibold">
                  현재 {kitProduct.preorderCount}명이 대기 중
                </span>
              </div>

              {notificationSubmitted ? (
                <div className="p-2.5 bg-white text-[#2E7D32] text-xs rounded-md border border-[#C8E6C9] flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>알림 신청이 접수되었습니다. 정식 런칭 시 메일로 알려드립니다.</span>
                </div>
              ) : (
                <form onSubmit={handleNotificationSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="알림받으실 이메일을 입력해 주세요"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#D8C9B9] rounded-lg text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    알림받기
                  </button>
                </form>
              )}
            </div>

            <p className="text-[11px] text-[#8C7A6B] leading-relaxed">
              {kitProduct.shippingNotice}
            </p>
          </div>
        </div>
      </div>

      {/* Kit Detailed Components Grid */}
      <div className="space-y-4 pt-6 border-t border-[#E8DFD5]">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#722F37]" />
          <h2 className="text-xl font-bold text-[#38271E] font-display">
            와인데뷔 키트 상세 구성품 안내
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kitProduct.components.map((comp, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-[#E2D5C5] shadow-2xs space-y-2 hover:border-[#722F37]/40 transition-colors"
            >
              <div className="text-xs font-bold text-[#722F37]">0{idx + 1}</div>
              <h3 className="text-sm font-bold text-[#2C2420] font-display">
                {comp.title}
              </h3>
              <div className="text-[11px] text-[#8C7A6B] font-mono">{comp.spec}</div>
              <p className="text-xs text-[#5C4D41] leading-relaxed pt-1 border-t border-[#EAE0D4]">
                {comp.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Claim Modal */}
      {isClaimModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsClaimModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 border border-[#DECFC0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE0D4]">
              <h3 className="text-base font-bold text-[#38271E] flex items-center gap-1.5 font-display">
                <FileCheck2 className="w-4 h-4 text-[#722F37]" />
                스마트스토어 구매 인증 신청
              </h3>
              <button
                onClick={() => setIsClaimModalOpen(false)}
                className="text-[#8C7A6B] hover:text-[#2C2420] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#6E5D50] leading-relaxed">
              네이버 스마트스토어에서 와인데뷔 키트를 구매하신 경우, 주문번호와 구매자 정보를 입력해 주시면 
              <strong> 운영자 주문 대조 및 검토 후 포함 강의 무료 수강 권한</strong>을 계정에 반영해 드립니다.
            </p>

            <form onSubmit={handleClaimSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  구매자 성함 (네이버 주문 시 입력한 실명)
                </label>
                <input
                  type="text"
                  required
                  value={claimUserName}
                  onChange={(e) => setClaimUserName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  연락처 뒷자리 (4자리)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={claimPhoneLast4}
                  onChange={(e) => setClaimPhoneLast4(e.target.value)}
                  placeholder="예: 1234"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#38271E] mb-1">
                  네이버 스마트스토어 주문번호
                </label>
                <input
                  type="text"
                  required
                  value={claimOrderNumber}
                  onChange={(e) => setClaimOrderNumber(e.target.value)}
                  placeholder="예: 20260930-0012345"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DECFC0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
                <span className="text-[10px] text-[#A39282] mt-0.5 block">
                  ※ 네이버 쇼핑 [주문/배송조회] 상세 내역에서 확인하실 수 있습니다.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-3.5 py-2 text-xs text-[#6E5D50] hover:bg-[#FAF7F2] rounded-md border border-[#DECFC0] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#722F37] hover:bg-[#5C232B] text-white rounded-md transition-colors cursor-pointer"
                >
                  구매 인증 신청 접수
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
