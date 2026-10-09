const API_URL = 'https://meme-api.com/gimme/AnimemesESP/6';

//Todo esta parte nos sirve para tener un resplado en datos locales
//Si la api llega a fallar la pagina no quedara vacia, si no que se mostraran memes locales
//De este modo se mantiene una consistencia de contenido
const MEMES_GRACIOSOS = [
  {
    title: "Cuando dices 'un episodio más y me duermo' a las 2:00 AM 🤡",
    url: "https://i.imgflip.com/1g8my4.jpg",
    author: "desvelado_99",
    ups: 3420
  },
  {
    title: "Mi mamá viendo cómo me gasto la quincena en una figura de plástico 💸",
    url: "https://i.imgflip.com/30b1gx.jpg",
    author: "otaku_sin_pasta",
    ups: 2890
  },
  {
    title: "El villano después de escuchar que empieza a sonar el opening 💀",
    url: "https://i.imgflip.com/26am.jpg",
    author: "prota_power",
    ups: 4120
  },
  {
    title: "Yo intentando recordar el nombre del isekai de 35 palabras 📜",
    url: "https://i.imgflip.com/1ur9b0.jpg",
    author: "memes_otaku_es",
    ups: 1980
  }
];

export async function fetchMemes() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const respuesta = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!respuesta.ok) throw new Error(`HTTP Error: ${respuesta.status}`);

    const datos = await respuesta.json();

    if (datos.memes && datos.memes.length > 0) {
      return datos.memes;
    }
    throw new Error('No se recibieron memes válidos.');

  } catch (error) {
    console.warn('API no disponible. Cargando datos locales:', error.message);
    // Retorna los memes locales
    return [...MEMES_GRACIOSOS].sort(() => Math.random() - 0.5);
  }
}