import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from './GamePage';

function App() {
  return (
    <div className="App w-full h-full bg-slate-100">
    <Router>
      <Routes>        
        <Route path="/" element={<GamePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/:gameName" element={<GamePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

