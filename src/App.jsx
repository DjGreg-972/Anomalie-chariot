import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import "./style.css";

function Scanner({ onScan, onClose }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/html5-qrcode";
    script.async = true;
    script.onload = () => {
      const html5QrCode = new Html5Qrcode("scanner");
      Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
          html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 150 },
            qrCodeMessage => {
              onScan(qrCodeMessage);
              html5QrCode.stop().then(onClose);
            }
          );
        }
      });
    };
    document.body.appendChild(script);
  }, [onScan, onClose]);

  return (
    <div>
      <div id="scanner" className="scanner-box"></div>
      <button type="button" onClick={onClose} className="close-scan">Fermer</button>
    </div>
  );
}

function App() {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = value => {
    const input = document.getElementById("chariot");
    if (input) input.value = value;
  };

  return (
    <div>
      <header>
        <h1>Gestion des Anomalies Chariots</h1>
        <img src="/logo.png" alt="Kuehne+Nagel Logo" className="logo" />
      </header>

      <form>
        <div className="scan-row">
          <label htmlFor="chariot">Code Chariot :</label>
          <input type="text" id="chariot" name="chariot" placeholder="Scannez ou entrez le code" />
          <button type="button" onClick={() => setShowScanner(true)} className="scan-button">Scanner</button>
        </div>
        {showScanner && <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />}

        <label htmlFor="etat">État du chariot :</label>
        <select id="etat" name="etat">
          <option value="">--Sélectionner un état--</option>
          <option value="fonctionnel">Chariot fonctionnel</option>
          <option value="endommagé">Chariot endommagé mais roulant</option>
          <option value="arret">Chariot à l’arrêt</option>
        </select>

        <label htmlFor="commentaire">Commentaires :</label>
        <textarea id="commentaire" name="commentaire" rows="4" placeholder="Ajoutez un commentaire..."></textarea>

        <label htmlFor="photo">Photo (facultatif) :</label>
        <input type="file" id="photo" name="photo" accept="image/*" />

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