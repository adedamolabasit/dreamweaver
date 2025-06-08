import React from "react";

import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Palette, Stars, Wand2 } from "lucide-react";
import DreamyBackground from "../../components/Background/DreamyBackground";

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 dreamcard">
    <div className="text-amber-300 mb-4">{icon}</div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-blue-100/70 font-light">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain size={24} />,
      title: "Dream Analysis",
      description:
        "Transform your dreams into meaningful insights with our advanced Jungian archetype analysis system.",
    },
    {
      icon: <Palette size={24} />,
      title: "Visual Storyboarding",
      description:
        "Convert dream narratives into vivid visual stories and character designs with AI-powered tools.",
    },
    {
      icon: <Stars size={24} />,
      title: "Dream Gallery",
      description:
        "Build and explore a personal collection of dream worlds, characters, and narratives.",
    },
    {
      icon: <Wand2 size={24} />,
      title: "Dream Minting",
      description:
        "Turn your most precious dream creations into unique digital assets in the dreamverse.",
    },
  ];

  return (
    <div className=" min-h-screen   text-white font-serif relative overflow-hidden">
      <DreamyBackground />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-300" />
            <span className="text-2xl font-semibold">DreamWeaver Protocol</span>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-200">
                Transform Your Dreams
              </span>
              <br />
              <span className="text-blue-200">Into Reality</span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100/80 font-light mb-8 leading-relaxed">
              Step into a world where your dreams become tangible creations.
              Analyze, visualize, and preserve your dreamscape with our
              innovative protocol.
            </p>

            <button
              onClick={() => navigate("/stories")}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 font-medium text-lg shadow-lg shadow-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Enter the Dreamverse</span>
                <Sparkles className="group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-blue-200/60 font-light max-w-2xl mx-auto">
              Join us in revolutionizing how we capture, understand, and share
              the infinite possibilities of our dream experiences. Your journey
              into the dreamverse begins here.
            </p>
          </div>
        </main>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </div>
  );
};

export default LandingPage;
