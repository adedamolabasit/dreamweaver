import React, { useState } from 'react';
import { Mic, MicOff, Play, Pause } from 'lucide-react';

const VoiceJournal: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [journalEntries, setJournalEntries] = useState<string[]>([
    "Last night I dreamt of flying over an endless ocean of stars...",
    "The forest was alive, the trees had faces and spoke in whispers..."
  ]);
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto h-full">
      <div className="text-center mb-8 dreamfade-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">Dream Journal</h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Speak your dreams into existence. Your voice creates ripples in the dreamscape.
        </p>
      </div>
      
      <div className="w-full mb-10">
        <div className={`relative flex flex-col items-center justify-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-700 ${
          isRecording 
            ? 'bg-gradient-to-br from-purple-900/40 to-pink-800/30 shadow-lg shadow-pink-900/30' 
            : 'bg-white/5'
        }`}>
          <div className={`mic-visualizer ${isRecording ? 'active' : ''}`}>
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="visualizer-bar bg-gradient-to-t from-purple-400 to-pink-300"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: isRecording ? `${Math.random() * 60 + 20}px` : '5px',
                  opacity: isRecording ? 0.8 : 0.3
                }}
              ></div>
            ))}
          </div>
          
          <button 
            onClick={toggleRecording}
            className={`relative z-10 p-6 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-pink-500 shadow-lg shadow-pink-500/30 scale-110' 
                : 'bg-purple-700 hover:bg-purple-600'
            }`}
          >
            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
          </button>
          
          <p className="mt-6 text-sm font-light">
            {isRecording ? 'Tap to stop recording' : 'Tap to start recording your dream'}
          </p>
        </div>
      </div>
      
      <div className="w-full space-y-4">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <span className="mr-2">Recent Dream Memories</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
        </h3>
        
        {journalEntries.map((entry, index) => (
          <div 
            key={index} 
            className="p-5 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex gap-4 group"
          >
            <div className="flex-shrink-0">
              <button className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-700/70 transition-colors">
                <Play size={18} />
              </button>
            </div>
            <div>
              <p className="font-light dreamtext">{entry}</p>
              <p className="text-xs text-blue-200/50 mt-2">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceJournal;