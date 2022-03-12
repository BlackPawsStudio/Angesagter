const roadInfo = document.getElementsByClassName("road-info")[0];
const textarea = document.getElementsByTagName('textarea')[0];

const displayInfo = async (roadname) => {
  roadInfo.style.width = '50%';
  const userLogin = localStorage.getItem("currentUser");
  const response = await fetch(
    `https://angesagter.herokuapp.com/?request=descr&login=${userLogin}&name=${roadname}`
  );
  const result = await response.json();
  textarea.value = result[0][2];
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

