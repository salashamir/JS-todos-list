/* CHRISTIAN SALAZAR - SPRINGBOARD - TODO LIST ASSIGNMENT */

// querying elements
const newTodoForm = document.querySelector("#new-todo-form");
const formInput = document.querySelector("#todo-input");
const todosUl = document.querySelector(".tasks");
const tasksLeft = document.querySelector("#tasks-left");
const emptyListBtn = document.querySelector("#empty-list-btn");
// todos in local storage; if not, initialize empty array to hold them
// todo object sctructure will be: {text:"go to the movies", id:"....."}
let todosArray = JSON.parse(localStorage.getItem("todosArray")) || [];

// functions
const initializeList = function (array) {
  array.forEach((todo) => {
    appendTodoToList(createTodo(todo));
  });
  updateTasksNumber();
};
// update task list number
const updateTasksNumber = function () {
  tasksLeft.textContent = todosArray.length;
};
// create a todo
const createTodo = function (todoObj) {
  // create elements
  const li = document.createElement("li");
  const span = document.createElement("span");
  const removeBtn = document.createElement("button");
  const icon = document.createElement("i");
  // deal with span
  span.classList.add("todo-text");
  span.innerText = todoObj.text;
  li.appendChild(span);
  // deal with button
  removeBtn.setAttribute("type", "button");
  removeBtn.setAttribute("aria-label", "remove item from todo list");
  removeBtn.classList.add("todo-remove");
  // deal with icon
  icon.className = "bx bx-trash trashcan";
  removeBtn.appendChild(icon);
  // deal with li
  li.classList.add("todo");
  li.appendChild(removeBtn);
  // if object has id property
  li.setAttribute("data-id", todoObj.id ?? uuidv4());
  return li;
};

const appendTodoToList = function (element) {
  todosUl.appendChild(element);
  updateTasksNumber();
};

// event listeners
// form submit:
newTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // check if not empty
  if (!formInput.value) return;

  // create the todo object
  const todo = {
    text: formInput.value,
    id: uuidv4(),
  };
  // add todo object to global tasks array
  todosArray.push(todo);
  // set local storage
  localStorage.setItem("todosArray", JSON.stringify(todosArray));
  // append to list
  appendTodoToList(createTodo(todo));

  formInput.value = "";
});
// clicking on tasks list:
todosUl.addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    // remove from global array
    // get id of li
    const id = e.target.parentElement.parentElement.dataset.id;
    // use filter on global array and filter out the object w/ that id
    const updatedArray = todosArray.filter((todo) => todo.id !== id);
    todosArray = updatedArray;
    // update local storage with updatedarray
    localStorage.setItem("todosArray", JSON.stringify(updatedArray));
    // remove from ui
    e.target.parentElement.parentElement.remove();
    // update tasks number
    updateTasksNumber();
  }
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.toggle("completed");
  }
});
// clicking on empty list btn
emptyListBtn.addEventListener("click", function () {
  todosArray = [];
  localStorage.setItem("todosArray", JSON.stringify(todosArray));
  initializeList(todosArray);
  // clear ui
  todosUl.innerHTML = "";
});

initializeList(todosArray);
