const nameInput = document.getElementsByClassName("form-input")[0];
const colorInput = document.getElementsByClassName("color-input")[0];
const xInput = document.getElementsByClassName("form-input")[1];
const yInput = document.getElementsByClassName("form-input")[2];

const addButton = document.getElementsByClassName("confirm")[0];
const cancelButton = document.getElementsByClassName("confirm")[1];
const confirmButton = document.getElementsByClassName("confirm")[2];

const road = {
  name: "",
  dots: [],
  color: "#000000",
};

nameInput.addEventListener("input", () => {
  road.name = nameInput.value;
});

colorInput.addEventListener("input", () => {
  road.color = colorInput.value;
  render(road);
});

addButton.addEventListener("click", () => {
  if (xInput.value && yInput.value) {
    road.dots.push({
      x: xInput.value,
      y: yInput.value,
    });
    render(road);
    xInput.value = "";
    yInput.value = "";
  } else {
    alert("Введите значения координат!");
  }
});

cancelButton.addEventListener("click", () => {
  road.dots.pop();
  render(road);
});

confirmButton.addEventListener("click", () => {
  if (road.name) {
    console.log("save road", road);
  } else {
    alert("Введите название дороги!");
  }
});

window.onload = () => {
  const selectedRoad = localStorage.getItem("changeRoad");
  if (selectedRoad) {
    console.log(selectedRoad);
    render(road);
  } else {
    alert('Пожалуйста, выберите дорогу для редактирования!');
    window.location.href.replace('./user.html')
  }
};
