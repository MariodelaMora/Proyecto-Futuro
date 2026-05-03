const quizData = [
    { q: "¿Cuándo es mi cumple?", a: ["27 de Marzo", "15 de Abril", "28 de Junio", "12 de Marzo"], c: "27 de Marzo", img: "cumple-tarta.jpg", m: "Te quiero, porque me hiciste sentir especial y como nunca antes me había sentido." },
    { q: "¿Quién es el GOAT?", a: ["Cristiano", "Messi", "Mbappé", "Neymar"], c: "Messi", img: "selfie-lengua.jpg", m: "Te quiero, porque me lo paso genial contigo." },
    { q: "¿Mi personaje fav?", a: ["Goku", "Spiderman", "Naruto", "Anakin"], c: "Goku", img: "goku-relax.jpg", m: "Te quiero, porque el tiempo a tu lado se me pasa volando (por desgracia)." },
    { q: "¿Qué me gusta más de ti?", a: ["Tus ojos", "Tus tetas", "Tu c*ño", "Tú"], c: "Tú", img: "mueca.jpg", m: "Te quiero, porque eres preciosa." },
    { q: "Nuestra primera impresión...", a: ["Eras una borde", "Qué guapa eras", "Vaya borracha", "Vaya loca"], c: "Qué guapa eras", img: "fiesta.jpg", m: "Te quiero, porque me haces ser mejor." },
    { q: "¿Que si te quiero?", a: ["Sí", "No", "A ratos...", "Más de lo que te imaginas"], c: "Más de lo que te imaginas", img: "san-vicente-beso.jpg", m: "Te quiero, porque no sé como te las has apañado para que te quiera como nunca." },
    { q: "¿Playa de Sanvi?", a: ["Playa de las fuentes", "Playa de las estrellas", "Playa del deseo", "Playa de los deseos"], c: "Playa de los deseos", img: "atardecer-vacas.jpg", m: "Te quiero, porque eres una persona súper especial." },
    { q: "¿Qué tiene de especial hoy, 28 de Junio?", a: ["el dia que nos conocimos", "tu santo", "el dia que te quiero decir algo importante", "la a y la c son correctas"], c: "la a y la c son correctas", img: "sanvi-loca.jpg", m: "Te quiero, porque te quiero en mi vida." }
];

let currentStep = 0;
let timeLeft = 15;
let timerId;

function startTimer() {
    timeLeft = 15;
    const timerBar = document.getElementById('timer');
    timerId = setInterval(() => {
        timeLeft -= 0.1;
        timerBar.style.width = (timeLeft / 15) * 100 + "%";
        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("¡Se acabó el tiempo! 😱 Tienes que ser más rápida...");
            location.reload(); // Reinicia si falla por tiempo
        }
    }, 100);
}

function stopTimer() {
    clearInterval(timerId);
}

function loadQuestion() {
    const data = quizData[currentStep];
    document.getElementById('question-card').classList.remove('d-none');
    document.getElementById('feedback-screen').classList.add('d-none');
    document.getElementById('final-screen').classList.add('d-none');

    document.getElementById('question-text').innerText = data.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    data.a.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn btn-outline-danger';
        btn.onclick = () => {
            if (opt === data.c) {
                stopTimer();
                showFeedback(data.m, data.img);
            } else {
                alert("¡Respuesta incorrecta! Piensa un poco... 🤔");
            }
        };
        container.appendChild(btn);
    });
    startTimer();
}

function showFeedback(msg, img) {
    document.getElementById('question-card').classList.add('d-none');
    document.getElementById('feedback-screen').classList.remove('d-none');
    document.getElementById('feedback-message').innerText = msg;
    document.getElementById('feedback-image').src = `/images/${img}`;
}

function nextQuestion() {
    currentStep++;
    if (currentStep < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('feedback-screen').classList.add('d-none');
        document.getElementById('final-screen').classList.remove('d-none');
    }
}

// Botón que huye
const btnNo = document.getElementById('btn-no');
const moveBtn = () => {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
};
btnNo.addEventListener('mouseover', moveBtn);
btnNo.addEventListener('touchstart', moveBtn);

document.getElementById('btn-si').onclick = () => alert("¡SABÍA QUE DIRÍAS QUE SÍ! ❤️");

window.onload = loadQuestion;