import React, { useEffect, useState, useRef } from "react";
import { Flower as Flow, Wand2, Edit, Save, X, Plus } from "lucide-react";
import { Wallet, Loader2, Notebook } from "lucide-react";
import { DashboardLayout } from "../../../../components/Layout";
import { useToast } from "../../../../components/Toast";
import {
  useWeaveDream,
  useInitiateProduction,
} from "../../../../hooks/useProduction";
import { useAccount } from "wagmi";
import moment from "moment";
import { useUpdateJournal } from "../../../../hooks/useJournal.";
import { useGetProductionById } from "../../../../hooks/useProduction";
import { useGetAllUsersJournals } from "../../../../hooks/useJournal.";
import { JournalEntry } from "../../types";
import DreamLoader from "../../../../components/Loader/DreamLoader";
import { useNavigate } from "react-router-dom";

export const WeaveStory = ({}: { handleActiveTab?: (tab: string) => void }) => {
  const [isGeneratingStory, setIsGeneratingStory] = useState<boolean>(false);
  const [storyGenerated, setStoryGenerated] = useState<boolean>(false);
  const [productionId, setProdutionId] = useState<string | undefined>("");

  const [activeJournalId, setActiveJournalId] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>("");

  const navigate = useNavigate();

  const {
    data: journals,
    isLoading,
    refetch: refetchJournal,
  } = useGetAllUsersJournals();
  const { mutate: updateJournal } = useUpdateJournal();
  const { mutate: weaveDream } = useWeaveDream();
  const { mutate: initiateProducttion } = useInitiateProduction();
  const { refetch: refetchProduction } = useGetProductionById(
    productionId || ""
  );
  const { isConnected } = useAccount();

  const hasAuthenticatedRef = useRef(false);

  const { showInfo, showError } = useToast();

  useEffect(() => {
    refetchJournal();
    if (journals && journals.length > 0 && !activeJournalId) {
      setActiveJournalId(journals[0]._id);
    }
  }, [journals, refetchJournal]);
  useEffect(() => {
    if (!isGeneratingStory) return;

    const intervalId = setInterval(() => {
      refetchProduction();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isGeneratingStory, refetchProduction]);

  let progressText =
    "Weaving your dream — this takes about 2 minutes. You can leave this page; your story will appear in your profile shortly.";

  const handleEditClick = (journal: JournalEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveJournalId(journal._id);
    setEditContent(journal.transcript);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!activeJournalId) return;

    updateJournal(
      { id: activeJournalId, transcript: editContent },
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
    setStoryGenerated(false);
  };

  const handleIntiateProduction = async (productionId: string) => {
    initiateProducttion(productionId, {
      onSuccess: () => {
        showInfo("Story production initiated...");

        refetchProduction();
      },
      onError: (err: any) => {
        console.error("Mutation failed:", err);
      },
    });
  };

  const handleWeaveDream = async () => {
    if (!activeJournalId) return;

    setIsGeneratingStory(true);
    weaveDream(activeJournalId, {
      // todo: ccheck here
      onSuccess: (data: any) => {
        if (data._id) {
          setProdutionId(data._id);
          showInfo("Dream submitted for production...");
          handleIntiateProduction(data._id);
        }
      },
      onError: () => {
        showError("eaving failed");
        setIsGeneratingStory(false);
      },
    });
  };

  const activeJournal = journals?.find((j) => j._id === activeJournalId);

  useEffect(() => {
    if (isConnected) {
      hasAuthenticatedRef.current = true;
      if (hasAuthenticatedRef.current === true) {
        refetchProduction();
      }
    }
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center max-w-4xl mx-auto mb-24">
        <div className="text-center mb-8 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
            Dream Weaver
          </h2>
          <p className="text-blue-100/80 max-w-2xl font-light">
            Select a dream journal to weave into a visual story
          </p>
        </div>

        {isEditing && activeJournal && (
          <div className="w-full p-6 rounded-2xl bg-purple-950/50 border border-purple-500/30 animate-fadeIn mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-purple-200">
                Editing:{" "}
                {moment(activeJournal.createdAt).format("MMMM D, YYYY")}
              </h4>
              <div className="flex gap-2">
                <button
                  className="p-1.5 rounded-full bg-purple-800/60 hover:bg-purple-700/70"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-40 p-4 rounded-lg bg-purple-950/30 text-blue-50 placeholder-blue-300/40 border border-purple-500/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/30 resize-none transition-all duration-300"
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

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Your Dream Journals</h3>
              <button
                className="px-3 py-1.5 rounded-lg bg-purple-600/70 hover:bg-purple-500/80 transition-colors text-sm flex items-center gap-2"
                onClick={() => {
                  if (!isConnected) {
                    showInfo("Please connect your walllet");
                    return;
                  }
                  navigate("/journal");
                }}
              >
                <Plus size={16} />
                <span>New Journal</span>
              </button>
            </div>

            {isLoading ? (
              <div className="h-80 flex items-center justify-center rounded-lg bg-purple-900/10">
                <DreamLoader message="Loading journal..." size="lg" />
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
                  onClick={() => {}}
                >
                  Create Your First Journal
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[700px] overflow-y-auto no-scrollbar pr-2">
                {journals?.map((journal) => (
                  <div
                    key={journal._id}
                    onClick={() => handleJournalClick(journal as JournalEntry)}
                    className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      journal._id === activeJournalId
                        ? "bg-purple-900/40 border-purple-500/40 shadow-lg shadow-purple-900/20"
                        : "bg-purple-900/20 border-purple-500/10 hover:bg-purple-900/30"
                    } border flex justify-between items-start`}
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs text-purple-300/70">
                          {moment(journal.createdAt).format("MMM D, YYYY")}
                        </p>
                        <button
                          className="p-1.5 rounded-full bg-purple-700/70 hover:bg-purple-600/80 transition-colors ml-2"
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className=" col-span-1 md:col-span-1">
            <div className="h-full flex flex-col">
              <div className="max-h-96 flex-1 p-6 rounded-2xl bg-blue-900/20 backdrop-blur-sm border border-blue-500/10 mb-4 overflow-auto no-scrollbar">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Wand2 className="mr-2 text-blue-400" size={20} />
                  <span>Selected Dream</span>
                </h3>

                {activeJournal ? (
                  <div className="animate-fadeIn">
                    <p className="text-sm text-blue-300/80 mb-2">
                      {moment(activeJournal.createdAt).format("MMMM D, YYYY")}
                    </p>
                    <p className="text-blue-100 text-sm">
                      {activeJournal.transcript}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full opacity-60">
                    <p className="text-blue-200/80 text-sm">
                      Select a journal to view details
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-purple-900/20 backdrop-blur-sm border border-purple-500/10">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Flow className="mr-2 text-purple-400" size={20} />
                  <span>Weave Actions</span>
                </h3>

                {isGeneratingStory ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                      <Loader2
                        className="animate-spin text-purple-400"
                        size={24}
                      />
                    </div>
                    <p className="text-sm text-purple-200/70">{progressText}</p>
                  </div>
                ) : (
                  <>
                    <button
                      className={`w-full py-3 rounded-lg transition-all duration-300 font-medium shadow-md ${
                        activeJournal
                          ? "bg-gradient-to-r from-purple-600/80 to-pink-500/80 hover:from-purple-500/90 hover:to-pink-400/90"
                          : "bg-gray-600/50 cursor-not-allowed"
                      }`}
                      onClick={handleWeaveDream}
                      disabled={!activeJournal || isGeneratingStory}
                    >
                      {storyGenerated ? "Re-weave Story" : "Weave This Dream"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
