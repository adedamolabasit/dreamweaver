import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X, Sparkles } from "lucide-react";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "dream";
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const DreamToast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
          border: "border-emerald-500/40",
          icon: <CheckCircle size={20} className="text-emerald-400" />,
          accent: "text-emerald-300",
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
          border: "border-red-500/40",
          icon: <AlertCircle size={20} className="text-red-400" />,
          accent: "text-red-300",
        };
      case "info":
        return {
          bg: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
          border: "border-blue-500/40",
          icon: <Info size={20} className="text-blue-400" />,
          accent: "text-blue-300",
        };
      case "dream":
        return {
          bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
          border: "border-purple-500/40",
          icon: <Sparkles size={20} className="text-purple-400" />,
          accent: "text-purple-300",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500/20 to-slate-500/20",
          border: "border-gray-500/40",
          icon: <Info size={20} className="text-gray-400" />,
          accent: "text-gray-300",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`
        z-10 w-full max-w-md mx-auto
        transform transition-all duration-300 ease-out
        ${
          isVisible && !isLeaving
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95"
        }
      `}
    >
      <div
        className={`${styles.bg} ${styles.border}
        backdrop-blur-md rounded-xl border p-4
        shadow-lg shadow-black/20
        relative overflow-hidden`}
      >
        {type === "dream" && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-300/40 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold ${styles.accent}`}>
              {title}
            </h4>
            {message && (
              <p className="text-sm text-white/80 mt-1 leading-relaxed">
                {message}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white/60 hover:text-white/80 transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div
            className={`h-full ${
              type === "success"
                ? "bg-emerald-400"
                : type === "error"
                ? "bg-red-400"
                : type === "info"
                ? "bg-blue-400"
                : "bg-purple-400"
            } transition-all ease-linear`}
            style={{
              width: "100%",
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ToastContext = createContext<{
  toasts: ToastProps[];
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showDream: (title: string, message?: string) => void;
} | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastProps, "id" | "onClose">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }]);
    },
    [removeToast]
  );

  const contextValue = {
    toasts,
    showSuccess: (title: string, message?: string) =>
      addToast({ type: "success", title, message }),
    showError: (title: string, message?: string) =>
      addToast({ type: "error", title, message }),
    showInfo: (title: string, message?: string) =>
      addToast({ type: "info", title, message }),
    showDream: (title: string, message?: string) =>
      addToast({ type: "dream", title, message }),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ zIndex: 50 - index }}
          className="pointer-events-auto"
        >
          <DreamToast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};

export default DreamToast;
