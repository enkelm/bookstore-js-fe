const usersPanelBtn = document.getElementById("usersPanel");

async function getUsersInfo() {
  const result = await fetch(BASE_URL + "admin/getAll", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
    },
  });
  const data = await result.json();
  return data;
}

const userTableRow = (
  modalId,
  id,
  firstName,
  lastName,
  username,
  email,
  role,
  createdAt
) => {
  return `
  <tr>
    <th scope="row">${id}</th>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${username}</td>
    <td>${email}</td>
    <td>${role}</td>
    <td>${createdAt}</td>
    <td>
        <div class="d-grid gap-2 d-md-block">
            <button id="deleteUser_${modalId}" type="button" class="btn btn-outline-danger"><i
                    class="bi bi-trash"></i></button>
            <button id="editUser_${modalId}" type="button" class="btn btn-outline-primary"><i
                    class="bi bi-pencil-square"></i></i></button>
        </div>
    </td>
</tr>`;
};

const usersPanel = async () => {
  const usersTable = document.createElement("div");
  usersTable.id = "usersTable";

  const tableInfo = await getUsersInfo();

  usersTable.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover caption-top" style="width: 95%">
                <caption>List of users<button type="button" class="btn btn-outline-secondary" style="float: right;"><i class="bi bi-plus-lg"></i></button></caption>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Username </th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="table-body">
                </tbody>
            </table>
        </div>
    `;

  return { component: usersTable, props: tableInfo };
};

usersPanelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  (!displayedPanel[0] || displayedPanel[0].component.id !== "usersTable") &&
    placePanel(usersPanel, userTableRow, RegisterForm);
});
