const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas a la ventana
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Llamar para ajustar al cargar

let progress = 0; // Progreso de la animación del corazón
let textProgress = 0; // Progreso de la animación del texto
const fullText = "Te quiero mucho, Jareth"; // Texto a mostrar en el centro del corazón

function drawHeart(progress) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2.5; // Ajuste de centro para mejor posición vertical
    const scale = Math.min(canvas.width, canvas.height) / 30; // Ajuste de escala para que siempre quepa

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.beginPath();

    // Coordenadas del corazón usando una fórmula matemática, adaptadas a escala
    for (let t = 0; t <= progress; t += 0.1) {
        const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
        const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        
        if (t === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3; // Un poco más grueso para mejor visibilidad
    ctx.stroke();
    ctx.closePath();

    // Si el progreso está completo, iniciar la animación del texto
    if (progress >= 2 * Math.PI) {
        drawText(fullText.substring(0, textProgress)); // Mostrar progresivamente las letras
    }
}

function drawText(text) {
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function animate() {
    if (progress < 2 * Math.PI) { // 2 * PI para un ciclo completo
        progress += 0.05; // Incremento del progreso para animar el trazo
        drawHeart(progress);
        requestAnimationFrame(animate); // Llamar a la animación
    } else if (textProgress < fullText.length) { // Comenzar a mostrar el texto
        textProgress += 1; // Incrementar el progreso del texto
        drawHeart(2 * Math.PI); // Asegurarse de que el corazón esté completamente dibujado
        requestAnimationFrame(animate); // Continuar la animación para el texto
    } else {
        drawHeart(2 * Math.PI); // Dibujar el corazón completo y el texto completo
    }
}

animate(); // Iniciar la animación
