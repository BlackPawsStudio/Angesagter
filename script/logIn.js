const confirmBtn = document.getElementsByClassName("submit")[0];
const cancel = document.getElementsByClassName("submit")[1];

const login = document.getElementsByTagName("input")[0];
const password = document.getElementsByTagName("input")[1];

const form = document.getElementsByTagName("form")[0];


form.addEventListener("submit", (e) => {
  e.preventDefault();
});

confirmBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://angesagter.herokuapp.com/?request=user&login=${login.value}`
  );
  const result = await response.json();
  if (result.length !== 0) {
    if (result[0][1] === password.value) {
      location.href = "./user";
      localStorage.setItem("currentUser", result[0][0]);
      window.location.href = "./user";
    } else {
      alert("Неверный пароль!");
    }
  } else {
    alert("Неверный логин!");
  }
});


cancel.addEventListener("click", () => {
  location.href = './'
});