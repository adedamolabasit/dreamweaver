import React from 'react';
import { BookOpen, Camera, Info } from 'lucide-react';

interface Character {
  name: string;
  description: string;
}

interface Scene {
  description: string;
  visualPrompt: string;
}

interface StoryData {
  title: string;
  synopsis: string;
  characters: Character[];
  scenes: Scene[];
}

interface ComicBookDisplayProps {
  data: StoryData;
}

const ComicBookDisplay: React.FC<ComicBookDisplayProps> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-center">{data.title}</h2>
        <p className="text-blue-100/80 text-sm mb-6 text-center max-w-2xl mx-auto">
          {data.synopsis}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {data.characters.map((character, index) => (
            <div key={index} className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]">
              <h3 className="text-lg font-medium mb-2 text-purple-200">{character.name}</h3>
              <p className="text-blue-100/70 text-sm">{character.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <BookOpen className="mr-2 text-blue-300" size={20} />
          <span>Comic Book Storyboard</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.scenes.map((scene, index) => (
            <div key={index} className="comic-panel rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/50 to-blue-900/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="text-purple-300/40" size={40} />
                </div>
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                  Scene {index + 1}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs text-white/90 line-clamp-2 italic">{scene.visualPrompt}</p>
                </div>
              </div>
              <div className="p-4 bg-purple-900/30 border-t border-purple-500/20">
                <p className="text-sm text-blue-100/80">{scene.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-blue-500/20">
        <div className="p-4 bg-blue-900/20 flex items-center">
          <Info className="mr-2 text-blue-300" size={18} />
          <h3 className="text-lg font-medium">Story Path</h3>
        </div>
        <div className="p-5 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-blue-500/20 rounded-full"></div>
            
            {data.scenes.map((_, index) => (
              <div key={index} className="flex mb-8 relative z-10">
                <div className="mr-6">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-blue-500' : 'bg-blue-900/50 border border-blue-500/30'
                  }`}>
                    <span className="text-xs">{index + 1}</span>
                  </div>
                </div>
                
                <div className={`flex-1 p-3 rounded-lg ${
                  index === 0 ? 'bg-blue-900/30 border border-blue-500/30' : 'bg-blue-900/20 border border-blue-500/10'
                }`}>
                  <p className="text-sm">
                    {index === 0 ? 'Beginning: ' : 
                     index === data.scenes.length - 1 ? 'Resolution: ' : 
                     `Development ${index}: `}
                    <span className="text-blue-200/80">{data.scenes[index].description.substring(0, 100)}...</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicBookDisplay;