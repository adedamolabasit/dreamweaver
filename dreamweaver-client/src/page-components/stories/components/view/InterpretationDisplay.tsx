import React from "react";
import { BookOpen, Lightbulb, Heart } from "lucide-react";
import { InterpretationDisplayProps } from "../../types";

const InterpretationDisplay: React.FC<InterpretationDisplayProps> = ({
  data,
}) => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <Lightbulb className="mr-2 text-amber-300\" size={20} />
          <span>Dream Interpretation</span>
        </h3>

        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 mb-6">
          <p className="text-blue-100/90 leading-relaxed">
            {data.interpretation}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Heart className="mr-2 text-pink-300" size={18} />
            <span>Emotional Landscape</span>
          </h3>
          <div className="p-4 rounded-lg bg-pink-900/20 border border-pink-500/20">
            <div className="flex flex-wrap gap-2 mb-4">
              {data.emotions.map((emotion, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-pink-500/30 text-pink-200 text-xs"
                >
                  {emotion}
                </span>
              ))}
            </div>
            <p className="text-pink-100/70 text-sm">
              These emotions form the foundation of your dream's emotional
              landscape, influencing the tone and direction of potential
              narratives.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <BookOpen className="mr-2 text-blue-300" size={18} />
            <span>Key Symbols</span>
          </h3>
          <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
            <div className="flex flex-wrap gap-2">
              {data.symbols.map((symbol, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs"
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Potential Narratives</h3>
        <div className="space-y-4">
          {data.potentialStories.map((story, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-600/50 flex items-center justify-center text-xs">
                  {index + 1}
                </div>
                <h4 className="text-sm font-medium">Story Concept</h4>
              </div>
              <p className="text-blue-100/80 text-sm">{story}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterpretationDisplay;
