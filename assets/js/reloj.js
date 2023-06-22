var h1 = document.getElementById('time');
var bestTime = document.getElementById('best-time');
var besTimeTitle = document.getElementById('best-time-title');

let tiempoStorage = JSON.parse(localStorage.getItem("tiempoRecord"));
if(localStorage.getItem("tiempoRecord") == null){
    bestTime.innerHTML = tiempoStorage; 
}

var sec = 0;
var min = 0;
var hrs = 0;
var t;

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    timer();

}

function dividirTiempo(tiempoValue){
    if(localStorage.getItem("tiempoRecord") == undefined){
        return false;
    }
    let aUno = tiempoStorage.slice(0,2);
    let bUno = tiempoStorage.slice(3,5);
    let cUno = tiempoStorage.slice(6,8);

    let aDos = tiempoValue.slice(0,2);
    let bDos = tiempoValue.slice(3,5);
    let cDos = tiempoValue.slice(6,8);

    if((aUno < aDos) || (bUno < bDos) || (cUno < cDos)){
        return false;
    }
    return true;
}

export function stop(tiempoRecord){
    clearTimeout(t);
    let tiempoValue = h1.innerHTML;
    let vali = dividirTiempo(tiempoValue);
    if(tiempoRecord == undefined){
        localStorage.setItem("tiempoUltimo",JSON.stringify(tiempoValue));
        bestTime.innerHTML = tiempoValue;  
        besTimeTitle.classList.remove('d-none');
        localStorage.setItem("tiempoRecord",JSON.stringify(tiempoValue));
    }else{
        localStorage.setItem("tiempoUltimo",JSON.stringify(tiempoValue));
    }
    if(vali){
        localStorage.setItem("tiempoRecord",JSON.stringify(tiempoValue));
    }
    location.reload();
}
export function timer() {
    t = setTimeout(add, 1000);
}
