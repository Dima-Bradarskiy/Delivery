const auth = ()=>{
    const buttonAuth = document.querySelector(".button-auth");
const buttonOut = document.querySelector(".button-out");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById("logInForm");
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');
const userName = document.querySelector('.user-name');
const buttonCart = document.querySelector('.button-cart');

const login = (user) =>{
    buttonAuth.style.display = "none";
    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    userName.textContent = user.login;
    modalAuth.style.display = "none";
    buttonCart.style.display = "flex";
}

const logout = ()=>{
    buttonAuth.style.display = "flex";
    buttonOut.style.display = "none";
    userName.style.display = "none";
    userName.textContent = '';
    buttonCart.style.display = "none";
    localStorage.removeItem('User');
}

buttonAuth.addEventListener("click", () =>{
    modalAuth.style.display = "flex";
});

closeAuth.addEventListener("click", () =>{
    modalAuth.style.display = "none";
});

buttonOut.addEventListener('click', ()=>{
    logout();
})

loginForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const user = {
        login: inputLogin.value,
        password: inputPassword.value
    }


    localStorage.setItem('User', JSON.stringify(user));
    login(user);

})

if(localStorage.getItem('User')){
    login(JSON.parse(localStorage.getItem('User')));
}
}
auth();
