const loginBtn = document.querySelector(".login_btn");
const joinBtn = document.querySelector(".join_btn");
const formBox = document.querySelector(".form_box");
const side = document.querySelector(".side");

// 요소 생성
const emailIpt = document.createElement("input");
const passwordIpt = document.createElement("input");
const nameIpt = document.createElement("input");
const vfyPasswordIpt = document.createElement("input");

const submitBtn = document.createElement("button");


// 요소 속성
function setup () {
    emailIpt.setAttribute("id", "userEmail")
    emailIpt.setAttribute("type", "text");
    emailIpt.setAttribute("name", "userEmail");
    emailIpt.setAttribute("placeholder", "이메일")

    passwordIpt.setAttribute("id", "userPassword");
    passwordIpt.setAttribute("type", "password");
    passwordIpt.setAttribute("name", "userPassword");
    passwordIpt.setAttribute("placeholder", "비밀번호");

    nameIpt.setAttribute("id", "userName");
    nameIpt.setAttribute("type", "text");
    nameIpt.setAttribute("name", "userName");
    nameIpt.setAttribute("placeholder", "이름");

    vfyPasswordIpt.setAttribute("id", "verify password");
    vfyPasswordIpt.setAttribute("type", "password");
    vfyPasswordIpt.setAttribute("name", "userVerifyPassword");
    vfyPasswordIpt.setAttribute("placeholder", "비밀번호 확인");

    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Go";
}

function formCreater () {
    // 로그인 폼
    const loginForm = document.createElement("form");
    loginForm.setAttribute("action", "/login");
    loginForm.setAttribute("method", "post");

    loginBtn.addEventListener("click", () => {
        loginBtn.remove();
        side.style.visibility = "visible"
        formBox.append(loginForm);

        loginForm.append(emailIpt);
        loginForm.append(passwordIpt);
        loginForm.append(submitBtn);
    })

    // 회원가입 폼
    const joinForm = document.createElement("form");
    joinForm.setAttribute("action", "/join");
    joinForm.setAttribute("method", "post");

    joinBtn.addEventListener("click", () => {
        loginBtn.remove();
        joinBtn.remove();

        formBox.append(joinForm);

        joinForm.append(nameIpt);
        joinForm.append(emailIpt);
        joinForm.append(passwordIpt);
        joinForm.append(vfyPasswordIpt);
        joinForm.append(submitBtn);
    })
}

function init () {
    setup();
    formCreater();
}

if(loginBtn) {
    init();
}





