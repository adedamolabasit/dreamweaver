import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { NightSkyBackground } from './components/NightSkyBackground';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Weaver } from './pages/Weaver';
import { Stories } from './pages/Stories';
import { Videos } from './pages/Videos';
import { Gallery } from './pages/Gallery';
import { Community } from './pages/Community';
import { DreamDetail } from './pages/DreamDetail';
import { StoryDetail } from './pages/StoryDetail';
import { VideoDetail } from './pages/VideoDetail';
import { ArtworkDetail } from './pages/ArtworkDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <NightSkyBackground />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/weaver" element={<Weaver />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dream/:id" element={<DreamDetail />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;