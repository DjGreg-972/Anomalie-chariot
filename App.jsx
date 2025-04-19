import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function App() {
  const [code, setCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [desc, setDesc] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      code,
      description: desc,
      image: photo ? photo.split(',')[1] : ''
    };
    emailjs.send('service_xxx', 'template_xxx', formData, 'user_xxx')
      .then(() => alert("Anomalie envoyée !"))
      .catch((error) => console.error("Erreur :", error));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="app">
      <h2>Formulaire d'anomalie</h2>
      <form onSubmit={handleSubmit}>
        <label>Code-barres du chariot</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        
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