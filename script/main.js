const logIn = document.getElementsByClassName('account-btn')[0];
const signUp = document.getElementsByClassName('account-btn')[1];

const user = localStorage.getItem('currentUser');

if (user) {
  logIn.innerHTML = 'Выйти';
  signUp.innerHTML = 'Удалить аккаунт';
  
  logIn.addEventListener("click", async () => {
    localStorage.removeItem('currentUser');
    window.location.href = "./";
  });

  signUp.addEventListener("click", async () => {
    const response = await fetch(
      `https://angesagter.herokuapp.com/?delete=user&login=${user}`
    );
    const result = await response.json();
    console.log(result);
    localStorage.removeItem("currentUser");
    window.location.href = "./";
  });
} else {
  logIn.addEventListener('click', async () => {
    window.location.href = './logIn';
  })
  
  signUp.addEventListener("click", async () => {
    window.location.href = "./signUp";
  });
}  
