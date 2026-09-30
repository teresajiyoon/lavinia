import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import { ClassPlayer } from './ClassPlayer';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Sparkles,
  Lock,
  ArrowRight,
  Info,
  Sliders,
} from 'lucide-react';

export const ClassView: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    setSelectedCourseId,
    user,
    setActiveTab,
    logEvent,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const categories = [
    { id: 'all', label: '전체 강좌' },
    { id: '기초', label: '기초 입문 (5강)' },
    { id: '프랑스 산지', label: '프랑스 산지' },
    { id: '음식 페어링', label: '음식 페어링' },
    { id: '실습', label: '도구 & 실습' },
  ];

  const filteredCourses = courses.filter((c) => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  const handleCourseClick = (course: Course) => {
    if (!course.isFree && !user.entitledCourseIds.includes(course.id)) {
      // In first version, show honest notice & guide to kit or review
      logEvent('course_preview', { courseId: course.id, isFree: false });
    }
    setSelectedCourseId(course.id);
  };

  if (selectedCourse) {
    return (
      <ClassPlayer
        course={selectedCourse}
        onBack={() => setSelectedCourseId(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E8DFD5]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#722F37] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 식탁에서 바로 써먹는
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#38271E] font-display">
            라비니아 와인 클래스
          </h1>
          <p className="text-xs sm:text-sm text-[#6E5D50] mt-1 max-w-2xl">
            어려운 라틴어와 암기 대신, 오늘 식탁에서 바로 써먹는 실전 입문 과정입니다. 
            모니의 기획·원고를 운영자가 엄선 검토하여 업데이트합니다.
          </p>
        </div>

        {/* Banner to Kit */}
        <button
          onClick={() => setActiveTab('kit')}
          className="self-start md:self-auto text-xs px-3.5 py-2 bg-[#F3EDE4] hover:bg-[#EAE0D4] text-[#722F37] font-semibold rounded-lg border border-[#D9CAB8] transition-colors cursor-pointer"
        >
          와인데뷔 키트 구성 & 무료 수강권 보기 →
        </button>
      </div>

      {/* Honest Operational Notice */}
      <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E2D5C5] flex items-start gap-2.5 text-xs text-[#6E5D50]">
        <Info className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#38271E]">제작 및 미디어 안내: </span>
          <span>
            현재 기초 5개 핵심 강의는 <strong>전문 슬라이드 원고, 대본, 요약, 실습 가이드</strong>를 통해 즉시 자율 학습이 가능합니다. 
            촬영·녹음된 영상 파일은 별도 전문 제작 일정에 따라 순차 배포될 예정이며, 준비되지 않은 가짜 동영상 플레이어를 노출하지 않습니다.
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#722F37] text-white font-medium shadow-xs'
                : 'bg-white text-[#5C4D41] border border-[#DECFC0] hover:bg-[#F3ECE4]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Course List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isCompleted = user.completedCourseIds.includes(course.id);
          const isEntitled = course.isFree || user.entitledCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-[#E2D5C5] shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Badge Row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#8C7A6B]">
                    <span className="font-mono font-semibold text-[#722F37]">
                      {course.orderNumber}강
                    </span>
                    <span>·</span>
                    <span>{course.category}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {course.isFree ? (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] font-semibold border border-[#C8E6C9]">
                        무료 입문
                      </span>
                    ) : (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#722F37] font-semibold border border-[#E2D5C5]">
                        유료 심화 (제안가 {course.proposedPrice.toLocaleString()}원)
                      </span>
                    )}

                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[11px] text-[#2E7D32] font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> 완료
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#38271E] font-display">
                    {course.title}
                  </h3>
                  {course.frenchTitle && (
                    <p className="text-[11px] text-[#8C7A6B] italic font-display">
                      {course.frenchTitle}
                    </p>
                  )}
                  <p className="text-xs text-[#5C4D41] mt-1.5 line-clamp-2">
                    {course.subtitle}
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-xs text-[#8C7A6B] pt-2 border-t border-[#EAE0D4]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>{course.durationMinutes}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#722F37]" />
                    <span>슬라이드 {course.slideDeck?.length || 0}장</span>
                  </div>
                  {course.comprehensionQuizzes && course.comprehensionQuizzes.length > 0 && (
                    <span>퀴즈 {course.comprehensionQuizzes.length}문항</span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleCourseClick(course)}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isEntitled
                      ? 'bg-[#722F37] hover:bg-[#5C232B] text-white shadow-xs'
                      : 'bg-[#F3EDE4] hover:bg-[#EAE0D4] text-[#722F37] border border-[#DECFC0]'
                  }`}
                >
                  {isEntitled ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isCompleted ? '다시 복습하기' : '강의 열기'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>미리보기 & 목차 확인</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
