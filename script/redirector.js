const checkUser = localStorage.getItem("currentUser");
if (!checkUser) {
  location.href = "./logIn.html";
}
