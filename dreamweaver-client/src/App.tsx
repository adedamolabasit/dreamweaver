import { Routes, Route } from "react-router-dom";
import LandingPage from "./page-components/LandingPage";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, TomoEVMKitProvider } from "@tomo-inc/tomo-evm-kit";
import { storyAeneid } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@tomo-inc/tomo-evm-kit/styles.css";
import { UserProvider } from "./context/userContext";
import Journal from "./page-components/journal";
import Stories from "./page-components/stories";
import { StoryView } from "./page-components/stories/components/view";
import { WeaveStory } from "./page-components/weave/components/create";
import Profile from "./page-components/profile/components";
import NotFoundPage from "./page-components/notFound";
import { ToastProvider } from "./components/Toast";
import { ArtGallery } from "./page-components/stories/components/list/ArtGallery";
import { Helmet } from "react-helmet-async";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const config = getDefaultConfig({
  clientId: import.meta.env.VITE_CLIENT_ID,
  appName: "DreamWeaver",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [storyAeneid],
  ssr: false,
});

function App() {
  return (
    <>
      <Helmet>
        <title>My Dream App</title>
        <meta
          name="description"
          content="Craft and protect your creative dreams on-chain."
        />
        <meta property="og:title" content="My Dream App" />
        <meta
          property="og:description"
          content="Create and license your stories with ease."
        />
        <meta property="og:image" content="https://yourcdn.com/preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <ToastProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <TomoEVMKitProvider>
              <UserProvider>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/:id" element={<StoryView />} />
                  <Route path="/weave" element={<WeaveStory />} />
                  <Route path="/art-gallery" element={<ArtGallery />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </UserProvider>
            </TomoEVMKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ToastProvider>
    </>
  );
}

export default App;
