document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chariotForm');
  const list = document.getElementById('chariotList');

  const loadChariots = () => {
    const data = JSON.parse(localStorage.getItem('chariots') || '[]');
    list.innerHTML = '';
    data.forEach((c) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${c.nom}</strong> — <span class="etat ${c.etat}">${getEtatLabel(c.etat)}</span>`;
      list.appendChild(li);
    });
  };

  const getEtatLabel = (etat) => {
    switch (etat) {
      case 'vert': return 'Fonctionnel';
      case 'orange': return 'En réparation';
      case 'rouge': return 'En panne';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const etat = document.getElementById('etat').value;
    const chariots = JSON.parse(localStorage.getItem('chariots') || '[]');
    chariots.push({ nom, etat });
    localStorage.setItem('chariots', JSON.stringify(chariots));
    form.reset();
    loadChariots();
  });

  loadChariots();
});
