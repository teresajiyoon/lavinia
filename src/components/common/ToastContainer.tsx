import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-md border text-xs sm:text-sm transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${
              isSuccess
                ? 'bg-[#F4F9F4] border-[#C8E6C9] text-[#1B5E20]'
                : isWarning
                ? 'bg-[#FFF9E6] border-[#FFE082] text-[#E65100]'
                : isError
                ? 'bg-[#FDF2F2] border-[#F8B4B4] text-[#9B1C1C]'
                : 'bg-[#FAF7F2] border-[#E2D5C5] text-[#4A3B32]'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />}
            {isWarning && <AlertCircle className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-[#C62828] shrink-0 mt-0.5" />}
            {!isSuccess && !isWarning && !isError && (
              <Info className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
            )}

            <div className="flex-1 font-medium leading-relaxed">{toast.message}</div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
