const audio = document.getElementById('audio-fondo');
const btnIniciar = document.getElementById('btn-iniciar');
const pantallaInicio = document.getElementById('pantalla-inicio');
const cuentaContenedor = document.getElementById('cuenta-regresiva-contenedor');
const seccionGatito = document.getElementById('seccion-gatito');
const countdownText = document.getElementById('countdown-text');
const libro = document.getElementById('libro');
const espacioEstrellas = document.getElementById('espacio-estrellas');
const contenedorReacciones = document.getElementById('contenedor-reacciones');
const contenedorCarta = document.getElementById('contenedor-carta');
const textoMaquina = document.getElementById('texto-maquina');
const seccionFinal = document.getElementById('seccion-final');

const fotos = ['Imagenes/Carita1.jpeg', 'Imagenes/Carita2.jpeg', 'Imagenes/Carita3.jpeg', 'Imagenes/Carita4.jpeg']; 
let indice = 0;
let lluviaInterval;

btnIniciar.addEventListener('click', () => {
    audio.play();
    pantallaInicio.classList.add('oculto');
    iniciarCuenta();
    iniciarMatrix();
});

function iniciarCuenta() {
    cuentaContenedor.classList.remove('oculto');
    let n = 3;
    let timer = setInterval(() => {
        countdownText.textContent = n > 0 ? n : 'FELIZ';
        if (n-- < 0) {
            clearInterval(timer);
            setTimeout(() => {
                countdownText.textContent = 'CUMPLE';
                setTimeout(() => {
                    countdownText.textContent = 'GORDITA';
                    setTimeout(() => {
                        cuentaContenedor.classList.add('oculto');
                        seccionGatito.classList.remove('oculto');
                        setTimeout(() => {
                            seccionGatito.classList.add('oculto');
                            libro.classList.remove('oculto');
                            espacioEstrellas.classList.remove('oculto');
                            actualizar();
                            lluviaInterval = setInterval(lanzarLluviaEmojis, 200); 
                        }, 4000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }, 1000);
}

function lanzarLluviaEmojis() {
    for(let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        const emojis = ['❤️', '💖', '✨', '🌸', '💘', '🐱', '🌹', '⭐'];
        const reaccion = document.createElement('div');
        reaccion.className = 'reaccion';
        reaccion.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        reaccion.style.left = (Math.random() * 80 + 10) + "%";
        reaccion.style.fontSize = (Math.random() * 20 + 20) + "px";
        reaccion.style.animationDuration = (Math.random() * 4 + 4) + "s";
        contenedorReacciones.appendChild(reaccion);
        setTimeout(() => reaccion.remove(), 7000);
    }
}

function actualizar() {
    document.getElementById('foto-izq').src = fotos[indice];
    document.getElementById('foto-der').src = fotos[indice + 1];
}

document.getElementById('btn-siguiente').addEventListener('click', () => {
    // Si indice es 0, pasar a 2 (mostrando fotos 2 y 3)
    if (indice === 0) { 
        indice = 2; 
        actualizar(); 
    } else {
        // Al estar en el final, ocultamos libro y mostramos carta
        document.getElementById('hoja-actual').classList.add('oculto');
        document.querySelector('.controles').classList.add('oculto');
        contenedorCarta.classList.remove('oculto');
        escribirCarta("¡Feliz cumpleaños, amor de mi vida! Gracias por cada momento juntos, eres mi regalo favorito y mi estrella favorita. Te amo infinito.");
    }
});

function escribirCarta(texto) {
    let i = 0;
    function maquina() {
        if (i < texto.length) {
            textoMaquina.textContent += texto.charAt(i);
            i++;
            setTimeout(maquina, 70);
        } else {
            setTimeout(() => {
                libro.classList.add('oculto');
                contenedorCarta.classList.add('oculto');
                seccionFinal.classList.remove('oculto');
                clearInterval(lluviaInterval); // Detenemos la lluvia al final
            }, 3000);
        }
    }
    maquina();
}

document.getElementById('btn-anterior').addEventListener('click', () => {
    if (indice > 0) {
        indice -= 2;
        actualizar();
    }
});

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let drops = [];
function iniciarMatrix() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let cols = Math.floor(canvas.width / 100);
    for (let i = 0; i < cols; i++) drops[i] = 1;
    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = '#c74dff'; ctx.font = '20px Arial';
        const frases = ["TE AMO", "PRECIOSA", "MI AMOR", "GORDITA", "❤"];
        drops.forEach((y, i) => {
            let text = frases[Math.floor(Math.random() * frases.length)];
            ctx.fillText(text, i * 100, y * 50);
            if (y * 50 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
        requestAnimationFrame(draw);
    }
    draw();

}
