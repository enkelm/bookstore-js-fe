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

const Book = (bookId, imgUrl, title, author, description, price) => {
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

                <div
                  class="modal fade"
                  id="${editId}"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Book title</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>Modal body text goes here.</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            

            <a href="#" id="${purchaseId}" class="btn btn-primary no-display" >Purchase</a>
            <a href="#" class="btn btn-primary no-display" data-bs-toggle="modal" data-bs-target="${
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
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
}

const Books = () => {
  Book(
    0,
    "localhost:80/bookstore-php-api/images/",
    "test",
    "test",
    "kfjhakjfdhksadfhlkdsa",
    10
  );
  // Book("", "test", "test", "kjsadksahdlkdsfhlksaf");
};

Books();
