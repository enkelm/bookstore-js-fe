const BASE_URL = "http://localhost/bookstore-php-api/index.php/";

export async function login() {
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
    const data = await result.text();
    console.log(data);
  } else {
    console.log(result.status, result.statusText);
  }
}

export async function register() {
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
}
