import { fetchMemes } from './api.js';
import { renderizarMemes, mostrarCargando, mostrarError } from './ui.js';

const btnMore = document.getElementById('btn-more-memes');

// Inicialización del dom
document.addEventListener('DOMContentLoaded', cargarMemes);

if (btnMore) {
  btnMore.addEventListener('click', cargarMemes);
}

async function cargarMemes() {
  mostrarCargando(true);

  try {
    const memes = await fetchMemes();
    renderizarMemes(memes);
  } catch (error) {
    console.error('Error crítico al cargar:', error);
    mostrarError('Ocurrió un error inesperado al cargar los memes.');
  } finally {
    mostrarCargando(false);
  }
}