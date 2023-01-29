const BASE_URL = "http://localhost/bookstore-php-api/index.php/";

const closeModal = (backdrop, modal) => {
  document.body.removeChild(backdrop);
  document.body.removeChild(modal);
};

const closeOnBackdropClick = (backdrop, modal) => {
  backdrop.addEventListener("click", () => {
    closeModal(backdrop, modal);
  });
};

const Backdrop = (modal) => {
  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  backdrop.classList = "backdrop";
  document.body.appendChild(backdrop);
  closeOnBackdropClick(backdrop, modal);
  return backdrop;
};

const LoginForm = () => {
  const form = document.createElement("form");
  form.method = "post";
  form.classList = "flex flex-col flex-center gap-3 card popup";
  form.id = "loginForm";

  form.innerHTML = `
    <h1>Login</h1>
    <div class="grid grid-col-2 gap-2">
      <label for="inputEmail">Email address</label>
      <input
      type="text"
      id="inputEmail"
      class="form-control"
      placeholder="Email address or username"
      required
      autofocus=""
      />
      <label for="inputPassword">Password</label>
      <input
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required
      />
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
  `;

  document.body.appendChild(form);
  return form;
};

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const modal = LoginForm();
  let backdrop = Backdrop(modal);
  modal.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = await fetch(BASE_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify({
        Username: modal.inputEmail.value,
        0: modal.inputEmail.value,
        PasswordHash: modal.inputPassword.value,
        1: modal.inputPassword.value,
      }),
    });

    if (result.status >= 200 && result.status <= 299) {
      const data = await result.json();
      localStorage.setItem("USER_AUTH", data.token);
      closeModal(backdrop, modal);
      checkAuth();
    } else {
      console.log(result.status, result.statusText);
    }
  });
});
