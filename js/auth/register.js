// const BASE_URL = "http://localhost/bookstore-php-api/index.php/";
const registerBtn = document.getElementById("signup");

// const closeModal = (backdrop, modal) => {
//   document.body.removeChild(backdrop);
//   document.body.removeChild(modal);
// };

// const closeOnBackdropClick = (backdrop, modal) => {
//   backdrop.addEventListener("click", () => {
//     closeModal(backdrop, modal);
//   });
// };

// const Backdrop = (modal) => {
//   const backdrop = document.createElement("div");
//   backdrop.id = "backdrop";
//   backdrop.classList = "backdrop";
//   document.body.appendChild(backdrop);
//   closeOnBackdropClick(backdrop, modal);
//   return backdrop;
// };

const RegisterForm = () => {
  const form = document.createElement("form");
  form.method = "post";
  form.classList = "flex flex-col flex-center gap-3 card modal";
  form.id = "registerForm";

  form.innerHTML = `
  <h1>Sign Up</h1>

      <div class="grid grid-col-2 gap-2">
        <label for="inputFirstName">First Name</label>
        <input
          type="text"
          id="inputFirstName"
          placeholder="First Name"
          required
          autofocus=""
        />
        <label for="inputLastName">Last Name</label>
        <input
          type="text"
          id="inputLastName"
          placeholder="Last Name"
          required
          autofocus=""
        />
        <label for="inputUsername">Username</label>
        <input
          type="text"
          id="inputUsername"
          placeholder="Username"
          required
          autofocus=""
        />
        <label for="inputEmail">Email address</label>
        <input
          type="text"
          id="inputEmail"
          placeholder="example@email.com"
          required
          autofocus=""
        />
        <label for="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" class="btn">Sign in</button>
  `;

  document.body.appendChild(form);
  return form;
};

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const modal = RegisterForm();
  let backdrop = Backdrop(modal);
  modal.addEventListener("submit", async (e) => {
    e.preventDefault();
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    const result = await fetch(BASE_URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: JSON.stringify({
        FirstName: modal.inputFirstName.value,
        1: modal.inputFirstName.value,
        FirstName: modal.inputLastName.value,
        2: modal.inputLastName.value,
        Username: modal.inputUsername.value,
        3: modal.inputUsername.value,
        Email: modal.inputEmail.value,
        4: modal.inputEmail.value,
        PasswordHash: modal.inputPassword.value,
        5: modal.inputPassword.value,
        CreatedAt: datetime,
        6: datetime,
        Role: 8,
        7: 8,
      }),
    });

    if (result.status >= 200 && result.status <= 299) {
      const data = await result.text();
      console.log(data);
      closeModal(backdrop, modal);
    } else {
      console.log(result.status, result.statusText);
    }
  });
});
