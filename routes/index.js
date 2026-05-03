const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Mario Challenge 🧠' });
});

/* GET quiz */
router.get('/quiz', function(req, res, next) {
  res.render('quiz', { title: '¿Cuánto conoces a Mario?' });
});

/* GET nuestra-historia (Se mantiene como recuerdo extra) */
router.get('/nuestra-historia', function(req, res, next) {
  // ... tu array de hitos se mantiene igual ...
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