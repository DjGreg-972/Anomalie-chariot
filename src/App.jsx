import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import AppForm from "./App";
import "./style.css";

function MainApp() {
  return (
    <Router>
      <header>
        <h1>Gestion des Anomalies Chariots</h1>
        <img
          src="https://anomalie-chariot.vercel.app/logo.png"
          alt="Kuehne+Nagel"
        />
      </header>
      <Routes>
        <Route path="/" element={<AppForm />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default MainApp;