const memesGrid = document.getElementById('memes-grid');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('error-msg');

// Imagen limpia de respaldo por si hya fallas
const IMAGEN_FALLBACK = 'https://i.imgflip.com/1g8my4.jpg';

export function renderizarMemes(listaMemes) {
  if (!memesGrid) return;
  memesGrid.innerHTML = '';

  listaMemes.forEach(meme => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Estructura DOM 
    card.innerHTML = `
      <div class="card-img-container">
        <img src="${meme.url}" alt="${meme.title}" loading="lazy">
      </div>
      <div class="card-body">
        <h3 class="card-title">${meme.title}</h3>
        <div class="card-footer">
          <span>👤 u/${meme.author || 'otaku_anonimo'}</span>
          <span class="upvotes">⬆️ ${meme.ups || Math.floor(Math.random() * 2000 + 500)}</span>
        </div>
      </div>
    `;

    const imgElement = card.querySelector('img');
    if (imgElement) {
      imgElement.addEventListener('error', () => {
        imgElement.src = IMAGEN_FALLBACK;
      });
    }

    memesGrid.appendChild(card);
  });
}

export function mostrarCargando(estado) {
  if (loader) loader.style.display = estado ? 'block' : 'none';
  if (estado && memesGrid) {
    memesGrid.innerHTML = '';
    if (errorMsg) errorMsg.style.display = 'none';
  }
}

export function mostrarError(mensaje) {
  if (errorMsg) {
    errorMsg.textContent = mensaje;
    errorMsg.style.display = 'block';
  }
}