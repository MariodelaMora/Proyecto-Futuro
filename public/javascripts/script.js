const quizData = [
    { q: "¿Cuándo es mi cumple?", a: ["27 de Marzo", "15 de Abril", "28 de Junio", "12 de Marzo"], c: "27 de Marzo", img: "cumple-tarta.jpg", m: "Te quiero, porque me hiciste sentir especial y como nunca antes me había sentido." },
    { q: "¿Quién es mi jugador favorito?", a: ["Cristiano", "Messi", "Mbappé", "Neymar"], c: "Messi", img: "selfie-lengua.jpg", m: "Te quiero, porque me lo paso genial contigo." },
    { q: "¿Mi personaje fav?", a: ["Goku", "Spiderman", "Naruto", "Anakin"], c: "Goku", img: "goku-relax.jpg", m: "Te quiero, porque el tiempo a tu lado se me pasa volando (por desgracia)." },
    { q: "¿Qué me gusta más de ti?", a: ["Tus ojos", "Tus tetas", "Tu c*ño", "Tú"], c: "Tú", img: "mueca.jpg", m: "Te quiero, porque eres preciosa." },
    { q: "Nuestra primera impresión...", a: ["Eras una borde", "Qué guapa eras", "Vaya borracha", "Vaya loca"], c: "Qué guapa eras", img: "fiesta.jpg", m: "Te quiero, porque me haces ser mejor." },
    { q: "¿Te quiero?", a: ["No", "Poco", "A ratos...", "Más de lo que te imaginas"], c: "Más de lo que te imaginas", img: "san-vicente-beso.jpg", m: "Te quiero, porque no sé como te las has apañado para que te quiera como nunca." },
    { q: "¿Como se llama la playa de Sanvi?", a: ["Playa de las fuentes", "Playa de las estrellas", "Playa del deseo", "Playa de los deseos"], c: "Playa de los deseos", img: "atardecer-vacas.jpg", m: "Te quiero, porque eres una persona súper especial." },
    { q: "¿Qué tiene de especial hoy, 28 de Junio?", a: ["el dia que nos conocimos", "tu santo", "el dia que te quiero decir algo importante", "la a y la c son correctas"], c: "la a y la c son correctas", img: "sanvi-loca.jpg", m: "Te quiero, porque te quiero en mi vida." }
];

const noMessages = [
    "Ese botón no está muy convencido de quedarse quieto.",
    "Creo que la opción buena está justo al lado.",
    "Piénsalo otra vez, que esto iba muy bien.",
    "El sistema detecta que esa respuesta no procede.",
    "Última oportunidad antes de que vuelva a huir."
];

let currentStep = 0;
let timeLeft = 15;
let timerId;
let noAttempts = 0;

const questionCard = document.getElementById('question-card');
const feedbackScreen = document.getElementById('feedback-screen');
const transitionScreen = document.getElementById('transition-screen');
const finalScreen = document.getElementById('final-screen');
const questionCounter = document.getElementById('question-counter');
const progressDots = document.getElementById('progress-dots');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const noMessage = document.getElementById('no-message');

function showOnly(screen) {
    [questionCard, feedbackScreen, transitionScreen, finalScreen].forEach(item => {
        item.classList.toggle('d-none', item !== screen);
    });
}

function buildProgress() {
    progressDots.innerHTML = '';
    quizData.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'progress-dot';
        dot.dataset.step = index;
        progressDots.appendChild(dot);
    });
}

function updateProgress(label) {
    questionCounter.textContent = label || `${currentStep + 1} / ${quizData.length}`;

    [...progressDots.children].forEach((dot, index) => {
        dot.classList.toggle('is-done', index < currentStep);
        dot.classList.toggle('is-current', index === currentStep && currentStep < quizData.length);
    });
}

function startTimer() {
    stopTimer();
    timeLeft = 15;
    const timerBar = document.getElementById('timer');
    timerBar.style.width = "100%";

    timerId = setInterval(() => {
        timeLeft -= 0.1;
        timerBar.style.width = Math.max((timeLeft / 15) * 100, 0) + "%";

        if (timeLeft <= 0) {
            stopTimer();
            alert("¡Se acabó el tiempo! 😱 Tienes que ser más rápida...");
            location.reload();
        }
    }, 100);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function loadQuestion() {
    const data = quizData[currentStep];
    showOnly(questionCard);
    updateProgress();

    document.getElementById('question-text').innerText = data.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    data.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn btn-outline-danger animate__animated animate__fadeInUp';
        btn.style.animationDelay = `${index * 0.06}s`;
        btn.onclick = () => {
            if (opt === data.c) {
                stopTimer();
                showFeedback(data.m, data.img);
                lanzarConfeti(650);
            } else {
                btn.classList.add('animate__shakeX');
                setTimeout(() => btn.classList.remove('animate__shakeX'), 650);
                alert("¡Respuesta incorrecta! Piensa un poco... 🤔");
            }
        };
        container.appendChild(btn);
    });

    startTimer();
}

function showFeedback(msg, img) {
    showOnly(feedbackScreen);
    updateProgress(`${currentStep + 1} / ${quizData.length}`);
    document.getElementById('feedback-message').innerText = msg;
    document.getElementById('feedback-image').src = `/images/${img}`;
}

function nextQuestion() {
    currentStep++;

    if (currentStep < quizData.length) {
        loadQuestion();
        return;
    }

    stopTimer();
    showOnly(transitionScreen);
    updateProgress("final");
}

function showFinalProposal() {
    showOnly(finalScreen);
    updateProgress("desbloqueado");
    lanzarConfeti(1800);
}

function lanzarConfeti(duration = 1200) {
    if (typeof confetti !== 'function') {
        return;
    }

    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

    const interval = setInterval(() => {
        const remaining = animationEnd - Date.now();

        if (remaining <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 46 * (remaining / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.16, y: Math.random() * 0.38 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.84, y: Math.random() * 0.38 } });
    }, 210);
}

function fireHeartBurst() {
    if (typeof confetti !== 'function') {
        return;
    }

    if (typeof confetti.shapeFromText !== 'function') {
        lanzarConfeti(2200);
        return;
    }

    const heart = confetti.shapeFromText({ text: '❤️', scalar: 2.4 });
    const star = confetti.shapeFromText({ text: '✨', scalar: 1.8 });

    confetti({
        particleCount: 90,
        spread: 95,
        startVelocity: 42,
        origin: { x: 0.5, y: 0.58 },
        shapes: [heart, star],
        scalar: 1.25,
        zIndex: 9999
    });
}

function moveNoButton(event) {
    if (event) {
        event.preventDefault();
    }

    noAttempts++;
    const margin = 18;
    const maxX = Math.max(window.innerWidth - btnNo.offsetWidth - margin, margin);
    const maxY = Math.max(window.innerHeight - btnNo.offsetHeight - margin, margin);
    const x = Math.random() * (maxX - margin) + margin;
    const y = Math.random() * (maxY - margin) + margin;

    btnNo.style.position = 'fixed';
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
    btnNo.style.zIndex = '9998';
    btnNo.style.transform = `rotate(${noAttempts % 2 === 0 ? 5 : -5}deg)`;
    noMessage.innerText = noMessages[(noAttempts - 1) % noMessages.length];
}

function showYesCelebration() {
    finalScreen.innerHTML = `
        <div class="yes-spectacle animate__animated animate__zoomIn">
            <div class="heart-field" aria-hidden="true">
                <span>❤️</span><span>✨</span><span>💘</span><span>🥰</span><span>❤️</span><span>✨</span>
            </div>
            <div class="yes-photo-wall" aria-hidden="true">
                <img src="/images/fiesta.jpg" alt="">
                <img src="/images/san-valentin.jpg" alt="">
                <img src="/images/san-vicente-beso.jpg" alt="">
                <img src="/images/atardecer-vacas.jpg" alt="">
                <img src="/images/cumple-tarta.jpg" alt="">
            </div>
            <div class="yes-badge">respuesta aceptada</div>
            <h1>Oficialmente novios</h1>
            <p>Se desbloquea: besos sin límite, planes pendientes y quedarme contigo.</p>
            <div class="yes-contract">
                <span>Mario</span>
                <strong>+</strong>
                <span>Tú</span>
            </div>
            <button class="btn btn-yes-again" type="button">Repetir confeti ❤️</button>
        </div>
    `;

    const replay = finalScreen.querySelector('.btn-yes-again');
    replay.addEventListener('click', () => {
        fireHeartBurst();
        lanzarConfeti(1800);
    });

    fireHeartBurst();
    lanzarConfeti(6200);
}

buildProgress();
updateProgress();
btnSi.addEventListener('click', showYesCelebration);
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', moveNoButton, { passive: false });
btnNo.addEventListener('click', moveNoButton);

window.onload = loadQuestion;
