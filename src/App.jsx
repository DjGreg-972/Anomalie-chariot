
import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [code, setCode] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [state, setState] = useState('');
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ code, serialNumber, state, comment, photo });
    // Logique d'envoi
  };

  return (
    <div className="container">
      <h1>Gestion des Anomalies Chariots</h1>
      <form onSubmit={handleSubmit}>
        <label>Code Chariot :</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        
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
    </div>
  );
}
