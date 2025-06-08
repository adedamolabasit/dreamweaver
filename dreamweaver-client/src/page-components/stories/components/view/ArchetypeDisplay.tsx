import React from "react";
import { Brain, User, Compass, Crown, Sword, Heart, Wand2 } from "lucide-react";
import { ArchetypeDisplayProps } from "../../types";

const archetypeIcons: Record<string, React.ReactNode> = {
  "The Hero": <Sword size={18} />,
  "The Shadow": <User size={18} />,
  "The Trickster": <Wand2 size={18} />,
  "The Great Mother": <Heart size={18} />,
  "The Sage": <Brain size={18} />,
  "The Explorer": <Compass size={18} />,
  "The Ruler": <Crown size={18} />,
};

const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <Brain className="mr-2 text-pink-300\" size={20} />
          <span>Archetype Analysis</span>
        </h3>

        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-800/20 backdrop-blur-sm border border-purple-500/20 mb-4">
          <div className="flex items-center mb-3">
            <div className="mr-3 p-2 rounded-lg bg-indigo-600/30 text-indigo-300">
              {archetypeIcons[data.primaryArchetype] || <User size={18} />}
            </div>
            <div>
              <h4 className="text-lg font-medium">{data.primaryArchetype}</h4>
              <p className="text-xs text-blue-200/70">Primary Archetype</p>
            </div>
          </div>

          <div className="mt-3 w-full h-2 bg-purple-900/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full glow-pulse"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.secondaryArchetypes.map((archetype, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/10 flex items-center"
            >
              <div className="mr-2 p-1.5 rounded-md bg-indigo-600/20 text-indigo-300/80">
                {archetypeIcons[archetype] || <User size={16} />}
              </div>
              <span className="text-sm">{archetype}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">Symbol Interpretations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.symbolMeanings.map((symbol, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/10"
            >
              <h4 className="text-blue-300 font-medium text-sm mb-1">
                {symbol.symbol}
              </h4>
              <p className="text-blue-100/70 text-xs">{symbol.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Emotional Tone</h3>
          <div className="flex flex-wrap gap-2">
            {data.emotionalTone.map((emotion, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 text-xs"
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Potential Conflicts</h3>
          <div className="flex flex-wrap gap-2">
            {data.potentialConflicts.map((conflict, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs"
              >
                {conflict}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeDisplay;
