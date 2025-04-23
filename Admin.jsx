import React, { useState } from 'react';

function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [emails, setEmails] = useState(['djmoot972@gmail.com']);

  const handleLogin = () => {
    if (password === 'admin59') {
      setAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleAddEmail = () => {
    const newEmail = prompt("Nouvelle adresse email à ajouter :");
    if (newEmail) {
      setEmails([...emails, newEmail]);
    }
  };

  const handleRemoveEmail = (index) => {
    const newList = [...emails];
    newList.splice(index, 1);
    setEmails(newList);
  };

  if (!authenticated) {
    return (
      <div className="app">
        <h2>Accès Admin</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h2>Mode Administrateur</h2>
      <p>Liste des destinataires d'email :</p>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            {email}
            <button onClick={() => handleRemoveEmail(index)} style={{ marginLeft: '10px' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddEmail}>Ajouter une adresse</button>
    </div>
  );
}

export default Admin;