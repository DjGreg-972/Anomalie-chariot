import React, { useState } from 'react';
import './style.css';
import QrScanner from 'react-qr-scanner';

export default function App() {
  const [code, setCode] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [state, setState] = useState('');
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setCode(data.text || data);
      setScanOpen(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ code, serialNumber, state, comment, photo });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Anomalies Chariots</h1>
        <img src="/logo.png" alt="Logo Kuehne+Nagel" className="logo" />
      </header>
      <form onSubmit={handleSubmit}>
        <label>Code Chariot :</label>
        <div className="row">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="button" onClick={() => setScanOpen(true)}>Scanner</button>
        </div>

        <label>Numéro de Série :</label>
        <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />

        <label>État du chariot :</label>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">--Choisir une anomalie--</option>
          <option value="fonctionnel">Chariot fonctionnel</option>
          <option value="endommagé">Chariot endommagé mais roulant</option>
          <option value="arret">Chariot à l'arrêt</option>
        </select>

        <label>Commentaires :</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

        <label>Photo (facultatif) :</label>
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

        <button type="submit">Envoyer</button>
      </form>

      {scanOpen && (
        <div className="scan-popup">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <button onClick={() => setScanOpen(false)}>Fermer</button>
        </div>
      )}
    </div>
  );
}