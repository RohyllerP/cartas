import { data } from "./data.js";
import { timer, stop } from "./reloj.js";

// funcion para crear el elemento
let canti = 0;
var cardOne = 0;
var cardTwo = 0;
let timeAux = true;
let auxWhile = true;

// clase Usuario
let nombre = document.querySelector('#correo-jugador');
let menu = document.querySelector('#abrir-menu');
let menuEnviar = document.querySelector('#btn-submit');
let menuInput = document.querySelector('#inputEmail');
let conteo = document.querySelector('#conteo-aciertos');
let iniciarBtn = document.querySelector('#iniciar-juego');
let lastTime = document.querySelector('#last-time');
let lastTimeTitle = document.querySelector('#last-timeTitle');
var bestTime = document.getElementById('best-time');
var besTimeTitle = document.getElementById('best-time-title');


class Usuario {
    constructor() {
        this.correo = localStorage.getItem('user');
        this.tiempoRecord = JSON.parse(localStorage.getItem('tiempoRecord'));
        this.tiempoUltimaJugada = JSON.parse(localStorage.getItem('tiempoUltimo'));
    }
}
let u = new Usuario();
let auxBtn = false;
window.onload = function () {
    if (u.correo == null) {
        menu.click();
        menuEnviar.onclick = function () {
            if (menuInput.value != "") {
                localStorage.setItem('user', `${menuInput.value}`);
                location.reload();
            } else {
                alert("no puede estar vacio");
            }
        }

    } else {
        nombre.innerHTML = u.correo;
        if (u.tiempoRecord != undefined && u.tiempoUltimaJugada != undefined) {
            lastTime.innerHTML += u.tiempoUltimaJugada;
            bestTime.innerHTML += u.tiempoRecord;
            lastTime.classList.remove('d-none');
            lastTimeTitle.classList.remove('d-none');
            bestTime.classList.remove('d-none');
            besTimeTitle.classList.remove('d-none');
        }
        iniciarBtn.classList.remove('d-none');
        iniciarBtn.onclick = function () {
            if (timeAux) {
                timer();
                timeAux = false;
            }
            auxBtn = true;
            this.classList.add('d-none');
        }
    }
}


function crearCards(e) {
    const divPadre = document.createElement("div");
    const divHijo = document.createElement("div");
    const divHijoTwo = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = "?";
    const padre = document.getElementById('main-card');

    divHijo.classList.add("front");
    divHijoTwo.classList.add("face");
    divHijoTwo.classList.add("back");
    divHijoTwo.appendChild(p);
    divPadre.classList.add('card-padre');
    divHijo.style.backgroundImage = `url('${e.url}')`;
    divHijo.classList.add("card");

    divHijoTwo.onclick = function () {
        if (auxBtn) {
            this.classList.add("back-hover");
            this.closest('.card-padre').classList.add(`c-${e.id}`);

            canti++
            if (canti == 1) {
                cardOne = e.id;
            }
            if (canti == 2) {
                cardTwo = e.id;
                setTimeout(validarCard, 300)
            }
        }
    }

    divPadre.appendChild(divHijoTwo);
    divPadre.appendChild(divHijo);

    padre.appendChild(divPadre);
}

let contador = 0;
// validar cards
function validarCard() {
    let cardPrimero = document.querySelector(`.c-${cardOne}`);
    let cardSegundo = document.querySelector(`.c-${cardTwo}`);

    if (cardOne != cardTwo) {
        cardPrimero.children[0].classList.add('front-hover');
        cardPrimero.children[0].classList.remove('back-hover');
        cardSegundo.children[0].classList.add('front-hover');
        cardSegundo.children[0].classList.remove('back-hover');

        cardPrimero.classList.remove(`c-${cardOne}`);
        cardSegundo.classList.remove(`c-${cardTwo}`);
        alert("fallaste");
    } else {
        contador++
        alert("acertase");
        conteo.innerHTML = `${contador}`;
    }
    if (contador == 8) {
        stop(u.tiempoRecord);
        contador == 0;
        alert("ganaste el juego");
    }
    canti = 0;
}

// barajear
function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}
shuffleArray(data);

data.forEach(e => {
    crearCards(e);
})