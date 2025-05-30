import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

interface StoryGeneratorProps {
  isGenerating: boolean;
  onComplete: () => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ 
  isGenerating, 
  onComplete 
}) => {
  // This component would normally make an API call to generate the story
  // For demo purposes, we're simulating the generation process
  React.useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000); // Simulate 3 second generation time
      
      return () => clearTimeout(timer);
    }
  }, [isGenerating, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      {isGenerating && (
        <>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 animate-pulse">
            <Sparkles className="text-white\" size={28} />
          </div>
          
          <h3 className="text-xl font-medium mb-3 text-center">Weaving Dream Patterns</h3>
          
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Clock size={16} className="text-blue-300" />
            <span className="text-sm text-blue-200/70">Estimated time: 1-2 minutes</span>
          </div>
          
          <div className="w-64 h-2 bg-purple-900/30 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-progress"></div>
          </div>
          
          <div className="space-y-3 text-center max-w-xs">
            <p className="text-blue-100/80 text-sm animate-pulse">Analyzing dream patterns...</p>
            <p className="text-blue-100/60 text-xs">Extracting archetypes and symbols from your dream journal</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StoryGenerator;