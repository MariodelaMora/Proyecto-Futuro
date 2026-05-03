const quizData = [
    { q: "¿Cuándo es mi cumple?", a: ["27 de Marzo", "15 de Abril", "28 de Junio", "12 de Marzo"], c: "27 de Marzo", img: "cumple-tarta.jpg", m: "Te quiero, porque me hiciste sentir especial y como nunca antes me había sentido." },
    { q: "¿Quién es el GOAT del fútbol?", a: ["Cristiano", "Messi", "Mbappé", "Neymar"], c: "Messi", img: "selfie-lengua.jpg", m: "Te quiero, porque me lo paso genial contigo." },
    { q: "¿Mi personaje fav?", a: ["Goku", "Spiderman", "Naruto", "Anakin"], c: "Goku", img: "goku-relax.jpg", m: "Te quiero, porque el tiempo a tu lado se me pasa volando (por desgracia)." },
    { q: "¿Qué me gusta más de ti?", a: ["Tus ojos", "Tus tetas", "Tu c*ño", "Tú entera"], c: "Tú entera", img: "mueca.jpg", m: "Te quiero, porque eres preciosa." },
    { q: "Nuestra primera vez...", a: ["Eras una borde", "Qué guapa eras", "Vaya borracha", "Vaya loca"], c: "Qué guapa eras", img: "fiesta.jpg", m: "Te quiero, porque me haces ser mejor." },
    { q: "¿Te quiero?", a: ["Sí", "No", "A ratos...", "Más de lo que imaginas"], c: "Más de lo que imaginas", img: "san-vicente-beso.jpg", m: "Te quiero, porque no sé como te las has apañado para que te quiera como nunca." },
    { q: "¿Esa playa de Sanvi?", a: ["Playa de las fuentes", "Playa de las estrellas", "Playa del deseo", "Playa de los deseos"], c: "Playa de los deseos", img: "atardecer-vacas.jpg", m: "Te quiero, porque eres una persona súper especial." },
    { q: "¿Qué pasa hoy 28 de Junio?", a: ["Nada", "El pavo de la resi", "Un día cualquiera", "Tu santo"], c: "El pavo de la resi", img: "sanvi-loca.jpg", m: "Te quiero, porque te quiero en mi vida." }
];

let currentStep = 0;

function showScreen(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('d-none'));
    document.getElementById(id).classList.remove('d-none');
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
        btn.className = 'btn btn-outline-danger';
        btn.onclick = () => {
            if(opt === data.c || (data.c === "Tú entera" && opt === "Tú entera")) {
                showFeedback(data.m, data.img);
            } else {
                alert("¡Error de sistema! Revisa tus recuerdos... 😂");
            }
        };
        container.appendChild(btn);
    });
}

function showFeedback(msg, img) {
    showScreen('feedback-screen');
    document.getElementById('feedback-message').innerText = msg;
    document.getElementById('feedback-image').src = `/images/${img}`;
}

function nextQuestion() {
    currentStep++;
    if (currentStep < quizData.length) loadQuestion();
    else showScreen('final-screen');
}

// Botón que huye
const btnNo = document.getElementById('btn-no');
btnNo.addEventListener('touchstart', moveButton); // Para móvil
btnNo.addEventListener('mouseover', moveButton); // Para PC

function moveButton() {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
}

document.getElementById('btn-si').onclick = () => alert("¡SABÍA QUE DIRÍAS QUE SÍ! ❤️");

window.onload = loadQuestion;