import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Landing Page/Sidebar';
import Navigation from './components/Landing Page/Navigation';
import MainContent from './components/Landing Page/MainContent';
import EQ from './assets/EQ.png';
import { Game } from './components/Game/Game';

const Home: React.FC = () => (
  <div className="min-h-screen bg-[#1a0b2e] flex">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navigation />
      <div className="flex-1 flex">
        <MainContent />
        <div className="p-8">
          <img
            src={EQ}
            width={400}
            height={400}
            alt="Chess pieces artistic illustration"
            className="rounded-xl mx-40"
          />
        </div>
      </div>
    </div>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-screen bg-[#1a0b2e] flex justify-center items-center text-white">
    <h1 className="text-4xl">404 - Page Not Found</h1>
  </div>
);

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);

export default App;
