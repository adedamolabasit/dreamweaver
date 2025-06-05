import { useState, useEffect } from "react";
import { useGetProductionById } from "../../hooks/useProduction";
import {
  Sparkles,
  Wallet,
  Loader2,
  Notebook,
  Scroll,
  Flower as Flow,
  Wand2,
  Edit,
  Save,
  X,
  Plus,
  ArrowLeft,
} from "lucide-react";
import ComicBookDisplay from "../ComicBookDisplay";
import ArchetypeDisplay from "../ArcheTypeDisplay";
import InterpretationDisplay from "../InterpretationDisplay";
import { Visual } from "../ComicBookDisplay";
import {
  sampleArchetypeData,
  sampleInterpretationData,
  sampleStoryData,
} from "../../api/mock/sampleData";
import { useNavigate } from "react-router-dom";
import { ProductionResponse } from "../../types/types";

export const StoryView = ({
  id,
  handleActiveStory,
}: {
  id: string;
  handleActiveStory: (id: string, viewStory: boolean) => void;
}) => {
  const [storyGenerated, setStoryGenerated] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<
    "story" | "archetypes" | "interpretation"
  >("story");
  const { data: production } = useGetProductionById(id);
  const navigate = useNavigate();

  const getComicBookImageForScene = (index: number) => {
    if (!production?.visuals) return null;

    // Handle both array of visuals and single visual cases
    const visuals = Array.isArray(production.visuals)
      ? production.visuals
      : [production.visuals];
    const sceneId = `scene${index + 1}`;

    // Find the visual for this scene
    const visual = visuals.find((v: any) => v.id === sceneId);
    if (!visual) return null;

    // Find the comic book style image
    return visual.generatedImages?.find(
      (img: any) => img.style === "Comic Book"
    );
  };

  if (!id) return <div>Loading....</div>;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto h-full p-4">
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={() => handleActiveStory(id, false)}
          className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Dream Analysis
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Your story, symbols, and interpretations revealed.
        </p>
      </div>

      {/* Story Timeline Section */}
      <div className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 mb-12">
        <h3 className="text-xl font-medium mb-4">Storyboard Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {storyGenerated && production?.story?.scenes
            ? production.story.scenes.map((scene: any, i: number) => {
                const comicImage = getComicBookImageForScene(i);
                return (
                  <div
                    key={i}
                    className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative hover:border-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    {comicImage?.url && (
                      <img
                        src={comicImage.url}
                        alt={`Scene ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                      <div className="w-full h-full bg-gradient-to-br from-purple-800/50 to-blue-800/50" />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-10">
                      Scene {i + 1}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                      <p className="text-white/90 text-xs line-clamp-2">
                        {scene.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                );
              })
            : [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-blue-200/50 text-sm">Scene {i + 1}</p>
                </div>
              ))}
        </div>
      </div>

      {storyGenerated && (
        <div className="w-full mb-10">
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium">Dream Analysis Results</h3>
              <div className="flex space-x-2">
                {["story", "archetypes", "interpretation"].map((view) => {
                  const isActive = activeView === view;
                  const Icon =
                    view === "story"
                      ? Scroll
                      : view === "archetypes"
                      ? Sparkles
                      : Wand2;
                  return (
                    <button
                      key={view}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        isActive
                          ? "bg-purple-600/80"
                          : "bg-purple-900/50 hover:bg-purple-800/60"
                      } transition-colors`}
                      onClick={() => setActiveView(view as typeof activeView)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={14} />
                        <span className="capitalize">{view}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-950/30 to-purple-950/30 rounded-lg border border-blue-500/10">
              {activeView === "story" && production && (
                <ComicBookDisplay
                  story={production.story}
                  visuals={
                    production.visuals
                      ? ([production.visuals] as Visual[])
                      : undefined
                  }
                />
              )}
              {activeView === "archetypes" && (
                <ArchetypeDisplay data={sampleArchetypeData} />
              )}
              {activeView === "interpretation" && (
                <InterpretationDisplay data={sampleInterpretationData} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// components/TextToSpeechButton.ts

interface Props {
  text: string;
}

const TextToSpeechButton: React.FC<Props> = ({ text }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    // Some browsers delay voice loading
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

const speakText = () => {
  if ('speechSynthesis' in window && selectedVoice) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;

    // 👻 Dream-like scary effect
    utterance.pitch = 0.4; // low pitch = eerie
    utterance.rate = 0.75; // slow rate = unsettling
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  }
};

  return (
    <div className="space-y-4">
      <select
        value={selectedVoice?.name}
        onChange={(e) => {
          const newVoice = voices.find(v => v.name === e.target.value);
          setSelectedVoice(newVoice || null);
        }}
        className="p-2 border rounded"
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <button
        onClick={speakText}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        🔊 Speak
      </button>
    </div>
  );
};


export default TextToSpeechButton;
