const roadsList = document.getElementsByClassName("roads-list")[0];

const roadElem = document.getElementsByClassName("road");
const lightRoad = document.getElementsByClassName("road-show");
const changeRoad = document.getElementsByClassName("road-change");
const deleteRoad = document.getElementsByClassName("road-delete");

const newRoad = document.getElementById("new-road");

const roads = [
  {
    id: 0,
    name: "a",
    dots: [
      { x: 100, y: 200 },
      { x: 200, y: 300 },
    ],
    color: "#ff0000",
  },
  {
    id: 1,
    name: "b",
    dots: [
      { x: 300, y: 400 },
      { x: 200, y: 200 },
    ],
    color: "#000000",
  },
];

let selected = false;

const initFill = () => {
  renderRoads(roads);

  roads.forEach((road) => {
    roadsList.innerHTML += `
  <div class="road" style="background-color: ${road.color}90; border: 3px solid ${road.color}">
    <p class="road-name">${road.name}</p>
    <button class="road-show road-btn">Подсветить</button>
    <button class="road-change road-btn">Изменить</button>
    <button class="road-delete road-btn">Удалить</button>
  </div>
    `;
  });

  for (let i = 0; i < lightRoad.length; i++) {
    lightRoad[i].addEventListener("click", () => {
      for (let y = 0; y < roadElem.length; y++) {
        roadElem[y].classList.remove("selected");
      }
      if (!selected) {
        roadElem[i].classList.add("selected");
        selected = true;
        render(roads[i]);
      } else {
        selected = false;
        renderRoads(roads);
      }
    });
  }

  for (let i = 0; i < changeRoad.length; i++) {
    changeRoad[i].addEventListener("click", () => {
      localStorage.setItem("changeRoad", i);
      window.location.href = "./add.html";
    });
  }

  for (let i = 0; i < deleteRoad.length; i++) {
    deleteRoad[i].addEventListener("click", () => {
      roads.splice(i, 1);
      console.log("send delete request");

      roadsList.innerHTML = "";
      initFill();
    });
  }
};

initFill();

newRoad.addEventListener("click", () => {
  window.location.href = "./add.html";
});
