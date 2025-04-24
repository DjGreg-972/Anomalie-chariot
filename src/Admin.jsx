import React, { useState } from 'react';
import './style.css';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="container">
        <h2>Page Admin</h2>
        <p>Bienvenue dans l'interface d'administration.</p>
        {/* Tu peux rajouter ici tes composants d'administration */}
      </div>
    );
  }

  return (
    <div className="container">
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
