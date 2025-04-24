import React, { useState } from 'react';
import './style.css';
import logo from '../public/logo.png';

export default function App() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="app-container">
      <img src={logo} alt="Logo" className="logo-top-right" />
      <div className="form-box">
        <h2>Gestion des Anomalies Chariots</h2>
        <form>
          <label>Code Chariot :</label>
          <input type="text" placeholder="Scannez ou entrez le code" />

          <label>Numéro de Série :</label>
          <input type="text" placeholder="Numéro de série" />

          <label>État du chariot :</label>
          <select>
            <option>--Choisir une anomalie--</option>
            <option>Chariot fonctionnel</option>
            <option>Chariot endommagé mais roulant</option>
            <option>Chariot à l'arrêt</option>
          </select>

          <label>Commentaires :</label>
          <textarea placeholder="Commentaires..."></textarea>

          <label>Photo (facultatif) :</label>
          <input type="file" />

          <button type="submit">Envoyer</button>
        </form>
        <button className="scan-btn" onClick={() => setShowScanner(true)}>Scanner</button>
        {showScanner && (
          <div className="scanner-popup">
            <p>Interface de scan (à intégrer avec une lib JS réelle)</p>
            <button onClick={() => setShowScanner(false)}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}
