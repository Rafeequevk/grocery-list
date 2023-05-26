// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
clearBtn.addEventListener("click", clearItems);

//submit form
form.addEventListener("submit", addItem);

// ****** FUNCTIONS **********

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime.toString();
  if (value && !editFlag) {
    //add class
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    //add id
    const attrbt = document.createAttribute("data-id");
    attrbt.value = id;
    // all attrbt to class
    element.setAttributeNode(attrbt);

    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");

    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    //append child
    list.appendChild(element);
    //display alert
    displayAlert("Item Added succesfully", "success");
    //show container
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setbackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");

    // setbackToDefault();
  } else {
    displayAlert("Please enter your Values", "danger");
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//set Back to deafult
function setbackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Submit";
}

//delete item
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item Deleted", "danger");
  setbackToDefault();
  //remove from local storage
  //removeFromLocalStorage(id)
}

//clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Empty List", "danger");
  setbackToDefault();
  // localStorage.removeItem("list");
}

//edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  console.log(grocery.value);
  //set form value
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.innerHTML = "edit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage() {}
function removeFromLocalStorage(id) {}
