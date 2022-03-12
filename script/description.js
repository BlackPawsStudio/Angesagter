const roadInfo = document.getElementsByClassName("road-info")[0];
const textarea = document.getElementsByTagName('textarea')[0];

const lengthPlace = document.getElementById('length-place');

const getDistance = (x1, y1, x2, y2) => {
  const y = x2 - x1;
  const x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

const displayInfo = async (road) => {
  roadInfo.style.width = '50%';
  const userLogin = localStorage.getItem("currentUser");
  const response = await fetch(
    `https://angesagter.herokuapp.com/?request=descr&login=${userLogin}&name=${road.name}`
  );
  const result = await response.json();
  textarea.value = result[0][2];
  let roadLength = 0;
  for (let i = 1; i < road.dots.length - 1; i++) {
    roadLength += getDistance(
      road.dots[i - 1].x,
      road.dots[i - 1].y,
      road.dots[i].x,
      road.dots[i].y
    );
  }
  lengthPlace.innerHTML = Math.trunc(roadLength * 100) / 100;
};

const updateInfo = async (roadname) => {
  roadInfo.style.width = "0";
  const userLogin = localStorage.getItem("currentUser");
  const response = await fetch(
    `https://angesagter.herokuapp.com/?update=descr&login=${userLogin}&name=${roadname}&text=${textarea.value}`
  );
  const result = await response.json();
  console.log(result);
};

