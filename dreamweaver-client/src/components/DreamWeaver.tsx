import { useState } from "react";
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
