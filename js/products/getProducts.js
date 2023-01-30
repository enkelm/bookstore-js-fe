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

  bookWrapper.innerHTML = `
    <div class="card h-100" style="width: 18rem;">
        <img src="${imgUrl}" class="card-img-top" alt="" />
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
                            id="inputTitle"
                            class="form-control"
                            placeholder="Title"
                            required
                            value="${title}"
                            autofocus=""
                          />
                          <label for="inputAuthor">Author</label>
                          <input
                            type="text"
                            id="inputAuthor"
                            class="form-control"
                            placeholder="Author Name"
                            required
                            value="${author}"
                          />
                          <label for="inputDescripion">Description</label>
                          <textarea name="" id="inputDescription" 
                            class="form-control" 
                            cols="30" rows="3"
                            placeholder="Book synopsis..."
                            value="${description}"
                            required
                          ></textarea>
                          <label for="inputPrice">Price</label>
                          <input
                          type="number"
                          id="inputPrice"
                          class="form-control"
                          placeholder="100"
                          value="${price}"
                          required
                          />
                          <label for="inputBulkPrice">Bulk Price</label>
                          <input
                            type="number"
                            id="inputBulkPrice"
                            class="form-control"
                            placeholder="70"
                            required
                            value="${bulkPrice}"
                          />
                          <label for="inputBulkCondition">Bulk Condition</label>
                          <input
                            type="number"
                            id="inputBulkCondition"
                            class="form-control"
                            placeholder="10"
                            required
                            value="${bulkCondition}"
                          />
                          <label for="inputCoverImage">Cover Image</label>
                          <input
                            type="file"
                            id="inputCoverImage"
                          />
                          </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary">
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

  let purchaseBtn = document.getElementById(purchaseId);
  purchaseBtn.addEventListener("click", () => {
    let purchased = document.querySelector(`#item-${bookId}`);
    if (purchased) return bookWrapper;
    CreateShoppingItem(bookId, title, author, price);
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
