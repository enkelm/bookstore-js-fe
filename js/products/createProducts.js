const createBookBtn = document.getElementById("createBookBtn");

const CreateBookForm = () => {
  const form = document.createElement("form");
  form.method = "post";
  form.classList = "flex flex-col flex-center gap-3 card popup";
  form.style = "overflow: scroll";
  form.id = "createBookForm";

  form.innerHTML = `
    <h1>Create Book</h1>

      <div class="grid grid-col-2 gap-2">
        <label for="inputTitle">Title</label>
        <input
          type="text"
          id="inputTitle"
          class="form-control"
          placeholder="Title"
          required
          autofocus=""
        />
        <label for="inputAuthor">Author</label>
        <input
          type="text"
          id="inputAuthor"
          class="form-control"
          placeholder="Author Name"
          required
          autofocus=""
        />
        <label for="inputDescripion">Description</label>
        <textarea name="" id="inputDescription" 
          class="form-control" 
          cols="30" rows="3"
          placeholder="Book synopsis..."
          required
        ></textarea>
        <label for="inputPrice">Price</label>
        <input
        type="number"
        id="inputPrice"
        class="form-control"
        placeholder="100"
        required
        />
        <label for="inputBulkPrice">Bulk Price</label>
        <input
          type="number"
          id="inputBulkPrice"
          class="form-control"
          placeholder="70"
          required
          autofocus=""
        />
        <label for="inputBulkCondition">Bulk Condition</label>
        <input
          type="number"
          id="inputBulkCondition"
          class="form-control"
          placeholder="10"
          required
          autofocus=""
        />
        <label for="inputCoverImage">Cover Image</label>
        <input
          type="file"
          id="inputCoverImage"
        />
        </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    `;
  document.body.appendChild(form);
  return form;
};

createBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const modal = CreateBookForm();
  let backdrop = Backdrop(modal);
  modal.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formData = new FormData(modal);
    formData.append("Title", modal.inputTitle.value);
    formData.append("Author", modal.inputAuthor.value);
    formData.append("Description", modal.inputDescription.value);
    formData.append("Price", modal.inputPrice.value);
    formData.append("BulkPrice", modal.inputBulkPrice.value);
    formData.append("BulkCondition", modal.inputBulkCondition.value);
    formData.append("CoverImage", modal.inputCoverImage.files[0]);
    formData.append("CoverImageUrl", modal.inputCoverImage.files[0].name);
    console.log(formData);
    let submitData = new URLSearchParams(formData);

    const result = await fetch(BASE_URL + "products/add", {
      method: "POST",
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("USER_AUTH"),
      },
      body: formData,
    });

    if (result.status >= 200 && result.status <= 299) {
      const data = await result.json();
      console.log(data);
      closeModal(backdrop, modal);
    } else {
      console.log(result.status, result.statusText);
    }
  });
});
