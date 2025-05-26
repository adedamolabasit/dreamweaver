import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import Navigation from "./Navigation";
import VoiceJournal from "./VoiceJournal";
import StoryboardConverter from "./StoryboardConverter";
import ArchetypeAnalyzer from "./ArchetypeAnalyzer";
import DreamGallery from "./DreamGallery";
import MintDream from "./MintDream";
import DreamyBackground from "./DreamyBackground";

function DreamWeaver() {
  const [activeSection, setActiveSection] = useState("journal");

  const renderSection = () => {
    switch (activeSection) {
      case "journal":
        return <VoiceJournal />;
      case "storyboard":
        return <StoryboardConverter />;
      case "archetype":
        return <ArchetypeAnalyzer />;
      case "gallery":
        return <DreamGallery />;
      case "mint":
        return <MintDream />;
      default:
        return <VoiceJournal />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-serif text-white">
      <DreamyBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="fixed p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-300" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                DreamWeaver
              </span>
              <span className="text-blue-200"> Protocol</span>
            </h1>
          </div>
        </header>

        <main className="flex-1 px-4 py-6  mt-28 md:p-8">
          {renderSection()}
        </main>

        <div className="fixed top-0 w-full flex justify-center ">
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
}

export default DreamWeaver;
