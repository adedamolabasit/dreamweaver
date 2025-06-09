import React from "react";
import { Cloud, Star, Moon } from "lucide-react";

interface DreamLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const DreamLoader: React.FC<DreamLoaderProps> = ({
  message = "Weaving dreams...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const containerSizes = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 space-y-4">
      <div
        className={`relative ${containerSizes[size]} flex items-center justify-center`}
      >
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin"></div>

        {/* Middle pulsing ring */}
        <div className="absolute inset-2 rounded-full border border-blue-400/40 animate-pulse"></div>

        {/* Inner content */}
        <div className="relative flex items-center justify-center">
          {/* Floating elements */}
          <div
            className="absolute -top-2 -left-2 text-purple-300 animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            <Star size={12} />
          </div>
          <div
            className="absolute -top-1 right-0 text-blue-300 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <Star size={8} />
          </div>
          <div
            className="absolute -bottom-1 -left-1 text-pink-300 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <Star size={10} />
          </div>

          {/* Central icon */}
          <div className="text-purple-400 animate-pulse">
            <Moon className={sizeClasses[size]} />
          </div>

          {/* Floating cloud */}
          <div className="absolute top-1 right-2 text-blue-200/60 animate-float">
            <Cloud size={14} />
          </div>
        </div>

        {/* Dreamy particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/60 rounded-full animate-float"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + i * 8}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {message && (
        <div className="text-center">
          <p className="text-purple-200 text-sm font-medium animate-pulse">
            {message}
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamLoader;
