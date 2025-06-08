import React from "react";
import { Home, Search, Compass, Moon, Star, Cloud } from "lucide-react";

interface NotFoundPageProps {
  onGoHome?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute text-white/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Cloud size={40 + Math.random() * 30} />
          </div>
        ))}

        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-purple-300/60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <Star size={4 + Math.random() * 8} />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 mb-6 relative">
            <div className="text-purple-300 animate-pulse">
              <Moon size={80} />
            </div>

            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-300">
                <Star size={16} />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-pink-300">
                <Star size={12} />
              </div>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300">
                <Star size={14} />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300">
                <Star size={10} />
              </div>
            </div>

            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-float"
                style={{
                  left: `${20 + i * 6}%`,
                  top: `${25 + i * 5}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lost in the Dream Realm
            </h1>
            <p className="text-lg text-purple-200/80 leading-relaxed max-w-lg mx-auto">
              The page you're seeking has drifted away like a forgotten dream.
              Perhaps it was never meant to be found, or maybe it's waiting in
              another dimension.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={onGoHome}
              className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Home size={20} />
              Return Home
              <div className="w-0 group-hover:w-2 h-2 bg-white/60 rounded-full transition-all duration-300" />
            </button>

            <button className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/30">
              <Search size={20} />
              Search Dreams
              <div className="w-0 group-hover:w-2 h-2 bg-purple-400 rounded-full transition-all duration-300" />
            </button>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-purple-200/60 text-sm mb-4">
              Or explore these mystical paths:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button className="text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1">
                <Compass size={14} />
                Discover Stories
              </button>
              <button className="text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1">
                <Star size={14} />
                View Gallery
              </button>
              <button className="text-pink-300 hover:text-pink-200 transition-colors flex items-center gap-1">
                <Moon size={14} />
                Read Journal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
