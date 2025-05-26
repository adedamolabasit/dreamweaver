import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DreamWeaver from './components/DreamWeaver';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dream" element={<DreamWeaver />} />
    </Routes>
  );
}

export default App;