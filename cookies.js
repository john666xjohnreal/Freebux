// --- VARIABLES GLOBALES ---
let puntos = parseInt(localStorage.getItem('puntos_freebux')) || 0;
let esperando = false;

// --- ESTO SE EJECUTA APENAS ABRES LA PÁGINA ---
window.onload = function() {
    document.getElementById('puntos').innerText = puntos;
    verificarCanje(); // Checa si ya tenía puntos de antes para mostrar el botón
};

function mostrarAnuncio() {
    document.getElementById('modal-anuncio').style.display = 'flex';
}

function clicEnAnuncio() {
    if(!esperando) {
        esperando = true;
        window.open("https://google.com", "_blank"); 
        
        let tiempo = 15;
        const btn = document.getElementById('btn-confirmar');
        
        const intervalo = setInterval(() => {
            tiempo--;
            btn.innerText = `Espera ${tiempo}s...`;
            if(tiempo <= 0) {
                clearInterval(intervalo);
                btn.disabled = false;
                btn.innerText = "¡RECLAMAR CRÉDITO!";
                btn.onclick = sumarPunto;
            }
        }, 1000);
    }
}

function sumarPunto() {
    puntos++;
    localStorage.setItem('puntos_freebux', puntos); // <--- AQUÍ SE GUARDA
    document.getElementById('puntos').innerText = puntos;
    cerrarModal();
    alert("¡Has ganado 1 punto!");
    verificarCanje();
}

function verificarCanje() {
    // Si tiene 50 o más, mostramos la sección de canje
    if (puntos >= 50) {
        const seccion = document.getElementById('seccion-canje');
        if(seccion) seccion.style.display = 'block';
    }
}

function cerrarModal() {
    document.getElementById('modal-anuncio').style.display = 'none';
    esperando = false;
    const btn = document.getElementById('btn-confirmar');
    btn.disabled = true;
    btn.innerText = "Espera 15s...";
}
