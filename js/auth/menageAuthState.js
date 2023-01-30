const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("signup");
const logoutBtn = document.getElementById("logout");
const shoppingCartBtn = document.getElementById("shopping-cart");
const booksMenagement = document.getElementById("books-menagement");

const checkAuth = () => {
  const noDisplayAdmin = document.querySelectorAll(".no-display-admin");
  const noDisplayClient = document.querySelectorAll(".no-display-client");
  const token = localStorage.getItem("USER_AUTH");
  const role = localStorage.getItem("USER_ROLE");

  if (token) {
    if (role === "ADMIN") {
      booksMenagement.style = "display: inherit";
      noDisplayAdmin.forEach((btn) => {
        btn.classList.remove("no-display-admin");
      });
    }
    shoppingCartBtn.style = "display: inherit";
    logoutBtn.style = "display: inherit";
    loginBtn.style = "display: none";
    registerBtn.style = "display: none";
    noDisplayClient.forEach((btn) => {
      btn.classList.remove("no-display-client");
    });
  }
};

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

checkAuth();
