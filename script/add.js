const nameInput = document.getElementsByClassName("form-input")[0];
const colorInput = document.getElementsByClassName("color-input")[0];
const xInput = document.getElementsByClassName("form-input")[1];
const yInput = document.getElementsByClassName("form-input")[2];

const addButton = document.getElementsByClassName("confirm")[0];
const cancelButton = document.getElementsByClassName("confirm")[1];
const confirmButton = document.getElementsByClassName("confirm")[2];

let road = {
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

confirmButton.addEventListener("click", async () => {
  if (road.name) {
    const selectedRoad = localStorage.getItem("changeRoad");
    const currentUser = localStorage.getItem("currentUser");
    if (selectedRoad) {
      // update
      let dots = "";
      road.dots.forEach((el) => {
        dots += `${el.x},${el.y};`;
      });
      const response = await fetch(
        `https://angesagter.herokuapp.com/?update=road&login=${currentUser}&name=${selectedRoad}&dots=${dots}&color=${road.color
          .split("")
          .splice(1, road.color.length)
          .join("")}`
      );
      const result = await response.json();
      console.log(result);
      location.href = './user.html';
    } else {
      // create
      let dots = "";
      road.dots.forEach((el) => {
        dots += `${el.x},${el.y};`;
      });
      const response = await fetch(
        `https://angesagter.herokuapp.com/?create=road&login=${currentUser}&name=${
          nameInput.value
        }&dots=${dots}&color=${road.color
          .split("")
          .splice(1, road.color.length)
          .join("")}`
      );
      const result = await response.json();
      await fetch(
        `https://angesagter.herokuapp.com/?create=descr&login=${currentUser}&name=${nameInput.value}`
      );
      console.log(result);
    }
  } else {
    alert("Введите название дороги!");
  }
});

window.onload = async () => {
  const selectedRoad = localStorage.getItem("changeRoad");
  const textPlace = document.getElementsByTagName("h3")[0];
  if (selectedRoad) {
    nameInput.setAttribute("disabled", true);

    textPlace.textContent = `Изменение ${selectedRoad}`;

    const currentUser = localStorage.getItem("currentUser");
    const response = await fetch(
      `https://angesagter.herokuapp.com/?request=road&login=${currentUser}&name=${selectedRoad}`
    );
    const result = await response.json();
    const logs = result[0][1].split(";");
    const dots = logs.map((el) => {
      return {
        x: +el.split(",")[0],
        y: +el.split(",")[1],
      };
    });
    road = {
      name: result[0][0],
      dots: dots,
      color: `#${result[0][2]}`,
    };
    nameInput.value = road.name;
    render(road);
  } else {
    textPlace.textContent = `Создание дороги`;

    // alert("Пожалуйста, выберите дорогу для редактирования!");
    // window.location.href = "./user.html";
  }
};
