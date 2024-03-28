import React from 'react';
import SignInSignUp from '../src/components/SignInSignUp';
import './App.css';
import { Map } from './components/Map';
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import IncidentReportForm from './components/form';

function App() {
  return (
    <div className="App">
      
      
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/feedback" element={<IncidentReportForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
