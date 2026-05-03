const quizData = [
    { q: "¿Cuándo es el cumple de Mario?", a: ["27 de Marzo", "15 de Abril", "28 de Junio", "12 de Marzo"], c: "27 de Marzo", img: "cumple-tarta.jpg", m: "Te quiero, porque me hiciste sentir especial y como nunca antes me había sentido." },
    { q: "¿Quién es mi jugador favorito de fútbol?", a: ["Cristiano", "Messi", "Mbappé", "Neymar"], c: "Messi", img: "selfie-lengua.jpg", m: "Te quiero, porque me lo paso genial contigo." },
    { q: "¿Quién es mi personaje favorito de ficción?", a: ["Goku", "Spiderman", "Naruto", "Anakin"], c: "Goku", img: "goku-relax.jpg", m: "Te quiero, porque el tiempo a tu lado se me pasa volando (por desgracia)." },
    { q: "¿Qué es lo que más me gusta de ti?", a: ["Tus ojos", "Tus tetas", "Tu c*ño", "Tú"], c: "Tú", img: "mueca.jpg", m: "Te quiero, porque eres preciosa." },
    { q: "¿Cuál fue mi primera impresión sobre ti?", a: ["Una borde", "Qué guapa eras", "Vaya borracha", "Vaya loca"], c: "Qué guapa eras", img: "fiesta.jpg", m: "Te quiero, porque me haces ser mejor." },
    { q: "¿Que si te quiero?", a: ["Sí", "No", "A ratos...", "Más de lo que te imaginas"], c: "Más de lo que te imaginas", img: "san-vicente-beso.jpg", m: "Te quiero, porque no sé como te las has apañado para que te quiera como nunca." },
    { q: "¿Cómo apodamos a la playa que me llevaste en Sanvi?", a: ["Playa de las fuentes", "Playa de las estrellas", "Playa del deseo", "Playa de los deseos"], c: "Playa de los deseos", img: "atardecer-vacas.jpg", m: "Te quiero, porque eres una persona súper especial." },
    { q: "¿Qué tiene de especial hoy, 28 de Junio?", a: ["Nada", "El pavo de la resi", "Un día cualquiera", "Tu santo"], c: "El pavo de la resi", img: "sanvi-loca.jpg", m: "Te quiero, porque te quiero en mi vida." }
];

let currentStep = 0;

// Esta función asegura que solo se vea UNA pantalla a la vez
function showScreen(screenId) {
    document.getElementById('question-card').classList.add('d-none');
    document.getElementById('feedback-screen').classList.add('d-none');
    document.getElementById('final-screen').classList.add('d-none');

    document.getElementById(screenId).classList.remove('d-none');
}

function loadQuestion() {
    showScreen('question-card');
    const data = quizData[currentStep];
    document.getElementById('question-text').innerText = data.q;
    document.getElementById('question-image').src = `/images/${data.img}`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    data.a.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn btn-outline-danger btn-lg';
        btn.onclick = () => checkAnswer(opt, data.c, data.m, data.img);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, correct, message, img) {
    if (selected === correct) {
        showScreen('feedback-screen');
        document.getElementById('feedback-message').innerText = message;
        document.getElementById('feedback-image').src = `/images/${img}`;
    } else {
        alert("¡Error de sistema! Revisa tus recuerdos... (Pista: ¡Sabes la respuesta! 😂)");
    }
}

function nextQuestion() {
    currentStep++;
    if (currentStep < quizData.length) {
        loadQuestion();
    } else {
        showScreen('final-screen');
    }
}

// Lógica del botón No
const btnNo = document.getElementById('btn-no');
btnNo.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
});

document.getElementById('btn-si').onclick = () => {
    alert("¡SABÍA QUE DIRÍAS QUE SÍ! ❤️ Eres lo mejor que me ha pasado.");
};

// Arrancamos el quiz
loadQuestion();