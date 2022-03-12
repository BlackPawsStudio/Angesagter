const confirmBtn = document.getElementsByClassName("submit")[0];
const cancel = document.getElementsByClassName("submit")[1];

const login = document.getElementsByTagName("input")[0];
const password = document.getElementsByTagName("input")[1];

const form = document.getElementsByTagName("form")[0];

form.addEventListener('submit', (e) => {
  e.preventDefault()
})

confirmBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://angesagter.herokuapp.com/?create=user&login=${login.value}&password=${password.value}`
  );
  const result = await response.json();
  if (result[0] === "N") {
    localStorage.setItem("currentUser", result[0][0]);
    window.location.href = "./user";
  } else if (result[0] === "A") {
    alert("Логин уже занят!");
  } else {
    alert("Что-то пошло не так");
    console.log(result);
  }
});

cancel.addEventListener('click', () => {
  location.href = "./";
})