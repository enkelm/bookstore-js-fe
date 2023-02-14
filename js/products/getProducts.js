const BASE_URL = "http://localhost/bookstore-php-api/index.php/";
const booksWrapper = document.getElementById("books-wrapper");

const generateId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.trim();
};

const Book = (
  bookId,
  imgUrl,
  title,
  author,
  description,
  price,
  bulkPrice,
  bulkCondition
) => {
  const bookWrapper = document.createElement("div");
  bookWrapper.classList = "col";

  const learnMoreId = generateId();
  const editId = generateId();
  const purchaseId = generateId();
  const deleteBookId = generateId();

  bookWrapper.style.animation = `fadein 0.5s`;

  bookWrapper.innerHTML = `
    <div class="card h-100" style="width: 18rem;">
        <img src="${imgUrl}" class="card-img-top" alt="${title} cover image" />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${author}</h6>

            <div class="description" style="margin-bottom: 5px;">
                <p class="card-text">Description: <span class="shortDescription">${description}</span>
                    <a class="link-info" data-bs-toggle="modal" data-bs-target="${
                      "#" + learnMoreId
                    }"
                        style="cursor: pointer;">
                        Learn More
                    </a>
                </p>
                
                <div
                  class="modal fade"
                  id="${learnMoreId}"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        ${description}
                      </div>
                    </div>
                  </div>
                </div>

                <form
                  class="modal fade"
                  id="${editId}"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Edit: ${title}</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="grid grid-col-2 gap-2">
                          <label for="inputTitle">Title</label>
                          <input
                            type="text"
                            id="inputTitle_${editId}"
                            class="form-control"
                            placeholder="Title"
                            required
                            value="${title}"
                            autofocus=""
                          />
                          <label for="inputAuthor">Author</label>
                          <input
                            type="text"
                            id="inputAuthor_${editId}"
                            class="form-control"
                            placeholder="Author Name"
                            required
                            value="${author}"
                          />
                          <label for="inputDescripion">Description</label>
                          <textarea name="" id="inputDescription_${editId}" 
                            class="form-control" 
                            cols="30" rows="3"
                            placeholder="Book synopsis..."
                            required
                          >${description}</textarea>
                          <label for="inputPrice">Price</label>
                          <input
                          type="number"
                          id="inputPrice_${editId}"
                          class="form-control"
                          placeholder="100"
                          value="${price}"
                          required
                          />
                          <label for="inputBulkPrice">Bulk Price</label>
                          <input
                            type="number"
                            id="inputBulkPrice_${editId}"
                            class="form-control"
                            placeholder="70"
                            required
                            value="${bulkPrice}"
                          />
                          <label for="inputBulkCondition">Bulk Condition</label>
                          <input
                            type="number"
                            id="inputBulkCondition_${editId}"
                            class="form-control"
                            placeholder="10"
                            required
                            value="${bulkCondition}"
                          />
                          <label for="inputCoverImage">Cover Image</label>
                          <input
                            type="file"
                            id="inputCoverImage_${editId}"
                          />
                          </div>
                      </div>
                      <div class="modal-footer">
                        <button id="${deleteBookId}" type="button" class="btn btn-primary">
                          Delete
                        </button>
                        <button type="submit" class="btn btn-primary" >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
            </div>

            

            <a href="#" id="${purchaseId}" class="btn btn-primary no-display-client" >Purchase</a>
            <a href="#" class="btn btn-primary no-display-admin" data-bs-toggle="modal" data-bs-target="${
              "#" + editId
            }">Edit</a>
        </div>

    </div>
    `;

  booksWrapper.appendChild(bookWrapper);

  const editForm = document.getElementById(editId);
  const purchaseBtn = document.getElementById(purchaseId);
  const deleteBookBtn = document.getElementById(deleteBookId);

  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("Title", editForm[`inputTitle_${editId}`].value);
    formData.append("Author", editForm[`inputAuthor_${editId}`].value);
    formData.append(
      "Description",
      editForm[`inputDescription_${editId}`].value
    );
    formData.append("Price", editForm[`inputPrice_${editId}`].value);
    formData.append("BulkPrice", editForm[`inputBulkPrice_${editId}`].value);
    formData.append(
      "BulkCondition",
      editForm[`inputBulkCondition_${editId}`].value
    );
    if (editForm[`inputCoverImage_${editId}`].files[0]) {
      formData.append(
        "CoverImage",
        editForm[`inputCoverImage_${editId}`].files[0]
      );
    }
    formData.append("CoverImageUrl", imgUrl);
    console.log(formData);
    console.log("save");
  });

  purchaseBtn.addEventListener("click", () => {
    let purchased = document.querySelector(`#item-${bookId}`);
    if (purchased) return bookWrapper;

    let totQuantity = parseInt(totalQuantity.innerHTML);
    totQuantity += 1;
    totalQuantity.innerHTML = `${totQuantity}`;

    let totPrice = parseInt(totalPrice.innerHTML);
    totPrice += price;
    totalPrice.innerHTML = `${totPrice}`;
    CreateShoppingItem(bookId, title, author, price);
  });

  deleteBookBtn.addEventListener("click", async () => {
    // const result = await fetch(BASE_URL + "products/delete", {
    //   method: POST,
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("USER_AUTH")}`,
    //   },
    //   body: JSON.stringify({ Id: bookId }),
    // });
    console.log("delete");
  });

  return bookWrapper;
};

async function getAllBooks() {
  const result = await fetch(BASE_URL + "products/getAll", {
    method: "GET",
  });
  const data = await result.json();

  return data;
}

const Books = async () => {
  const books = await getAllBooks();
  localStorage.setItem("BOOKS", JSON.stringify(books));
  books.forEach((book) => {
    Book(
      book.Id,
      book.CoverImageUrl,
      book.Title,
      book.Author,
      book.Description,
      book.Price,
      book.BulkPrice,
      book.BulkCondition
    );
  });
  checkAuth();
};

Books();
