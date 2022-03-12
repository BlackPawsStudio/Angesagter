const roadsList = document.getElementsByClassName("roads-list")[0];

const roadElem = document.getElementsByClassName("road");
const roadName = document.getElementsByClassName("road-name");
const lightRoad = document.getElementsByClassName("road-show");
const changeRoad = document.getElementsByClassName("road-change");
const deleteRoad = document.getElementsByClassName("road-delete");

const deleteObj = document.getElementsByClassName("obj-delete");

const newRoad = document.getElementById("new-road");
const newObj = document.getElementById("obst");

let roads = [];
let objects = [];

let selected = '';

const initFill = () => {
  renderRoads(roads, objects);
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
  objects.forEach((object) => {
    roadsList.innerHTML += `
  <div class="road" style="background-color: ${object.color}90; border: 3px solid ${object.color}">
    <p class="road-name">Объект ${object.name}</p>
    <button class="obj-delete road-btn">Удалить</button>
  </div>
    `;
  });

  for (let i = 0; i < lightRoad.length; i++) {
    lightRoad[i].addEventListener("click", async () => {
      for (let y = 0; y < roadElem.length; y++) {
        roadElem[y].classList.remove("selected");
      }
      if (!selected) {
        roadElem[i].classList.add("selected");
        selected = roads[i].name;
        render(roads[i]);
        await displayInfo(roads[i]);
      } else {
        renderRoads(roads, objects);
        await updateInfo(selected)
        selected = '';
      }
    });
  }

  for (let i = 0; i < changeRoad.length; i++) {
    changeRoad[i].addEventListener("click", () => {
      localStorage.setItem("changeRoad", roadName[i].innerHTML);
      window.location.href = "./add.html";
    });
  }

  for (let i = 0; i < deleteRoad.length; i++) {
    deleteRoad[i].addEventListener("click", async () => {
      const userLogin = localStorage.getItem("currentUser");
      const response = await fetch(
        `https://angesagter.herokuapp.com/?delete=road&login=${userLogin}&name=${roads[i].name}`
      );
      const result = await response.json();
      console.log(result);
      roads.splice(i, 1);
      roadsList.innerHTML = "";
      initFill();
    });
  }

  for (let i = 0; i < deleteObj.length; i++) {
    deleteObj[i].addEventListener('click', async () => {
      console.log('a');
      const userLogin = localStorage.getItem("currentUser");
      const response = await fetch(
        `https://angesagter.herokuapp.com/?delete=object&login=${userLogin}&name=${objects[i].name}`
      );
      const result = await response.json();
      console.log(result);
      objects.splice(i, 1);
      roadsList.innerHTML = "";
      initFill();
    })
  }
};

newRoad.addEventListener("click", () => {
  window.location.href = "./add.html";
  localStorage.removeItem("changeRoad");
});

newObj.addEventListener("click", () => {
  popup.classList.add("show");
});

window.onload = async () => {
  const userLogin = localStorage.getItem("currentUser");
  if (userLogin) {
    const response = await fetch(
      `https://angesagter.herokuapp.com/?request=roads&login=${userLogin}`
    );
    const result = await response.json();
    roads = result.map((el) => {
      const logs = el[1].split(";");
      const dots = logs.map((el) => {
        return {
          x: +el.split(",")[0],
          y: +el.split(",")[1],
        };
      });
      return {
        name: el[0],
        dots: dots,
        color: `#${el[2]}`,
      };
    });
    const objResponse = await fetch(
      `https://angesagter.herokuapp.com/?request=objects&login=${userLogin}`
    );
    const objResult = await objResponse.json();
    objects = objResult.map((el) => {
      const x = +el[1].split(',')[0]; 
      const y = +el[1].split(',')[1]; 
      return {
        name: el[0],
        x: x,
        y: y,
        color: `#${el[2]}`,
        type: el[3],
        size: el[4]
      };
    });
    if (roads.length || objects.length) {
      initFill();
    }
  } else {
    location.href = "./logIn.html";
  }
};
