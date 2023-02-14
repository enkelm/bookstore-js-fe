const purchasedItems = document.querySelector(".purchasedItems");
const totalQuantity = document.getElementById("total-quantity");
const totalPrice = document.getElementById("total-price");
const purchaseBtn = document.getElementById("purchaseBtn");
const purchaseList = []; // stores items to be send over fetch

const CreateShoppingItem = (
  bookId = generateId(),
  title = "",
  author = "",
  price = 0
) => {
  const item = document.createElement("div");
  item.classList = "card rounded-3 mb-4";
  item.id = `item-${bookId}`;

  const deleteBtnId = generateId();
  const quantityId = generateId();

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
              id="${quantityId}"
              name="quantity"
              value="1"
              type="number"
              min="0"
              max="100"
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

  let quantityInput = document.getElementById(quantityId);
  let deleteBtn = document.getElementById(deleteBtnId);

  deleteBtn.addEventListener("click", () => {
    purchasedItems.removeChild(item);
    let removeFromTotal = parseInt(quantityInput.value) * price;
    totalQuantity.innerHTML = `${
      parseInt(totalQuantity.innerHTML) - parseInt(quantityInput.value)
    }`;
    totalPrice.innerHTML = `${
      parseInt(totalPrice.innerHTML) - removeFromTotal
    }`;
    deleteItemFromList(bookId);
  });

  let prevQuantity = 1;

  purchaseList.push({
    Product: bookId,
    Quantity: prevQuantity,
  });

  quantityInput.addEventListener("change", (event) => {
    let totQuantity = parseInt(totalQuantity.innerHTML);
    let currQuantity = parseInt(event.target.value);
    let newTotalPrice = parseInt(totalPrice.innerHTML);

    if (prevQuantity < currQuantity) {
      totQuantity += 1;
      newTotalPrice += price;
    }
    if (prevQuantity > currQuantity) {
      totQuantity -= 1;
      newTotalPrice -= price;
    }
    if (currQuantity === 0) {
      purchasedItems.removeChild(item);
      deleteItemFromList(bookId);
    }
    totalQuantity.innerHTML = `${totQuantity}`;
    totalPrice.innerHTML = `${newTotalPrice}`;
    prevQuantity = currQuantity;

    purchaseList.forEach((purchasedItem) => {
      if (purchasedItem.Product === bookId) {
        purchasedItem.Quantity = prevQuantity;
      }
    });
  });
};

purchaseBtn.addEventListener("click", async () => {
  const result = await fetch(BASE_URL + "purchase/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
    },
    body: JSON.stringify(purchaseList),
  });
});

const deleteItemFromList = (bookId) => {
  let itemToDelete = purchaseList.find((item) => item.Product === bookId);
  itemToDelete && purchaseList.splice(purchaseList.indexOf(itemToDelete), 1);
};
