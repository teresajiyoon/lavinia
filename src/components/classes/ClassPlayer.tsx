import React, { useState } from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  BookOpen,
  FileText,
  Sliders,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Utensils,
  ExternalLink,
} from 'lucide-react';

interface ClassPlayerProps {
  course: Course;
  onBack: () => void;
}

export const ClassPlayer: React.FC<ClassPlayerProps> = ({ course, onBack }) => {
  const {
    user,
    toggleCompleteCourse,
    recipes,
    openRecipeDetail,
    logEvent,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'slides' | 'script' | 'summary' | 'quiz' | 'exercise'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const isCompleted = user.completedCourseIds.includes(course.id);
  const relatedRecipe = recipes.find((r) => r.id === course.relatedRecipeId);

  const handleSelectQuizAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    logEvent('lesson_start', { courseId: course.id, quizCompleted: true });
  };

  const slides = course.slideDeck || [];
  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#722F37] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 클래스 목록으로</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleCompleteCourse(course.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                : 'bg-white text-[#5C4D41] border-[#DECFC0] hover:bg-[#F3ECE4]'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'fill-white text-[#2E7D32]' : ''}`} />
            <span>{isCompleted ? '수강 완료됨' : '수강 완료로 표시'}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
          <span>제 {course.orderNumber}강</span>
          <span>·</span>
          <span>{course.category}</span>
          <span>·</span>
          <span>예상 학습 시간 {course.durationMinutes}분</span>
          <span>·</span>
          <span className="text-[#722F37] font-semibold">
            {course.isFree ? '무료 입문' : '유료 심화'}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#38271E] font-display">
          {course.title}
        </h1>
        {course.frenchTitle && (
          <p className="text-xs sm:text-sm text-[#8C7A6B] italic font-display">
            {course.frenchTitle}
          </p>
        )}
        <p className="text-xs sm:text-sm text-[#5C4D41]">{course.subtitle}</p>
      </div>

      {/* Honest Media Status Notice */}
      <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E2D5C5] flex items-start gap-2.5 text-xs text-[#6E5D50]">
        <Info className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#38271E]">미디어 형태 안내: </span>
          <span>{course.videoStatusNote}</span>
          <div className="text-[11px] text-[#8C7A6B] mt-0.5">
            ※ 라비니아는 제작되지 않은 가짜 동영상 재생 화면을 제공하지 않으며, 체계적인 슬라이드 원고와 대본, 요약, 실습으로 먼저 학습을 지원합니다.
          </div>
        </div>
      </div>

      {/* Learning Objectives Box */}
      <div className="p-4 bg-[#F5ECE3] rounded-lg border border-[#DECFC0] space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#722F37] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 이번 차시 핵심 학습 목표
        </h3>
        <ul className="space-y-1 text-xs text-[#4A3B32]">
          {course.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-bold text-[#722F37]">•</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Mode Tabs */}
      <div className="flex border-b border-[#DECFC0] gap-1 overflow-x-auto text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('slides')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'slides'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>슬라이드 원고 ({slides.length}장)</span>
        </button>

        <button
          onClick={() => setActiveTab('script')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'script'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>전체 강의 대본</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'summary'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>수강생 요약 & 핵심 용어</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>이해 확인 퀴즈 ({course.comprehensionQuizzes?.length || 0}문제)</span>
        </button>

        <button
          onClick={() => setActiveTab('exercise')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'exercise'
              ? 'border-[#722F37] text-[#722F37] font-semibold'
              : 'border-transparent text-[#7A695B] hover:text-[#2C2420]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>홈 실습 과제</span>
        </button>
      </div>

      {/* Tab Panels */}
      {/* 1. Slide Deck Viewer */}
      {activeTab === 'slides' && (
        <div className="space-y-4">
          {slides.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8C7A6B] bg-white rounded-lg border border-[#E2D5C5]">
              현재 준비 중인 슬라이드 원고입니다.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#DECFC0] shadow-sm overflow-hidden">
              {/* Slide Screen Frame */}
              <div className="aspect-[16/9] bg-[#FAF7F2] p-6 sm:p-10 flex flex-col justify-between border-b border-[#DECFC0] relative">
                <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                  <span className="font-display font-semibold text-[#722F37]">
                    LAVINIA WINE CLASS
                  </span>
                  <span className="font-mono">
                    Slide {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>

                <div className="space-y-4 max-w-xl my-auto">
                  <h2 className="text-lg sm:text-2xl font-bold text-[#38271E] font-display">
                    {currentSlide.title}
                  </h2>
                  <ul className="space-y-2 text-xs sm:text-base text-[#4A3B32]">
                    {currentSlide.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#722F37] font-bold text-sm">▶</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-[#A39282] italic bg-white/70 p-2 rounded border border-[#EAE0D4]">
                  [화면 연출 및 시각 자료 지침]: {currentSlide.visualPrompt}
                </div>
              </div>

              {/* Slide Controller */}
              <div className="p-4 bg-white flex items-center justify-between">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded border border-[#DECFC0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> 이전 슬라이드
                </button>

                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                        currentSlideIndex === idx ? 'bg-[#722F37] w-5' : 'bg-[#DECFC0]'
                      }`}
                      title={`${idx + 1}번 슬라이드`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlideIndex === slides.length - 1}
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded border border-[#DECFC0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  다음 슬라이드 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Lecture Script & Narration */}
      {activeTab === 'script' && (
        <div className="bg-white p-6 rounded-xl border border-[#DECFC0] shadow-sm space-y-6">
          <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#382D26] leading-relaxed whitespace-pre-line">
            {course.scriptMarkdown}
          </div>

          {course.subtitlesText && (
            <div className="pt-4 border-t border-[#DECFC0] space-y-2">
              <h4 className="text-xs font-semibold text-[#722F37]">자막 원문 (Transcript)</h4>
              <p className="text-[11px] font-mono text-[#6E5D50] bg-[#FAF7F2] p-3 rounded border border-[#EAE0D4]">
                {course.subtitlesText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Summary & Key Terms */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#DECFC0] shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-[#38271E] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#722F37]" /> 강의 30초 핵심 요약
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3B32] leading-relaxed bg-[#FAF7F2] p-4 rounded-lg border border-[#E8DFD5]">
              {course.summaryText}
            </p>
          </div>

          {course.keyTerms && course.keyTerms.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-[#DECFC0] shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-[#38271E]">
                꼭 알아두어야 할 핵심 용어
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.keyTerms.map((term, i) => (
                  <div key={i} className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-1">
                    <span className="font-bold text-xs text-[#722F37]">{term.term}</span>
                    <p className="text-[11px] text-[#5C4D41] leading-normal">{term.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Comprehension Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white p-6 rounded-xl border border-[#DECFC0] shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#38271E] font-display">
              이해 확인 자율 퀴즈
            </h3>
            <p className="text-xs text-[#8C7A6B]">
              ※ 퀴즈는 개인 학습 점검용이며 공식 자격이나 인증이 아닙니다.
            </p>
          </div>

          <div className="space-y-6">
            {course.comprehensionQuizzes?.map((quiz, qIdx) => {
              const selectedOpt = quizAnswers[qIdx];
              const isCorrect = selectedOpt === quiz.answerIndex;

              return (
                <div key={qIdx} className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E2D5C5] space-y-3">
                  <div className="text-xs sm:text-sm font-semibold text-[#2C2420]">
                    Q{qIdx + 1}. {quiz.question}
                  </div>

                  <div className="space-y-2">
                    {quiz.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                        className={`w-full text-left p-2.5 rounded-md text-xs transition-colors cursor-pointer border flex items-center justify-between ${
                          selectedOpt === optIdx
                            ? 'bg-[#722F37] text-white border-[#722F37] font-medium'
                            : 'bg-white text-[#4A3B32] border-[#DECFC0] hover:bg-[#F3ECE4]'
                        }`}
                      >
                        <span>{opt}</span>
                        {showQuizResults && optIdx === quiz.answerIndex && (
                          <span className="text-[11px] bg-white text-[#2E7D32] px-2 py-0.5 rounded font-semibold">
                            정답
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {showQuizResults && (
                    <div
                      className={`p-2.5 rounded text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]'
                          : 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                      }`}
                    >
                      <div className="font-semibold mb-0.5">
                        {isCorrect ? '✓ 정답입니다!' : '✕ 오답입니다.'}
                      </div>
                      <div className="text-[11px] text-[#424242]">{quiz.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleQuizSubmit}
              className="px-5 py-2 bg-[#722F37] hover:bg-[#5C232B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              퀴즈 채점 및 해설 확인
            </button>
          </div>
        </div>
      )}

      {/* 5. Practical Exercise */}
      {activeTab === 'exercise' && (
        <div className="bg-white p-6 rounded-xl border border-[#DECFC0] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#722F37]" />
            <h3 className="text-base font-bold text-[#38271E] font-display">
              {course.practicalExercise.title}
            </h3>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-2 text-xs sm:text-sm text-[#4A3B32] leading-relaxed">
            <p>{course.practicalExercise.description}</p>
            {course.practicalExercise.homeActionTip && (
              <div className="pt-2 border-t border-[#DECFC0] text-xs text-[#722F37] font-medium">
                💡 실천 팁: {course.practicalExercise.homeActionTip}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Connected Recipe Spotlight (if any) */}
      {relatedRecipe && (
        <div className="p-4 bg-white rounded-xl border border-[#DECFC0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#722F37] font-semibold flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5" /> 이 강의와 함께 실습하는 요리
            </span>
            <div className="text-sm font-bold text-[#38271E] mt-0.5">
              {relatedRecipe.title}
            </div>
            <p className="text-xs text-[#8C7A6B]">{relatedRecipe.description}</p>
          </div>

          <button
            onClick={() => openRecipeDetail(relatedRecipe.id)}
            className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F3ECE4] text-[#722F37] border border-[#D6C7B8] text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            레시피 확인하기 →
          </button>
        </div>
      )}

      {/* Source Citation & Reviewer Meta */}
      <div className="text-[11px] text-[#8C7A6B] pt-4 border-t border-[#DECFC0] flex flex-col sm:flex-row justify-between gap-2">
        <div>출처 및 참고: {course.sources}</div>
        <div>
          최종 검토: {course.reviewer} ({course.reviewedDate})
        </div>
      </div>
    </div>
  );
};
