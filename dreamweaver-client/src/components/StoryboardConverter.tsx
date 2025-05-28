import React from "react";
import { Flower as Flow, CloudLightning, Wand2 } from "lucide-react";
import DreamJournalStack from "./stack/DreamJournalStack";

const StoryboardConverter: React.FC = () => {
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <div className="text-center mb-8 dreamfade-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Dream-to-Character Converter
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Transform the ephemeral essence of your dreams into tangible
          characters and narratives.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="col-span-1 md:col-span-1">
          <DreamJournalStack />
          {/* <div className="h-full p-6 rounded-2xl bg-purple-900/20 backdrop-blur-sm border border-purple-500/10 flex flex-col">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Flow className="mr-2 text-purple-400" size={20} />
              <span>Dream Input</span>
            </h3>
            
            <div className="flex-1">
              <textarea 
                className="w-full h-48 p-4 rounded-lg bg-purple-950/10 text-blue-50 placeholder-blue-300/40 border border-purple-500/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/30 resize-none transition-all duration-300"
                placeholder="Describe your dream in vivid detail..."
              ></textarea>
              
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2 px-4 rounded-lg bg-purple-700/70 hover:bg-purple-600/80 transition-colors text-sm flex items-center justify-center gap-2">
                  <CloudLightning size={16} />
                  <span>Import Journal</span>
                </button>
                <button className="py-2 px-3 rounded-lg bg-pink-700/70 hover:bg-pink-600/80 transition-colors text-sm">
                  <Wand2 size={16} />
                </button>
              </div>
            </div>
          </div> */}
        </div>

        <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/20 pulse-glow">
            <Wand2 size={24} />
          </div>

          <div className="text-center">
            <p className="text-sm text-blue-200/70 mb-2">
              Dreamweaving in Progress
            </p>
            <div className="flex space-x-1 justify-center">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-300/50 animate-ping"
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-8 w-full">
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600/80 to-pink-500/80 hover:from-purple-500/90 hover:to-pink-400/90 transition-all duration-300 font-medium shadow-md shadow-purple-900/30">
              Weave Characters
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1">
          <div className="h-full p-6 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-500/10 flex flex-col">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Wand2 className="mr-2 text-blue-400" size={20} />
              <span>Character Blueprint</span>
            </h3>

            <div className="flex-1 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-60">
                  <div className="mb-4 text-blue-200/50">
                    <Flow size={48} className="mx-auto" />
                  </div>
                  <p className="text-blue-200/80 text-sm">
                    Characters will appear here after weaving...
                  </p>
                </div>
              </div>

              <div className="hidden">
                {/* Character display will be shown here after generation */}
                <div className="character-card"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
        <h3 className="text-xl font-medium mb-4">Storyboard Timeline</h3>

        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all duration-300"
            >
              <p className="text-blue-200/50 text-sm">Scene {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryboardConverter;
