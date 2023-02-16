const homeBtn = document.getElementById("homeBtn");
const displayedPanel = [];

homeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.removeChild(displayedPanel[0].component);
  displayedPanel.splice(0, displayedPanel.length);
  booksWrapper.style = "display: flex;";
});

const placePanel = async (
  generatePanel = () => {},
  generateRow = () => {},
  generateModal = () => {}
) => {
  booksWrapper.style = "display: none;";
  const table = await generatePanel();
  const noPanelIsBeingDisplayed = displayedPanel.length === 0;

  noPanelIsBeingDisplayed
    ? document.body.appendChild(table.component)
    : document.body.removeChild(displayedPanel[0].component);

  noPanelIsBeingDisplayed ? displayedPanel.push(table) : replacePanel();

  displayedPanel[0].component.id !== "purchasesTable"
    ? populateUserTable(table.props)
    : populatePurchaseTable(table.props);

  console.log(displayedPanel[0]);
  function replacePanel() {
    displayedPanel.pop();
    displayedPanel.push(table);
    document.body.appendChild(table.component);
  }

  function populatePurchaseTable(data = []) {
    const tableBody = document.getElementById("table-body");
    const deleteData = [];

    data.forEach((row) => {
      const modalId = generateId();
      let res = generateRow(
        modalId,
        row.Id,
        row.FirstName,
        row.LastName,
        row.Username,
        row.TotalPrice,
        row.Username
      );
      tableBody.innerHTML = tableBody.innerHTML + res;
      generateModal(modalId, row["0"]);
      deleteData.push({ btnId: modalId, data: row.Id });
    });

    deleteData.forEach((purchase) => {
      const deleteBtn = document.getElementById(`deleteBtn_${purchase.btnId}`);
      console.log(purchase);
      deleteBtn.addEventListener("click", async () => {
        await fetch(BASE_URL + "purchase/delete", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
          },
          body: JSON.stringify({ Id: purchase.data }),
        });
      });
    });
  }

  function populateUserTable(data = []) {
    const tableBody = document.getElementById("table-body");
    const modalsData = [];
    const deleteData = [];
    data.forEach((row) => {
      const modalId = generateId();
      let res = generateRow(
        modalId,
        row.Id,
        row.FirstName,
        row.LastName,
        row.Username,
        row.Email,
        row.Role === 1 ? "ADMIN" : "CLIENT",
        row.CreatedAt
      );
      tableBody.innerHTML = tableBody.innerHTML + res;

      modalsData.push({ id: `editUser_${modalId}`, data: row });
      deleteData.push({ id: `deleteUser_${modalId}`, data: row.Id });
    });
    console.log(modalsData);

    modalsData.forEach((modal) => {
      const btn = document.getElementById(modal.id);
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const form = generateModal(modal.id, modal.data);
        const backdrop = Backdrop(form);
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          const result = await fetch(BASE_URL + "admin/put", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
            },
            body: JSON.stringify({
              Id: modal.data.Id,
              FirstName: form.inputFirstName.value,
              LastName: form.inputLastName.value,
              Username: form.inputUsername.value,
              Email: form.inputEmail.value,
              PasswordHash: form.inputPassword.value,
              Role: form.inputRole.value,
            }),
          });

          if (result.status >= 200 && result.status <= 299) {
            const data = await result.text();
            console.log(data);
            closeModal(backdrop, form);
          } else {
            console.log(result.status, result.statusText);
          }
        });
      });
    });
    deleteData.forEach((row) => {
      const btn = document.getElementById(row.id);
      btn.addEventListener("click", async () => {
        const result = await fetch(BASE_URL + "admin/delete", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
          },
          body: JSON.stringify({ Id: row.data }),
        });
        console.log(result.text());
      });
    });
  }
};
