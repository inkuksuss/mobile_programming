const sideText = document.getElementById("sideText");
const sideScoreText = document.getElementById("sideScoreText");
const sideScore = document.getElementById("sideScore");
const infoBtn = document.querySelector(".info__button");
const sideBar = document.getElementById("sideBar");
const clockContainer = document.querySelector('.clock'),
    clockTitle = clockContainer.querySelector('.clock__h1');

function getTime() {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

setInterval(getTime, 1000);


infoBtn.addEventListener("click", () => {
    sideBar.classList.toggle("active");
})

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

const textCreater = () => {
    const userName = getCookie("name");
    let score;
    if(localStorage.getItem("score")) {
        score = localStorage.getItem("score");
    } else {
        score = 0;
    }

    sideText.innerHTML = `<span>Hello, <br>${userName}</span>`;
    sideScore.innerText = score;
}

function init() {
    textCreater();
}

init();


