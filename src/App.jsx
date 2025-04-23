import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import "./style.css";

function App() {
  return (
    <div>
      <header>
        <h1>Gestion des Anomalies Chariots</h1>
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kuehne%2BNagel_Logo.svg/2560px-Kuehne%2BNagel_Logo.svg.png"
            alt="Kuehne+Nagel"
          />
        </a>
      </header>

      <form>
        <label htmlFor="chariot">Code Chariot :</label>
        <input type="text" id="chariot" name="chariot" placeholder="Scannez ou entrez le code" />

        <label htmlFor="anomalie">Type d'anomalie :</label>
        <select id="anomalie" name="anomalie">
          <option value="">--Choisir une anomalie--</option>
          <option value="roue">Problème de roue</option>
          <option value="frein">Problème de frein</option>
          <option value="autre">Autre</option>
        </select>

        <label htmlFor="photo">Photo (facultatif) :</label>
        <input type="file" id="photo" name="photo" accept="image/*" capture="environment" />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default MainApp;