import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DreamWeaver from "./components/DreamWeaver";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, TomoEVMKitProvider } from "@tomo-inc/tomo-evm-kit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@tomo-inc/tomo-evm-kit/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const config = getDefaultConfig({
  clientId:
    "",
  appName: "DreamWeaver",
  projectId: "",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dream" element={<DreamWeaver />} />
          </Routes>
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
