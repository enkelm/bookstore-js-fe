const purchasesPanelBtn = document.getElementById("purchasesPanel");
// const tableInfo = [];
// getInfo().then((res) => (purchasesInfo = res));

async function getPurchasesInfo() {
  const result = await fetch(BASE_URL + "purchase/getAll", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
    },
  });
  const data = await result.json();
  return data;
}

const purchaseTableRow = (
  modalId,
  id,
  firstName,
  lastName,
  username,
  totalPrice,
  createdAt
) => {
  return `
  <tr>
    <th scope="row">${id}</th>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${username}</td>
    <td>${totalPrice}</td>
    <td>${createdAt}</td>
    <td>
      <div class="d-grid gap-2 d-md-block">
        <button id="deleteBtn_${modalId}" type="button" class="btn btn-outline-danger">
          <i class="bi bi-trash"></i>
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#tableItems_${modalId}"
        >
          <i class="bi bi-folder-symlink-fill"></i>
        </button>
      </div>
    </td>
  </tr>
  `;
};

const purchasesPanel = async () => {
  const purchasesTable = document.createElement("div");
  purchasesTable.id = "purchasesTable";

  const tableInfo = await getPurchasesInfo();

  purchasesTable.innerHTML = `
      <div class="table-responsive">
      <table class="table table-hover caption-top" style="width: 95%">
        <caption>List of purchases</caption>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Username </th>
            <th scope="col">Total Price</th>
            <th scope="col">Created at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider" id="table-body">
        </tbody>
      </table>
    </div>
    `;

  return { component: purchasesTable, props: tableInfo };
};

function purchaseModal(modalId, data = []) {
  const tableItemsModal = document.createElement("div");

  tableItemsModal.innerHTML = `
  <div
    class="modal fade"
    id="tableItems_${modalId}"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="tableItems_${modalId}"
    aria-hidden="true"
  >
    >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-hover caption-top">
              <caption>List of purchased items </caption>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody class="table-group-divider" id="modalBody_${modalId}">
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">
            Back to purchases
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(tableItemsModal);
  const modalBody = document.getElementById(`modalBody_${modalId}`);
  data.forEach((item) => {
    modalBody.innerHTML =
      modalBody.innerHTML +
      generateRow(item.Id, item.Title, item.Author, item.Price, item.Quantity);
  });
  function generateRow(id, title, author, price, quantity) {
    return `<tr>
              <th scope="row">${id}</th>
              <td>${title}</td>
              <td>${author}</td>
              <td>${price}</td>
              <td>${quantity}</td>
            </tr>`;
  }
  return tableItemsModal;
}

purchasesPanelBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  (!displayedPanel[0] || displayedPanel[0].component.id !== "purchsesTable") &&
    placePanel(purchasesPanel, purchaseTableRow, purchaseModal);
});
