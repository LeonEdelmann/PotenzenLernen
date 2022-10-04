function startbutton() {
    let start = document.getElementById('start');
    start.innerHTML = '';

    let roundfield = document.getElementById('roundfield');
    roundfield.innerHTML = 
    '<div id="timer">' +
        '<p id="time">15 s</p>' + 
    '</div>' + 
    '<div id="rounds">' + 
        '<p id="round">1 / 10</p>' + 
    '</div>' + 
    '<div id="potenz">' + 
        '<p id="text"></p>' + 
    '</div>' + 
    '<input type="number" placeholder="Ergebnis eingeben" id="inputN">' +
    '<div><button id="enterResult" onclick="proove()">Ergebnis prüfen</button></div>';
    
    let stop = document.getElementById('stop');
    stop.innerHTML = 
    '<button id="button-stop" onclick="stopButton()">Runde beenden</button>';

    setInterval(countdown, 1000);
    getPotenz();
}
let isEntered = false;
let roundIsGoing = true;
let countDown = 15;
let ROUNDS = 1;
let resultOfPotenz;

function countdown() {
    let time = document.getElementById('time');

    if (isEntered == false) {
        countDown -= 1;
        time.innerText = countDown + ' s';
        if (countDown == 0) {
            isEntered = true;
            lost();
        }
    }
}
function getPotenz() {
    let randomIndex = Math.floor(Math.random() * 60);
    let currentPotenz = Potenzes[randomIndex];

    let Nums = currentPotenz.split('/');

    let firstNum = Nums[0];
    let secondNum = Nums[1];
    
    let potenzField = document.getElementById('text');
    potenzField.innerText = firstNum + ' ^ ' + secondNum; 

    let Ergebnis = Math.pow(firstNum, secondNum);
    resultOfPotenz = Ergebnis;
}
function proove() {
    let input = document.getElementById('inputN');
    let INPUT = input.value;
    if (INPUT == resultOfPotenz) {
        input.value = '';
        //Runden zählen
        if (roundIsGoing == true) {
            getPotenz();
            isEntered = true;
            ROUNDS += 1;
            let round = document.getElementById('round');
            round.innerText = ROUNDS + ' / 10';
            let time = document.getElementById('time');
            countDown = 15;
            isEntered = false;
            time.innerText = '15 s';
            if (ROUNDS == 10) {
                win();
            }
        }
    }
}
function win() {
    roundIsGoing = false;
    printResult(false);
}
function lost() {
    roundIsGoing = false;
    printResult(true);
}
function printResult(isLost) {
    isEntered = true;
    let potenzField = document.getElementById('text');
    potenzField.innerText = 'Es ist vorbei!';
    resultOfPotenz;
    let result = document.getElementById('result');
    if (isLost == false) {
        result.innerText = 'Du hast gewonnen!';
    }else if (isLost == true) {
        result.innerText = 'Du hast verloren! Das ergebnis ist: ' + resultOfPotenz;
    }
}
function stopButton() {location.reload();}