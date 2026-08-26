// ===== PREGUNTAS =====
// Cambia las imágenes por las tuyas.
 
const preguntas = [
{
    real:"Imagenes/REAL1.jpg",
    ia:"Imagenes/IA1.jpg",
    explicacion:"La fotografía real tiene sombras y detalles naturales."
},
{
    real:"Imagenes/REAL2.jpg",
    ia:"Imagenes/IA2.jpg",
    explicacion:"La imagen de IA presenta pequeños errores en algunos detalles."
},
{
    real:"Imagenes/REAL3.jpg",
    ia:"Imagenes/IA3.jpg",
    explicacion:"Observa las texturas y la iluminación."
},
{
    real:"Imagenes/REAL4.jpg",
    ia:"Imagenes/IA4.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{
    real:"Imagenes/REAL5.jpg",
    ia:"Imagenes/IA5.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{
    real:"Imagenes/REAL6.jpg",
    ia:"Imagenes/IA6.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{
    real:"Imagenes/REAL7.jpg",
    ia:"Imagenes/IA7.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{
    real:"Imagenes/REAL8.jpg",
    ia:"Imagenes/IA8.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{
    real:"Imagenes/REAL9.jpg",
    ia:"Imagenes/IA9.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
},
{ 
    real:"Imagenes/REAL10.jpg",
    ia:"Imagenes/IA10.jpg",
    explicacion:"Las manos y los reflejos suelen delatar a la IA."
}
];

let indice = 0;
let puntos = 0;
let correcta = 0;
let incorrecta = 0;
let tiempo = 10;
let reloj;

const sonidoCorrecto = document.getElementById("audioCorrecto");
const sonidoError = document.getElementById("audioError");

// Elementos
const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const img1 = document.getElementById("imagen1");
const img2 = document.getElementById("imagen2");

const mensaje = document.getElementById("mensaje");
const btn = document.getElementById("btnSiguiente");

preguntas.sort(()=>Math.random()-0.5);

// Iniciar juego
function iniciarJuego(){

    inicio.classList.add("oculto");
    juego.classList.remove("oculto");

    cargarPregunta();

}

// Cargar pregunta
function cargarPregunta(){

    mensaje.innerHTML="";

    btn.style.display="none";

    document.getElementById("pregunta").innerHTML=
    `Pregunta ${indice+1} / ${preguntas.length}`;

    document.getElementById("puntos").innerHTML=
    `⭐ ${puntos}`;

    document.getElementById("progreso").style.width=
    ((indice)/preguntas.length*100)+"%";

    // Aleatorio
    correcta=Math.floor(Math.random()*2);

    if(correcta==0){

        img1.src=preguntas[indice].real;
        img2.src=preguntas[indice].ia;

    }else{

        img1.src=preguntas[indice].ia;
        img2.src=preguntas[indice].real;

    }

    img1.onclick=()=>responder(0);
    img2.onclick=()=>responder(1);

    iniciarTemporizador();

}

// Respuesta
function responder(opcion){

    clearInterval(reloj);

    img1.onclick=null;
    img2.onclick=null;

    if(opcion===correcta){

    puntos++;

    sonidoCorrecto.play();

    mensaje.innerHTML =
    "✅ ¡Correcto!<br><br>" + preguntas[indice].explicacion;

    if(correcta===0){
        img1.classList.add("correcta");
    }else{
        img2.classList.add("correcta");
    }

}else{

    sonidoError.play();

    mensaje.innerHTML =
    "❌ Incorrecto<br><br>" + preguntas[indice].explicacion;

    if(incorrecta===0){
        img1.classList.add("incorrecta");
    }else{
        img2.classList.add("incorrecta");
    }

}

    document.getElementById("puntos").innerHTML=
    `⭐ ${puntos}`;

    btn.style.display="inline-block";

}

// Siguiente
function siguientePregunta(){

    indice++;

    if(indice<preguntas.length){

        cargarPregunta();

    }else{

        terminarJuego();

    }

}

// Final
function terminarJuego(){

    clearInterval(reloj);

    juego.classList.add("oculto");

    final.classList.remove("oculto");


    let porcentaje = 
    Math.round((puntos / preguntas.length) * 100);


    document.getElementById("resultado").innerHTML =
    ` Aciertos: ${puntos}/${preguntas.length}<br>
    Resultado: ${porcentaje}%`;


    let medalla = document.getElementById("medalla");


    if(porcentaje == 100){

        medalla.innerHTML =
        "🥇 ¡PERFECTO!<br>Dominas la detección de imágenes IA.";

        lanzarConfeti();

    }

    else if(porcentaje >= 70){

        medalla.innerHTML =
        "🥈 ¡Excelente trabajo!";

        lanzarConfeti();

    }

    else if(porcentaje >= 50){

        medalla.innerHTML =
        "🥉 ¡Buen intento! Sigue practicando.";

    }

    else{

        medalla.innerHTML =
        "La IA logró engañarte esta vez.";

    }


    guardarPuntaje();

}

    function iniciarTemporizador(){

    tiempo = 10;

    document.getElementById("tiempo").innerHTML =
    "⏱️ " + tiempo;

    clearInterval(reloj);

    reloj = setInterval(() => {

        tiempo--;

        document.getElementById("tiempo").innerHTML =
        "⏱️ " + tiempo;

        if(tiempo <= 0){

            clearInterval(reloj);

            responder(-1);

        }

    },1000);

}

function guardarPuntaje(){

    let mejor =
    localStorage.getItem("mejorPuntaje");


    if(mejor==null || puntos>mejor){

        localStorage.setItem(
            "mejorPuntaje",
            puntos
        );

    }


    document.getElementById("medalla").innerHTML +=
    `<br><br>
    Mejor puntuación:
    ${localStorage.getItem("mejorPuntaje")}
    `;

}

function lanzarConfeti(){

const canvas =
document.getElementById("confeti");

const ctx =
canvas.getContext("2d");


canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;


let piezas=[];

const colores = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800', '#00bcd4'  ];

ctx.fillStyle = piezas.color;
ctx.fillRect(piezas.x, piezas.y, piezas.tamaño, piezas.tamaño);

for(let i=0;i<150;i++){

piezas.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height-500,

tamaño:Math.random()*4+4,

velocidad:Math.random()*3+2,

color: colores[Math.floor(Math.random() * colores.length)]


});

}


function animar(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);


piezas.forEach(p=>{

ctx.fillRect(
p.x,
p.y,
p.tamaño,
p.tamaño
);


p.y+=p.velocidad;


if(p.y>canvas.height){

p.y=-20;

}

});


requestAnimationFrame(animar);

}


animar();

}