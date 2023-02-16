const RegisterForm = (admin = null, userData = {}) => {
  const { FirstName, LastName, Username, Email, Role } = userData;
  const form = document.createElement("form");
  form.method = "post";
  form.classList = "flex flex-col flex-center gap-3 card popup";
  form.id = "registerForm";

  form.innerHTML = `
  <h1>${admin ? `Edit User` : `Sign Up`}</h1>

      <div class="grid grid-col-2 gap-2">
        <label for="inputFirstName">First Name</label>
        <input
          type="text"
          id="inputFirstName"
          class="form-control"
          placeholder="First Name"
          ${FirstName && `value="${FirstName}"`}
          required
          autofocus=""
        />
        <label for="inputLastName">Last Name</label>
        <input
          type="text"
          id="inputLastName"
          class="form-control"
          placeholder="Last Name"
          ${LastName && `value="${LastName}"`}
          required
        />
        <label for="inputUsername">Username</label>
        <input
          type="text"
          id="inputUsername"
          class="form-control"
          placeholder="Username"
          ${Username && `value="${Username}"`}
          required
        />
        <label for="inputEmail">Email address</label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="example@email.com"
          ${Email && `value="${Email}"`}
          required
        />
        <label for="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          ${!admin && `required`}
        />
        
        ${
          admin
            ? ` <label for="cars">Choose Role:</label>
            <select name="role" id="inputRole">
              <option value="1" ${
                Role === 1 && `selected="selected"`
              }>Admin</option>
              <option value="2" ${
                Role === 2 && `selected="selected"`
              }>Client</option>
            </select>
          `
            : `<div></div>`
        }
      </div>

      <button type="submit" class="btn btn-primary">${
        admin ? `Save Changes` : `Sign in`
      }</button>
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
        LastName: modal.inputLastName.value,
        Username: modal.inputUsername.value,
        Email: modal.inputEmail.value,
        PasswordHash: modal.inputPassword.value,
        CreatedAt: datetime,
        Role: 2,
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
