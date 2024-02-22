import React from 'react';
import SignInSignUp from '../src/components/SignInSignUp';
import './App.css';
import { Map } from './components/Map';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
