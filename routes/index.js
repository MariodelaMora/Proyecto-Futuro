const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tengo algo para ti... ❤️' });
});

/* GET historia - Solo con los archivos que tienes ahora */
router.get('/nuestra-historia', function(req, res, next) {
  const hitos = [
    {
      tipo: 'imagen',
      src: '/images/fiesta.jpg',
      fecha: '25 Octubre 2025',
      titulo: 'Donde todo empezó',
      desc: 'Esa noche se quedó grabada en el log de mi vida.'
    },
    {
      tipo: 'imagen',
      src: '/images/rio.jpg',
      fecha: '1 Noviembre 2025',
      titulo: 'Paz',
      desc: 'Un día de desconexión total.'
    },
    {
      tipo: 'video',
      src: '/videos/paseo.mp4',
      fecha: '2 Diciembre 2025',
      titulo: 'Nuestras risas',
      desc: 'Caminando y riendo, como siempre.'
    },
    {
      tipo: 'imagen',
      src: '/images/calma.jpg',
      fecha: '9 Diciembre 2025',
      titulo: 'Momentos nuestros',
      desc: 'La tranquilidad de estar a tu lado.'
    },
    {
      tipo: 'imagen',
      src: '/images/mueca.jpg',
      fecha: '22 Diciembre 2025',
      titulo: 'Haciendo el tonto',
      desc: 'Tus mofletes son mi debilidad.'
    },
    {
      tipo: 'imagen',
      src: '/images/selfie-nochevieja.jpg',
      fecha: '31 Diciembre 2025',
      titulo: 'Fin de año',
      desc: 'Terminando el 2025 de la mejor manera.'
    },
    {
      tipo: 'video',
      src: '/videos/uvas.mp4',
      fecha: '1 Enero 2026',
      titulo: '¡Feliz 2026!',
      desc: 'Las uvas más raras y divertidas.'
    },
    {
      tipo: 'video',
      src: '/videos/mimos.mp4',
      fecha: '2 Febrero 2026',
      titulo: 'Mimos',
      desc: 'Cualquier sitio es bueno si es contigo.'
    },
    {
      tipo: 'imagen',
      src: '/images/san-valentin.jpg',
      fecha: '14 Febrero 2026',
      titulo: '14 de Febrero',
      desc: 'Un espejo, unas flores y nosotros.'
    },
    {
      tipo: 'imagen',
      src: '/images/marzo-playa.jpg',
      fecha: '17 Marzo 2026',
      titulo: 'Playa',
      desc: 'Días de sol y sal.'
    },
    {
      tipo: 'imagen',
      src: '/images/marzo-vistas.jpg',
      fecha: '17 Marzo 2026',
      titulo: 'Escaleras al mar',
      desc: 'Vistas increíbles en la mejor compañía.'
    },
    {
      tipo: 'imagen',
      src: '/images/flores-coche.jpg',
      fecha: '19 Marzo 2026',
      titulo: 'Sorpresas',
      desc: 'Un detalle en el camino.'
    },
    {
      tipo: 'imagen',
      src: '/images/marzo-costa.jpg',
      fecha: '23 Marzo 2026',
      titulo: 'Acantilados',
      desc: 'Mirando al horizonte contigo.'
    },
    {
      tipo: 'imagen',
      src: '/images/goku-relax.jpg',
      fecha: '24 Marzo 2026',
      titulo: 'Modo Friki',
      desc: 'Goku y relax, planazo.'
    },
    {
      tipo: 'imagen',
      src: '/images/cumple-tarta.jpg',
      fecha: '27 Marzo 2026',
      titulo: 'Mi cumple 🎂',
      desc: 'Soplando velas a tu lado.'
    },
    {
      tipo: 'imagen',
      src: '/images/bañera.jpg',
      fecha: '27 Marzo 2026',
      titulo: 'Relax total',
      desc: 'Celebrando los 24.'
    },
    {
      tipo: 'imagen',
      src: '/images/helado.jpg',
      fecha: '31 Marzo 2026',
      titulo: 'San Vicente',
      desc: 'Helados y paseos por tu tierra.'
    },
    {
      tipo: 'imagen',
      src: '/images/san-vicente-beso.jpg',
      fecha: '31 Marzo 2026',
      titulo: 'El beso',
      desc: 'Frente al mar, nada más que decir.'
    },
    {
      tipo: 'imagen',
      src: '/images/sanvi%20normal.jpg', // Usamos %20 para el espacio
      fecha: '31 Marzo 2026',
      titulo: 'San Vicente de la Barquera',
      desc: 'Recorriendo tus rincones favoritos.'
    },
    {
      tipo: 'imagen',
      src: '/images/sanvi-loca.jpg',
      fecha: '31 Marzo 2026',
      titulo: 'Risas en Sanvi',
      desc: 'Porque contigo todo es más divertido.'
    },
    {
      tipo: 'imagen',
      src: '/images/atardecer-vacas.jpg',
      fecha: '31 Marzo 2026',
      titulo: 'Atardecer',
      desc: 'Vacas, mar y nosotros.'
    },
    {
      tipo: 'video',
      src: '/videos/paseo-manos.mov',
      fecha: '9 Abril 2026',
      titulo: 'De la mano',
      desc: 'No me sueltes nunca.'
    },
    {
      tipo: 'video',
      src: '/videos/covadonga.mov',
      fecha: '14 Abril 2026',
      titulo: 'Covadonga',
      desc: 'Un lugar mágico para una historia mágica.'
    }
  ];

  res.render('historia', { title: 'Nuestra Historia ❤️', hitos: hitos });
});

/* GET la-pregunta */
router.get('/la-pregunta', function(req, res, next) {
  res.render('pregunta', { title: 'Tengo una pregunta...' });
});

/* POST respuesta */
router.post('/respuesta', function(req, res, next) {
  const { decision } = req.body;
  res.render('resultado', { title: '¡SÍ! 😍', decision: decision });
});

module.exports = router;