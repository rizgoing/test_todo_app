const addTodo = document.querySelector(".add-todo");
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-button");
const checkAll = document.querySelector(".complete-all");
const deleteAll = document.querySelector(".delete-comp");
const filterAllButton = document.querySelector(".all");
const filterCompButton = document.querySelector(".completed");
const filterActiveButton = document.querySelector(".active-filt");
const block3 = document.querySelector(".block-3");
const deleteField = document.querySelector(".delete-field");
const searchField = document.querySelector("#searching");

let todos = localStorage.length
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

drawTodos(todos);

addButton.addEventListener("click", () => addTodoFunc());
addTodo.addEventListener("keypress", (e) => {
  e.keyCode === 13 ? addButton.click() : "";
});

function addTodoFunc() {
  const newTodo = {
    todo: addTodo.value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    id: Math.random().toString(),
    completed: false,
  };
  newTodo.todo ? todos.push(newTodo) : console.log(sasat);
  addTodo.value = "";
  drawTodos(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (cl) => {
      const newTodoList = todos.filter(
        (todo) => todo.id !== cl.target.parentElement.id
      );
      todos = [...newTodoList];
      localStorage.setItem("todos", JSON.stringify(todos));
      drawTodos(todos);
    });
  });
}

function editTodo() {
  const editButtons = document.querySelectorAll(".edit");

  editButtons.forEach((b) => {
    b.addEventListener("click", (ev) => {
      ev.target.classList.add("hide");
      const tempText = ev.target.previousElementSibling.innerText.toString();
      ev.target.previousElementSibling.innerHTML = `<input type="text" id="editedTodo" value="${tempText}" />`;
      ev.target.previousElementSibling.addEventListener("keypress", (eee) => {
        if (eee.keyCode === 13) {
          ev.target.classList.remove("hide");
          const tempp = todos.filter(
            (it) => it.id === eee.target.parentElement.parentElement.id
          );
          tempp[0].todo = eee.target.value;
          eee.target.parentElement.innerHTML = `${tempp[0].todo}`;
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      });
    });
  });
}

function drawTodos(array) {
  todos.length
    ? (deleteField.className = "delete-field")
    : (deleteField.className = "hide");
  todos.length ? (block3.className = "block-3") : (block3.className = "hide");

  if (array.length) {
    todoList.innerHTML = array
      .map((todo) => {
        return `<li id=${todo.id} class=${
          todo.completed ? "checked" : "active"
        } ><span class="checkbox"><img src="img/checked.svg"  class="checkbox-img ${
          todo.completed ? "cmpl" : "hide"
        } " /></span><span class="todo-item">${todo.todo}</span>
          <img src="img/edit.svg" class="edit ${
            todo.completed ? "hide" : ""
          }" /><img src="img/delete.svg" class="delete ${
          todo.completed ? "hide" : ""
        }" /></li>`;
      })
      .join("");
  } else {
    todoList.innerHTML = "";
    // deleteField.className = "hide";
    // block3.className = "hide";
  }
  deleteTodo(array);
  editTodo(array);
  todoComplete(array);
}

function todoComplete() {
  const todoItems = document.querySelectorAll(".checkbox-img");
  todoItems.forEach((t) => {
    t.addEventListener("click", (e) => {
      todos.forEach((to) => {
        e.target.parentElement.parentElement.id === to.id
          ? (to.completed = !to.completed)
          : "";
      });
      drawTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });

  todoItems.forEach((t) => {
    t.parentElement.addEventListener("click", (e) => {
      todos.forEach((to) => {
        e.target.parentElement.id === to.id
          ? (to.completed = !to.completed)
          : "";
      });

      drawTodos(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
}

function handleCheckAll() {
  todos.forEach((t) => {
    t.completed = true;
  });

  drawTodos(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleDeleteAll() {
  const newTodoArray = todos.filter((t) => !t.completed);
  todos = [...newTodoArray];
  drawTodos(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

deleteAll.addEventListener("click", () => handleDeleteAll(todos));
checkAll.addEventListener("click", () => handleCheckAll(todos));

filterCompButton.addEventListener("click", (e) => {
  handleFilters(e);
});

filterActiveButton.addEventListener("click", (e) => {
  handleFilters(e);
});

filterAllButton.addEventListener("click", (e) => {
  handleFilters(e);
});

function handleFilters(e) {
  const act = document.querySelectorAll(".active");
  const compl = document.querySelectorAll(".checked");

  if (e.target.className === "active-filt") {
    act.forEach((i) => i.classList.remove("hide"));
    compl.forEach((i) => i.classList.add("hide"));
  } else if (e.target.className === "completed") {
    act.forEach((i) => i.classList.add("hide"));
    compl.forEach((i) => i.classList.remove("hide"));
  } else {
    act.forEach((i) => i.classList.remove("hide"));
    compl.forEach((i) => i.classList.remove("hide"));
  }
}

searchField.addEventListener("keyup", (e) => {
  const searchRes = todos.filter((i) =>
    i.todo
      .toString()
      .toLowerCase()
      .includes(e.target.value.toString().toLowerCase())
  );
  drawTodos(searchRes);
});
