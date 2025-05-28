import React, { useState } from "react";
import {
  Flower as Flow,
  CloudLightning,
  Wand2,
  BookOpen,
  Edit,
  Plus,
  Trash,
} from "lucide-react";
import { JournalEntry } from "../../types/types";

const DreamJournalStack: React.FC = () => {
  const [journals, setJournals] = useState<JournalEntry[]>([
    {
      id: "1",
      transcript: "I was walking through a city suspended in the clouds...",
      createdAt: "May 15",
    },
    {
      id: "2",
      transcript:
        "Found myself breathing underwater in a bioluminescent forest...",
      createdAt: "May 12",
    },
    {
      id: "3",
      transcript: "Traveled between stars on a vessel made of light...",
      createdAt: "May 8",
    },
  ]);

  const [activeJournalId, setActiveJournalId] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>("");

  const handleCardClick = (id: number) => {
    if (activeJournalId === id) {
      // If already active, toggle edit mode
      const journal = journals.find((j) => j.id === id.toString());
      if (journal && !isEditing) {
        setEditContent(journal.transcript);
        setIsEditing(true);
      }
    } else {
      // Select this journal and exit edit mode
      setActiveJournalId(id);
      setIsEditing(false);
    }
  };

  const handleSaveEdit = () => {
    setJournals(
      journals.map((journal) =>
        journal.id === activeJournalId.toString()
          ? { ...journal, content: editContent }
          : journal
      )
    );
    setIsEditing(false);
  };

  const activeJournal = journals.find(
    (j) => j.id === activeJournalId.toString()
  );

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium flex items-center">
          <BookOpen className="mr-2 text-purple-400" size={20} />
          <span>Dream Journals</span>
        </h3>
        <button
          className="p-1.5 rounded-lg bg-purple-500/30 hover:bg-purple-500/50 transition-colors text-purple-200"
          title="Add new journal"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="relative h-[300px] mb-4 perspective-1000">
        {/* Card Stack */}
        <div className="absolute inset-x-0 top-0 bottom-0">
          {journals.map((journal, index) => {
            const isActive = journal.id === activeJournalId.toString();
            const zIndex = journals.length - index;
            const offset = isActive
              ? 0
              : Math.min((journals.length - index - 1) * 8, 24);
            const rotation = isActive ? 0 : (journals.length - index - 1) * -1;

            return (
              <div
                key={journal.id}
                className={`absolute inset-0 p-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "shadow-xl bg-purple-900/40"
                    : "bg-purple-900/20 opacity-90"
                } border ${
                  isActive ? "border-purple-500/40" : "border-purple-500/10"
                } cursor-pointer hover:translate-y-[-2px]`}
                style={{
                  transform: `translateY(${offset}px) rotate(${rotation}deg)`,
                  zIndex: isActive ? journals.length + 1 : zIndex,
                }}
                onClick={() => handleCardClick(parseInt(journal.id))}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-medium text-purple-100">
                      {journal.transcript}
                    </h4>
                    <p className="text-xs text-purple-300/70">
                      {journal.createdAt}
                    </p>
                  </div>
                  {isActive && !isEditing && (
                    <button
                      className="p-1.5 rounded-full bg-purple-700/70 hover:bg-purple-600/80 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditContent(journal.transcript);
                        setIsEditing(true);
                      }}
                    >
                      <Edit size={14} />
                    </button>
                  )}
                </div>

                {isActive && isEditing ? (
                  <div className="animate-fadeIn">
                    <textarea
                      className="w-full h-[180px] p-3 rounded-lg bg-purple-950/30 text-blue-50 placeholder-blue-300/40 border border-purple-500/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/30 resize-none transition-all duration-300 text-sm"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    ></textarea>
                    <div className="flex gap-2 mt-3 justify-end">
                      <button
                        className="py-1 px-3 rounded-lg bg-purple-800/60 hover:bg-purple-700/70 transition-colors text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-1 px-3 rounded-lg bg-purple-600/70 hover:bg-purple-500/80 transition-colors text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      isActive ? "block" : "hidden"
                    } animate-fadeIn`}
                  >
                    <p className="text-sm text-purple-200/90 line-clamp-6">
                      {journal.transcript}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Journal Navigation */}
      <div className="flex justify-center gap-1.5 mt-2">
        {journals.map((journal) => (
          <button
            key={journal.id}
            className={`w-2 h-2 rounded-full transition-all ${
              journal.id === activeJournalId.toString()
                ? "bg-purple-400 scale-125"
                : "bg-purple-400/30 hover:bg-purple-400/50"
            }`}
            onClick={() => {
              setActiveJournalId(parseInt(journal.id));
              setIsEditing(false);
            }}
            aria-label={`View journal: ${journal.transcript}`}
          ></button>
        ))}
      </div>

      {/* Bottom Actions */}
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
  );
};

export default DreamJournalStack;
