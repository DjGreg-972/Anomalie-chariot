import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function App() {
  const [code, setCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [desc, setDesc] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Anomalie envoyée !");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 100 } },
        false
      );

      scanner.render(
        (decodedText) => {
          setCode(decodedText);
          scanner.clear();
          setScanning(false);
        },
        (error) => {
          console.warn("Erreur scan : ", error);
        }
      );
    }
  }, [scanning]);

  return (
    <div className="app">
      <h2>Formulaire d'anomalie</h2>
      <form onSubmit={handleSubmit}>
        <label>Code-barres du chariot</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
          <button type="button" onClick={() => setScanning(true)}>Scanner</button>
        </div>

        {scanning && <div id="reader" style={{ marginTop: 20 }}></div>}

        <label>Description de l'anomalie</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required />

        <label>Photo</label>
        <input type="file" accept="image/*" onChange={handleImage} />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
