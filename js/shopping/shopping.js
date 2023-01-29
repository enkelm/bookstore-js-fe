const purchasedItems = document.querySelector(".purchasedItems");

const CreateShoppingItem = (
  bookId = generateId,
  title = "",
  author = "",
  price = 0
) => {
  const item = document.createElement("div");
  item.classList = "card rounded-3 mb-4";
  item.id = `item-${bookId}`;

  const deleteBtnId = generateId();

  item.innerHTML = `
      <div class="card-body p-4">
        <div class="row d-flex justify-content-between align-items-center">
          <div class="col-md-3 col-lg-3 col-xl-3">
            <p class="lead fw-normal">${title}</p>
            <p><span class="text-muted">Author: </span> ${author}</p>
          </div>
          <div
            class="col-md-3 col-lg-3 col-xl-2 d-flex"
            style="margin-bottom: 4%; padding: 0.1%"
          >
            <button class="btn btn-link px-2">
              <i class="fas fa-minus"></i>
            </button>

            <input
              id="form1"
              name="quantity"
              value="1"
              type="number"
              class="form-control form-control-sm"
            />

            <button class="btn btn-link px-2">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 class="lead fw-normal mb-1">${price}</h5>
          </div>
          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            <button id="${deleteBtnId}" type="button" class="btn btn-secondary">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;

  purchasedItems.appendChild(item);

  let deleteBtn = document.getElementById(deleteBtnId);
  deleteBtn.addEventListener("click", () => {
    purchasedItems.removeChild(item);
  });

  return item;
};
