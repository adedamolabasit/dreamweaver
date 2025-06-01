import React, { useEffect, useState } from "react";
import { Flower as Flow, Wand2, Edit, Save, X, Plus } from "lucide-react";
import { Sparkles, Wallet, Loader2, Notebook, Scroll } from "lucide-react";
import StoryGenerator from "./Storygenerator";
import ComicBookDisplay from "./ComicBookDisplay";
import ArchetypeDisplay from "./ArcheTypeDisplay";
import InterpretationDisplay from "./InterpretationDisplay";
import { useGetAllUsersJournals, useUpdateJournal } from "../hooks/useJournal.";
import {
  useWeaveDream,
  useInitiateProduction,
  useGetAllUsersProductions,
  useGetProductionById,
} from "../hooks/useProduction";
import { ProductionResponse } from "../types/types";

import { useAccount } from "wagmi";
import moment from "moment";
import {
  sampleStoryData,
  sampleArchetypeData,
  sampleInterpretationData,
} from "../api/mock/sampleData";
import { Visual } from "./ComicBookDisplay";
import { StoryboardTimeline } from "./StroyboardTimeline";

interface JournalEntry {
  _id: string;
  transcript: string;
  createdAt: string;
}

const StoryboardConverter: React.FC = () => {
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [storyGenerated, setStoryGenerated] = useState<boolean>(false);
  const [productionId, setProdutionId] = useState<string | undefined>("");

  const [activeView, setActiveView] = useState<
    "story" | "archetypes" | "interpretation"
  >("story");

  const {
    data: journals,
    isLoading,
    refetch: refetchJournal,
  } = useGetAllUsersJournals();
  const { mutate: updateJournal } = useUpdateJournal();
  const { mutate: weaveDream } = useWeaveDream();
  const { mutate: initiateProducttion } = useInitiateProduction();
  const { data: production, refetch: refetchProduction } = useGetProductionById(
    "683c8f76a9560538d7bb4d33"
  );

  const { isConnected } = useAccount();

  const [activeJournalId, setActiveJournalId] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>("");

  const handleEditClick = (journal: JournalEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveJournalId(journal._id);
    setEditContent(journal.transcript);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateJournal(
      { id: activeJournalId as string, transcript: editContent },
      {
        onSuccess: () => {
          refetchJournal();
          setIsEditing(false);
        },
      }
    );
  };

  const handleJournalClick = (journal: JournalEntry) => {
    setActiveJournalId(journal._id);
    setIsEditing(false);
  };

  const handleIntiateProduction = async (productionId: string) => {
    initiateProducttion(productionId as string, {
      onSuccess: (data: ProductionResponse) => {
        console.log(data);
      },
      onError: (err: any) => {
        console.error("Mutation failed:", err);
      },
    });
  };

  const handleWeaveDream = async () => {
    console.log("testing...");
    setIsGeneratingStory(true);

    // if (!activeJournal) return;
    // setIsGeneratingStory(true);
    // weaveDream(activeJournalId as string, {
    //   onSuccess: (data: ProductionResponse) => {
    //     if (data._id) {
    //       setProdutionId(data._id);
    //       handleIntiateProduction(data._id);
    //     }
    //   },
    //   onError: (err: any) => {
    //     console.error("Mutation failed:", err);
    //   },
    // });
  };

  const handleGenerationComplete = () => {
    setIsGeneratingStory(true);
    setStoryGenerated(true);
  };

  useEffect(() => {
    if (productionId) {
      refetchProduction();
    }
  }, [production, refetchProduction]);

  const activeJournal = journals?.find((j) => j._id === activeJournalId);

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Dream-to-Character Converter
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Transform the ephemeral essence of your dreams into tangible
          characters and narratives.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Journals Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Dream Journals</h3>
            <button
              className="p-1.5 rounded-lg bg-purple-500/30 hover:bg-purple-500/50 transition-colors text-purple-200"
              title="Add new journal"
              onClick={() => {
                if (!isConnected) {
                  alert("Please connect your wallet first");
                  return;
                }
                // Add create journal logic here
              }}
            >
              <div className="flex gap-1 items-center">
                {journals?.length === 0 ? (
                  <>
                    <Plus className="text-green-500" size={12} />
                    <h6 className="text-sm">journal</h6>
                  </>
                ) : (
                  <>
                    <h6 className="text-sm">{journals?.length}</h6>
                    <h6 className="text-sm">
                      {journals?.length === 1 ? "journal" : "journals"}
                    </h6>
                  </>
                )}
              </div>
            </button>
          </div>

          {isLoading ? (
            <div className="h-80 flex items-center justify-center rounded-lg bg-purple-900/10">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          ) : !isConnected ? (
            <div className="h-80 flex flex-col items-center justify-center bg-purple-900/10 rounded-xl border border-purple-500/10 p-6 text-center">
              <Wallet className="text-purple-400 mb-3" size={24} />
              <p className="text-purple-200/80 mb-4">
                Connect your wallet to view journals
              </p>
            </div>
          ) : journals?.length === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center bg-purple-900/10 rounded-xl border border-purple-500/10 p-6 text-center">
              <Notebook className="text-purple-400 mb-3" size={24} />
              <p className="text-purple-200/80 mb-4">No journals yet</p>
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
                onClick={() => {
                  // Add create journal logic here
                }}
              >
                Create Journal
              </button>
            </div>
          ) : (
            <div className="space-y-3 h-80 overflow-auto no-scrollbar border border-purple-700/70 rounded-lg">
              {journals?.map((journal) => (
                <div
                  key={journal._id}
                  onClick={() => handleJournalClick(journal as JournalEntry)}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    journal._id === activeJournalId
                      ? "bg-purple-900/40 border-purple-500/40 shadow-lg shadow-purple-900/20"
                      : "bg-purple-900/20 border-purple-500/10 hover:bg-purple-900/30"
                  } border`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-purple-300/70">
                      {moment(journal.createdAt).format("MMM D, YYYY")}
                    </p>
                    <button
                      className="p-1.5 rounded-full bg-purple-700/70 hover:bg-purple-600/80 transition-colors"
                      onClick={(e) =>
                        handleEditClick(journal as JournalEntry, e)
                      }
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-purple-200/90 line-clamp-3">
                    {journal.transcript}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generation Center Column */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center justify-center py-4">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-3 mx-auto">
                  <Loader2 className="animate-spin text-purple-400" size={24} />
                </div>
                <p className="text-sm text-purple-200/70">
                  Loading dream data...
                </p>
              </div>
            </div>
          ) : !isConnected ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <Wallet className="text-purple-400 mb-3" size={24} />
              <p className="text-purple-200/80 mb-2">Wallet not connected</p>
            </div>
          ) : journals?.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <Wand2 className="text-purple-400 mb-3" size={24} />
              <p className="text-purple-200/80 mb-2">No journals available</p>
              <p className="text-sm text-purple-200/60 mb-4">
                Create your first journal to start weaving
              </p>
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
                onClick={() => {
                  // Add create journal logic here
                }}
              >
                Create Journal
              </button>
            </div>
          ) : isGeneratingStory ? (
            <StoryGenerator
              isGenerating={isGeneratingStory}
              onComplete={handleGenerationComplete}
            />
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/20 pulse-glow">
                <Wand2 size={24} />
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-blue-200/70 mb-2">
                  {storyGenerated
                    ? "Dreamweaving Complete"
                    : "Ready to Weave Characters"}
                </p>
                {!storyGenerated && (
                  <div className="flex space-x-1 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-300/50 animate-ping"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full">
                <button
                  className={`w-full py-3 rounded-lg transition-all duration-300 font-medium shadow-md shadow-purple-900/30 ${
                    storyGenerated
                      ? "bg-green-600/80 hover:bg-green-500/90"
                      : "bg-gradient-to-r from-purple-600/80 to-pink-500/80 hover:from-purple-500/90 hover:to-pink-400/90"
                  }`}
                  onClick={handleWeaveDream}
                  disabled={!activeJournal || isGeneratingStory}
                >
                  {storyGenerated ? "Regenerate Story" : "Weave Characters"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Character Blueprint Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="h-80 overflow-auto no-scrollbar p-6 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-500/10 flex flex-col">
            <h3 className="text-xl font-medium mb-4 flex items-center">
              <Wand2 className="mr-2 text-blue-400" size={20} />
              <span>Character Blueprint</span>
            </h3>

            <div className="flex-1">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : !isConnected ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center opacity-60">
                    <Wallet className="text-blue-400 mx-auto mb-3" size={24} />
                    <p className="text-blue-200/80 text-sm">
                      Connect your wallet to view character blueprints
                    </p>
                  </div>
                </div>
              ) : !activeJournal ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center opacity-60">
                    <Flow size={48} className="mx-auto text-blue-400 mb-3" />
                    <p className="text-blue-200/80 text-sm">
                      {journals?.length === 0
                        ? "Create your first journal to begin"
                        : "Select a dream journal to view..."}
                    </p>
                    {journals?.length === 0 && (
                      <button
                        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm"
                        onClick={() => {
                          // Add create journal logic here
                        }}
                      >
                        Create Journal
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <p className="text-sm text-blue-200/90 mb-2">
                    {moment(activeJournal.createdAt).format(
                      "MMMM D, YYYY [at] h:mm A"
                    )}
                  </p>
                  <p className="text-blue-100">{activeJournal.transcript}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Panel */}
      {isEditing && (
        <div className="w-full p-6 rounded-2xl bg-purple-950/50 border border-purple-500/30 animate-fadeIn mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-purple-200">
              Edit Dream Journal
            </h4>
            <button
              className="p-1.5 rounded-full bg-purple-800/60 hover:bg-purple-700/70"
              onClick={() => setIsEditing(false)}
            >
              <X size={16} />
            </button>
          </div>
          <textarea
            className="w-full h-32 p-4 rounded-lg bg-purple-950/30 text-blue-50 placeholder-blue-300/40 border border-purple-500/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/30 resize-none transition-all duration-300"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Describe your dream..."
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="px-4 py-2 rounded-lg bg-purple-800/60 hover:bg-purple-700/70 transition-colors text-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-purple-600/70 hover:bg-purple-500/80 transition-colors text-sm flex items-center gap-2"
              onClick={handleSaveEdit}
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Display Area */}
      {storyGenerated && (
        <div className="w-full mb-12 dreamfade-in">
          <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium">Dream Analysis Results</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeView === "story"
                      ? "bg-purple-600/80"
                      : "bg-purple-900/50 hover:bg-purple-800/60"
                  } transition-colors`}
                  onClick={() => setActiveView("story")}
                >
                  <div className="flex items-center gap-2">
                    <Scroll size={14} />
                    <span>Story</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeView === "archetypes"
                      ? "bg-purple-600/80"
                      : "bg-purple-900/50 hover:bg-purple-800/60"
                  } transition-colors`}
                  onClick={() => setActiveView("archetypes")}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>Archetypes</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeView === "interpretation"
                      ? "bg-purple-600/80"
                      : "bg-purple-900/50 hover:bg-purple-800/60"
                  } transition-colors`}
                  onClick={() => setActiveView("interpretation")}
                >
                  <div className="flex items-center gap-2">
                    <Wand2 size={14} />
                    <span>Interpretation</span>
                  </div>
                </button>
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

      <div className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 mb-12">
        <h3 className="text-xl font-medium mb-4">Storyboard Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {storyGenerated
            ? sampleStoryData.scenes.map((scene, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
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
              ))
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
    </div>
  );
};

export default StoryboardConverter;
