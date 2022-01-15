const showBox = document.querySelector("show__con");
const rBtn = document.getElementById("rock");
const sBtn = document.getElementById("scissor");
const pBtn = document.getElementById("paper");
const user = document.querySelector(".userS");
const com = document.querySelector(".comS");
const box = document.getElementById("gameBoxImg");

let input;
let result;
let userScore = 0;
let comScore = 0;

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}


const checkCookie = () => {
    const userName = getCookie("name");
    if (userName == null) {
        window.location.href = "/";
    }
}


const addScore = () => {
    if(localStorage.getItem("score")) {
        let userScore = localStorage.getItem("score")
        const newScore = parseInt(userScore) + 1;
        localStorage.setItem("score", newScore.toString());
    } else {
        localStorage.setItem("score", "1");
    }
}

function random() {
    rBtn.addEventListener("click", () => {
        input = rBtn.value; //0
        result = Math.floor(Math.random() * 3);
        setTimeout(() => {
                if (result == 1) {
                    userScore += 1;
                    user.innerHTML = userScore
                    box.innerHTML = "Victory"
                    box.style.color = "green"
                    addScore();
                } else if (result == 0) {
                    box.innerHTML = "Draw"
                    box.style.color = "blue"
                } else {
                    comScore += 1;
                    com.innerHTML = comScore
                    box.innerHTML = "Lose"
                    box.style.color = "blue"
                }
            }, 1500
        )

    })
    sBtn.addEventListener("click", () => {
        input = sBtn.value; //1
        result = Math.floor(Math.random() * 3);
        setTimeout(() => {
            if (result == 2) {
                userScore += 1;
                user.innerHTML = userScore
                box.innerHTML = "Victory"
                box.style.color = "green"
                addScore();
            } else if (result == 1) {
                box.innerHTML = "Draw"
                box.style.color = "blue"
            } else {
                comScore += 1;
                com.innerHTML = comScore
                box.innerHTML = "Lose"
                box.style.color = "red"
            }
        }, 1500)
    })
    pBtn.addEventListener("click", () => {
        input = pBtn.value; //2
        result = Math.floor(Math.random() * 3);
        setTimeout(() => {
        if (result == 0) {
            userScore += 1;
            user.innerHTML = userScore
            box.innerHTML = "Victory"
            box.style.color = "green"
            addScore();
        } else if(result == 2) {
            box.innerHTML = "Draw"
            box.style.color = "blue"
        } else {
            comScore += 1;
            com.innerHTML = comScore
            box.innerHTML = "Lose"
            box.style.color = "red"
        }}, 1500)
    })
}

function init () {
    checkCookie();
    random();
}

init();