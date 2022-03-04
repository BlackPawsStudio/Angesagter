const popup = document.getElementsByClassName("popup")[0];

const nameInput = document.getElementsByClassName("obj-input")[0];
const xInput = document.getElementsByClassName("obj-input")[1];
const yInput = document.getElementsByClassName("obj-input")[2];
const colorInput = document.getElementsByClassName("obj-input")[3];
const sizeInput = document.getElementById("size-input");
const sizeText = document.getElementById("size-text");

const submitBtn = document.getElementsByClassName("obj-submit")[0];
const cancelBtn = document.getElementsByClassName("obj-submit")[1];

submitBtn.addEventListener("click", async () => {
  const coords = `${xInput.value}, ${yInput.value}`;
  const color = colorInput.value.split("").splice(1, colorInput.value.length - 1).join("");
  console.log(color);
  const currUser = localStorage.getItem("currentUser");
  const response = await fetch(
    `https://angesagter.herokuapp.com/?create=object&name=${nameInput.value}&coords=${coords}&color=${color}&type=square&size=${sizeInput.value}&login=${currUser}`
  );
  const result = await response.json();
  location.href = './user.html'
  console.log(result);
  nameInput.value = '';
  xInput.value = "";
  yInput.value = "";
});

cancelBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});

sizeInput.addEventListener("input", () => {
  sizeText.innerHTML = `Выберите размер: ${sizeInput.value}`;
});