const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("signup");
const logoutBtn = document.getElementById("logout");
const shoppingCartBtn = document.getElementById("shopping-cart");
const noDisplayItems = document.querySelectorAll(".no-display");

const checkAuth = () => {
  const token = localStorage.getItem("USER_AUTH");

  if (token) {
    console.log("here");
    shoppingCartBtn.style = "display: inherit";
    logoutBtn.style = "display: inherit";
    loginBtn.style = "display: none";
    registerBtn.style = "display: none";
    noDisplayItems.forEach((btn) => {
      btn.classList.remove("no-display");
    });
  }
};

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

checkAuth();
