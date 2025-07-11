import React from 'react';
import { Brain, User, Castle, Compass, Crown, Sword, Magnet as Magic, Heart } from 'lucide-react';

interface ArchetypeProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  strength: number;
}

const Archetype: React.FC<ArchetypeProps> = ({ name, icon, description, strength }) => (
  <div className="relative p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-800/20 backdrop-blur-sm hover:from-purple-800/40 hover:to-blue-700/30 transition-all duration-300 border border-purple-500/10 group">
    <div className="absolute top-2 right-2 text-amber-300/70 font-light text-sm">
      {strength}%
    </div>
    
    <div className="flex items-center mb-3">
      <div className="mr-3 p-2 rounded-lg bg-indigo-600/30 text-indigo-300">
        {icon}
      </div>
      <h4 className="text-lg font-medium">{name}</h4>
    </div>
    
    <p className="text-sm text-blue-100/70 font-light">{description}</p>
    
    <div className="mt-3 w-full h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full glow-pulse"
        style={{ width: `${strength}%` }}
      ></div>
    </div>
  </div>
);

const ArchetypeAnalyzer: React.FC = () => {
  const archetypes: ArchetypeProps[] = [
    {
      name: "The Hero",
      icon: <Sword size={18} />,
      description: "One who overcomes obstacles and achieves goals through courage and determination.",
      strength: 78
    },
    {
      name: "The Magician",
      icon: <Magic size={18} />,
      description: "Transforms situations, makes dreams into reality through knowledge and insight.",
      strength: 65
    },
    {
      name: "The Ruler",
      icon: <Crown size={18} />,
      description: "Establishes order and harmony through control and leadership.",
      strength: 42
    },
    {
      name: "The Explorer",
      icon: <Compass size={18} />,
      description: "Seeks new experiences, avoids boredom, and discovers oneself in the journey.",
      strength: 87
    },
    {
      name: "The Caregiver",
      icon: <Heart size={18} />,
      description: "Protects and cares for others, demonstrating compassion and generosity.",
      strength: 53
    },
    {
      name: "The Sage",
      icon: <Brain size={18} />,
      description: "Seeks truth and understanding through analysis and intelligence.",
      strength: 71
    }
  ];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <div className="text-center mb-8 dreamfade-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Jungian Archetype Analyzer
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Discover the symbolic patterns and archetypes that emerge from your dreamscape.
        </p>
      </div>
      
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/3">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-700/20 to-blue-900/20 border border-purple-500/20 p-4 relative overflow-hidden dreamcard">
              <div className="absolute inset-0 flex items-center justify-center">
                <User size={80} className="text-indigo-300/40" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-purple-950/90 to-purple-950/0">
                <p className="text-center text-sm font-light">Upload or select a dream to analyze</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-medium mb-4 flex items-center">
                <Brain className="mr-2 text-pink-300" size={20} />
                <span>Dream Essence</span>
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100/70">Dream Lucidity</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100/70">Emotional Intensity</span>
                  <span className="text-sm font-medium">Medium</span>
                </div>
                <div className="w-full h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100/70">Symbolic Clarity</span>
                  <span className="text-sm font-medium">Very High</span>
                </div>
                <div className="w-full h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
                  <div className="h-full w-11/12 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {archetypes.map((archetype, index) => (
          <Archetype key={index} {...archetype} />
        ))}
      </div>
      
      <div className="mt-10 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full">
        <h3 className="text-xl font-medium mb-4">Archetypal Journey Map</h3>
        
        <div className="relative h-60 rounded-lg bg-gradient-to-b from-purple-900/20 to-blue-900/10 border border-purple-500/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Castle size={48} className="text-indigo-300/30" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-blue-200/60 text-sm">Select a dream to visualize your archetypal journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeAnalyzer;