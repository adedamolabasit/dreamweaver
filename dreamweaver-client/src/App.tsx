import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DreamWeaver from "./components/DreamWeaver";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, TomoEVMKitProvider } from "@tomo-inc/tomo-evm-kit";
import { storyAeneid } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@tomo-inc/tomo-evm-kit/styles.css";
import { UserProvider } from "./context/userContext";

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
    <WagmiProvider config={config}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <TomoEVMKitProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dream" element={<DreamWeaver />} />
            </Routes>
          </TomoEVMKitProvider>
        </QueryClientProvider>
      </UserProvider>
    </WagmiProvider>
  );
}

export default App;
