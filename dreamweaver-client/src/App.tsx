import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DreamWeaver from "./components/DreamWeaver";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dream" element={<DreamWeaver />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
