import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Recipe,
  WineStyle,
  PairingItem,
  Course,
  KitProduct,
  AdminSettings,
  PurchaseClaim,
  Inquiry,
  AnalyticsEvent,
  TastingNote,
} from '../types';
import {
  INITIAL_RECIPES,
  INITIAL_WINE_STYLES,
  INITIAL_PAIRINGS,
  INITIAL_COURSES,
  INITIAL_KIT,
  INITIAL_ADMIN_SETTINGS,
  INITIAL_PURCHASE_CLAIMS,
  INITIAL_INQUIRIES,
} from '../data/initialData';

export type ActiveTab = 'home' | 'pairing' | 'classes' | 'kit' | 'my-records' | 'about-faq' | 'admin';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface UserState {
  isLoggedIn: boolean;
  name: string;
  email: string;
  savedRecipeIds: string[];
  savedPairingIds: string[];
  completedCourseIds: string[];
  entitledCourseIds: string[];
  tastingNotes: TastingNote[];
}

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRecipeId: string | null;
  setSelectedRecipeId: (id: string | null) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedPairingId: string | null;
  setSelectedPairingId: (id: string | null) => void;
  
  // Data entities
  recipes: Recipe[];
  wineStyles: WineStyle[];
  pairings: PairingItem[];
  courses: Course[];
  kitProduct: KitProduct;
  adminSettings: AdminSettings;
  purchaseClaims: PurchaseClaim[];
  inquiries: Inquiry[];
  analyticsEvents: AnalyticsEvent[];
  
  // User state
  user: UserState;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
  toggleSaveRecipe: (id: string) => void;
  toggleSavePairing: (id: string) => void;
  toggleCompleteCourse: (id: string) => void;
  addTastingNote: (note: Omit<TastingNote, 'id'>) => void;
  deleteTastingNote: (id: string) => void;
  
  // Admin actions
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  updateRecipe: (recipe: Recipe) => void;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  deleteRecipe: (id: string) => void;
  
  updateCourse: (course: Course) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;
  
  updatePairing: (pairing: PairingItem) => void;
  addPairing: (pairing: Omit<PairingItem, 'id'>) => void;
  deletePairing: (id: string) => void;
  
  updateKitProduct: (kit: KitProduct) => void;
  updateAdminSettings: (settings: AdminSettings) => void;
  
  updatePurchaseClaimStatus: (claimId: string, status: '승인' | '반려', note?: string) => void;
  submitPurchaseClaim: (claim: Omit<PurchaseClaim, 'id' | 'claimDate' | 'status'>) => void;
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  answerInquiry: (inquiryId: string, reply: string) => void;
  
  // Analytics
  logEvent: (
    eventName: AnalyticsEvent['eventName'],
    meta?: Record<string, string | number | boolean>
  ) => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
  
  // Navigation helpers
  openRecipeDetail: (id: string) => void;
  openCourseDetail: (id: string) => void;
  openPairingDetail: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedPairingId, setSelectedPairingId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Entities with local persistence for test sessions
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('lavinia_recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [pairings, setPairings] = useState<PairingItem[]>(() => {
    const saved = localStorage.getItem('lavinia_pairings');
    return saved ? JSON.parse(saved) : INITIAL_PAIRINGS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('lavinia_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [wineStyles] = useState<WineStyle[]>(INITIAL_WINE_STYLES);

  const [kitProduct, setKitProduct] = useState<KitProduct>(() => {
    const saved = localStorage.getItem('lavinia_kit');
    return saved ? JSON.parse(saved) : INITIAL_KIT;
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('lavinia_admin_settings');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_SETTINGS;
  });

  const [purchaseClaims, setPurchaseClaims] = useState<PurchaseClaim[]>(() => {
    const saved = localStorage.getItem('lavinia_purchase_claims');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASE_CLAIMS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('lavinia_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    const saved = localStorage.getItem('lavinia_analytics');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('lavinia_user');
    return saved
      ? JSON.parse(saved)
      : {
          isLoggedIn: true,
          name: '김라빈',
          email: 'lavin.kim@example.com',
          savedRecipeIds: ['recipe-mushroom-cream-pasta', 'recipe-korean-bulgogi'],
          savedPairingIds: ['pair-1', 'pair-7'],
          completedCourseIds: ['course-wine-types-flavors'],
          entitledCourseIds: [
            'course-wine-types-flavors',
            'course-reading-labels',
            'course-acidity-tannin',
            'course-wine-food-pairing',
            'course-open-and-tasting',
          ],
          tastingNotes: [
            {
              id: 'note-1',
              wineName: '샤블리 장 마크 브로카르',
              type: '화이트',
              vintage: '2022',
              grapeVariety: '샤르도네 100%',
              date: '2026-09-27',
              acidity: 5,
              tannin: 1,
              body: 3,
              sweetness: 1,
              rating: 5,
              aromas: ['청사과', '부싯돌/미네랄', '라임', '흰꽃'],
              pairedFood: '버섯 크림 파스타',
              memo: '오크가 없는 샤블리라 높은 산미가 크림의 느끼함을 완벽하게 씻어주었음. 산뜻한 저녁에 최고.',
            },
          ],
        };
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('lavinia_recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('lavinia_pairings', JSON.stringify(pairings));
  }, [pairings]);

  useEffect(() => {
    localStorage.setItem('lavinia_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lavinia_kit', JSON.stringify(kitProduct));
  }, [kitProduct]);

  useEffect(() => {
    localStorage.setItem('lavinia_admin_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  useEffect(() => {
    localStorage.setItem('lavinia_purchase_claims', JSON.stringify(purchaseClaims));
  }, [purchaseClaims]);

  useEffect(() => {
    localStorage.setItem('lavinia_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('lavinia_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lavinia_analytics', JSON.stringify(analyticsEvents.slice(-200)));
  }, [analyticsEvents]);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Safe Analytics logger (Zero personal identifiable info & no free-text notes)
  const logEvent = (
    eventName: AnalyticsEvent['eventName'],
    meta: Record<string, string | number | boolean> = {}
  ) => {
    // Sanitized payload
    const safeMeta: Record<string, string | number | boolean> = {};
    for (const [key, val] of Object.entries(meta)) {
      if (
        !key.toLowerCase().includes('email') &&
        !key.toLowerCase().includes('name') &&
        !key.toLowerCase().includes('memo') &&
        !key.toLowerCase().includes('phone')
      ) {
        safeMeta[key] = val;
      }
    }
    const newEvent: AnalyticsEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      eventName,
      timestamp: new Date().toISOString(),
      meta: safeMeta,
    };
    setAnalyticsEvents((prev) => [...prev, newEvent]);
  };

  const loginUser = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      name,
      email,
    }));
    showToast(`${name}님 환영합니다. 로그인되었습니다.`, 'success');
  };

  const logoutUser = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    showToast('로그아웃되었습니다.', 'info');
  };

  const toggleSaveRecipe = (id: string) => {
    if (!user.isLoggedIn) {
      showToast('레시피 저장은 로그인이 필요한 기능입니다.', 'warning');
      return;
    }
    setUser((prev) => {
      const isSaved = prev.savedRecipeIds.includes(id);
      const nextSaved = isSaved
        ? prev.savedRecipeIds.filter((item) => item !== id)
        : [...prev.savedRecipeIds, id];
      return { ...prev, savedRecipeIds: nextSaved };
    });
    const isNowSaved = !user.savedRecipeIds.includes(id);
    logEvent('recipe_save', { recipeId: id, saved: isNowSaved });
    showToast(isNowSaved ? '레시피를 내 보관함에 담았습니다.' : '레시피 보관을 취소했습니다.', 'info');
  };

  const toggleSavePairing = (id: string) => {
    if (!user.isLoggedIn) {
      showToast('페어링 저장은 로그인이 필요한 기능입니다.', 'warning');
      return;
    }
    setUser((prev) => {
      const isSaved = prev.savedPairingIds.includes(id);
      const nextSaved = isSaved
        ? prev.savedPairingIds.filter((item) => item !== id)
        : [...prev.savedPairingIds, id];
      return { ...prev, savedPairingIds: nextSaved };
    });
    const isNowSaved = !user.savedPairingIds.includes(id);
    showToast(isNowSaved ? '오늘의 페어링 조합을 저장했습니다.' : '페어링 저장을 취소했습니다.', 'info');
  };

  const toggleCompleteCourse = (id: string) => {
    setUser((prev) => {
      const isDone = prev.completedCourseIds.includes(id);
      const nextCompleted = isDone
        ? prev.completedCourseIds.filter((c) => c !== id)
        : [...prev.completedCourseIds, id];
      return { ...prev, completedCourseIds: nextCompleted };
    });
    const isDoneNow = !user.completedCourseIds.includes(id);
    if (isDoneNow) {
      logEvent('lesson_complete', { courseId: id });
      showToast('강의 수강을 완료하였습니다! 🎉', 'success');
    }
  };

  const addTastingNote = (noteData: Omit<TastingNote, 'id'>) => {
    const newNote: TastingNote = {
      ...noteData,
      id: 'note-' + Date.now(),
    };
    setUser((prev) => ({
      ...prev,
      tastingNotes: [newNote, ...prev.tastingNotes],
    }));
    showToast('와인 테이스팅 노트가 기록되었습니다.', 'success');
  };

  const deleteTastingNote = (id: string) => {
    setUser((prev) => ({
      ...prev,
      tastingNotes: prev.tastingNotes.filter((n) => n.id !== id),
    }));
    showToast('테이스팅 노트를 삭제했습니다.', 'info');
  };

  // Navigation helpers
  const openRecipeDetail = (id: string) => {
    setSelectedRecipeId(id);
    setActiveTab('pairing');
    logEvent('recipe_view', { recipeId: id });
  };

  const openCourseDetail = (id: string) => {
    setSelectedCourseId(id);
    setActiveTab('classes');
    logEvent('course_preview', { courseId: id });
  };

  const openPairingDetail = (id: string) => {
    setSelectedPairingId(id);
    setActiveTab('pairing');
  };

  // Admin CRUD
  const updateRecipe = (recipe: Recipe) => {
    setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? recipe : r)));
    showToast(`레시피 [${recipe.title}] 정보가 저장되었습니다.`, 'success');
  };

  const addRecipe = (recipeData: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: 'recipe-' + Date.now(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`새 레시피 [${newRecipe.title}]가 추가되었습니다.`, 'success');
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showToast('레시피가 삭제되었습니다.', 'info');
  };

  const updateCourse = (course: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === course.id ? course : c)));
    showToast(`강의 [${course.title}] 내용이 업데이트되었습니다.`, 'success');
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: 'course-' + Date.now(),
    };
    setCourses((prev) => [...prev, newCourse]);
    showToast(`새 강의 [${newCourse.title}]가 등록되었습니다.`, 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast('강의가 삭제되었습니다.', 'info');
  };

  const updatePairing = (pairing: PairingItem) => {
    setPairings((prev) => prev.map((p) => (p.id === pairing.id ? pairing : p)));
    showToast(`페어링 매핑 [${pairing.dishName}]이 수정되었습니다.`, 'success');
  };

  const addPairing = (pairingData: Omit<PairingItem, 'id'>) => {
    const newPairing: PairingItem = {
      ...pairingData,
      id: 'pair-' + Date.now(),
    };
    setPairings((prev) => [newPairing, ...prev]);
    showToast(`새 페어링 [${newPairing.dishName}]이 등록되었습니다.`, 'success');
  };

  const deletePairing = (id: string) => {
    setPairings((prev) => prev.filter((p) => p.id !== id));
    showToast('페어링 항목이 삭제되었습니다.', 'info');
  };

  const updateKitProduct = (kit: KitProduct) => {
    setKitProduct(kit);
    showToast('와인데뷔 키트 상품 정보가 저장되었습니다.', 'success');
  };

  const updateAdminSettings = (settings: AdminSettings) => {
    setAdminSettings(settings);
    showToast('관리자 운영 설정이 저장되었습니다.', 'success');
  };

  const updatePurchaseClaimStatus = (claimId: string, status: '승인' | '반려', note?: string) => {
    setPurchaseClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status, reviewNote: note || c.reviewNote } : c))
    );
    if (status === '승인') {
      logEvent('verified_purchase', { claimId });
      showToast('구매 인증이 승인되어 회원에게 수강 권한이 정상 부여되었습니다.', 'success');
    } else {
      showToast('구매 인증 요청이 반려 처리되었습니다.', 'info');
    }
  };

  const submitPurchaseClaim = (claimData: Omit<PurchaseClaim, 'id' | 'claimDate' | 'status'>) => {
    const newClaim: PurchaseClaim = {
      ...claimData,
      id: 'claim-' + Date.now(),
      claimDate: new Date().toLocaleString('ko-KR', { hour12: false }),
      status: '대기',
    };
    setPurchaseClaims((prev) => [newClaim, ...prev]);
    showToast('구매 인증 신청이 접수되었습니다. 관리자 검토 후 권한이 반영됩니다.', 'success');
  };

  const submitInquiry = (inqData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: Inquiry = {
      ...inqData,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toLocaleString('ko-KR', { hour12: false }),
      status: '접수 대기',
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('문의가 접수되었습니다. 담당자가 검토 후 답변드립니다.', 'success');
  };

  const answerInquiry = (inquiryId: string, reply: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, status: '답변 완료', replyContent: reply } : i))
    );
    showToast('문의에 답변이 등록되었습니다.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedRecipeId,
        setSelectedRecipeId,
        selectedCourseId,
        setSelectedCourseId,
        selectedPairingId,
        setSelectedPairingId,
        recipes,
        wineStyles,
        pairings,
        courses,
        kitProduct,
        adminSettings,
        purchaseClaims,
        inquiries,
        analyticsEvents,
        user,
        loginUser,
        logoutUser,
        toggleSaveRecipe,
        toggleSavePairing,
        toggleCompleteCourse,
        addTastingNote,
        deleteTastingNote,
        isAdminMode,
        setIsAdminMode,
        updateRecipe,
        addRecipe,
        deleteRecipe,
        updateCourse,
        addCourse,
        deleteCourse,
        updatePairing,
        addPairing,
        deletePairing,
        updateKitProduct,
        updateAdminSettings,
        updatePurchaseClaimStatus,
        submitPurchaseClaim,
        submitInquiry,
        answerInquiry,
        logEvent,
        toasts,
        showToast,
        dismissToast,
        openRecipeDetail,
        openCourseDetail,
        openPairingDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
