// Dark & Light mode
const bodyEl = document.querySelector("body");
const toggleIconEl = document.getElementById("theme-toggle");

const userTheme = localStorage.getItem("theme");
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = null;

const setTheme = () => {
  if (userTheme) {
    currentTheme = userTheme;

    if (userTheme === "light" && !bodyEl.classList.contains("light-theme")) {
      bodyEl.classList.add("light-theme");
      bodyEl.classList.remove("dark-theme");
    } else if (
      userTheme === "dark" &&
      !bodyEl.classList.contains("dark-theme")
    ) {
      bodyEl.classList.add("dark-theme");
      bodyEl.classList.remove("light-theme");
    }
  }

  if (!userTheme) {
    if (prefersDarkTheme.matches) {
      currentTheme = "dark";
      bodyEl.classList.add("dark-theme");
      bodyEl.classList.remove("light-theme");
    } else {
      currentTheme = "light";
      bodyEl.classList.add("light-theme");
      bodyEl.classList.remove("dark-theme");
    }
  }
};

// setTheme();

const toggleTheme = () => {
  if (currentTheme === "light") {
    bodyEl.classList.remove("light-theme");
    bodyEl.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    currentTheme = "dark";
  } else if (currentTheme === "dark") {
    bodyEl.classList.remove("dark-theme");
    bodyEl.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    currentTheme = "light";
  }
};

toggleIconEl.addEventListener("click", toggleTheme);

// TODO scripts

let currentFilter = null;
let activeCount = 0;

const todoContainerEl = document.getElementById("todos-container");
const todoTemplate = document.getElementById("todo-element-template");

// TODO display scripts

const generateID = () => {
  return Math.floor(Math.random() * 100000);
};

const INITIAL_TODOS = [
  {
    text: "Complete online JavaScript course",
    isCompleted: "true",
    id: 0,
  },
  {
    text: "Jog around the park 3x",
    isCompleted: "false",
    id: 1,
  },
  {
    text: "10 minutes meditation",
    isCompleted: "false",
    id: 2,
  },
  {
    text: "Read for 1 hour",
    isCompleted: "false",
    id: 3,
  },
  {
    text: "Pick up groceries",
    isCompleted: "false",
    id: 4,
  },
  {
    text: "Complete Todo App on Frontend Mentor",
    isCompleted: "false",
    id: 5,
  },
];

let USER_TODOS = [];

const makeTodoDOMEl = (el) => {
  const clonedTemplate = todoTemplate.content.cloneNode(true);

  clonedTemplate.querySelector(".todo-text").textContent = el.text;
  clonedTemplate.querySelector("li").dataset.id = el.id;

  clonedTemplate.querySelector("li").dataset.completed = el.isCompleted;

  if (el.isCompleted === "true") {
    clonedTemplate.querySelector(".status-checkbox").checked = true;
  }

  todoContainerEl.appendChild(clonedTemplate);
};

const makeArrFromTODOs = () => {
  const currentTODOs = todoContainerEl.querySelectorAll("li");

  const newObjArr = [];

  currentTODOs.forEach((el) => {
    const todoObj = {
      text: el.querySelector(".todo-text").textContent,
      isCompleted: el.dataset.completed,
      id: el.dataset.id,
    };

    newObjArr.push(todoObj);
  });

  return newObjArr;
};

// Item counter
const itemCounterEl = document.querySelector(".item-counter");

const updateActiveCount = () => {
  const activeTODOElements = document.querySelectorAll(
    '[data-completed="false"]'
  );

  activeCount = activeTODOElements.length;
  itemCounterEl.textContent = `${activeCount} items left`;
};

updateActiveCount();

const updateUserTODOs = () => {
  const newArr = makeArrFromTODOs();
  USER_TODOS = [...newArr];
  saveCurrentListToStorage(USER_TODOS);
};

const populateList = (todoArr) => {
  todoArr.forEach((todo) => {
    makeTodoDOMEl(todo);
  });
};

const saveCurrentListToStorage = (todoArr) => {
  const arrToSave = JSON.stringify(todoArr);
  localStorage.setItem("userTODOs", arrToSave);
};

const initializeList = () => {
  if (localStorage.hasOwnProperty("userTODOs")) {
    const modifiedTODOs = JSON.parse(localStorage.getItem("userTODOs"));
    USER_TODOS = [...modifiedTODOs];
    populateList(USER_TODOS);
  } else {
    USER_TODOS = [...INITIAL_TODOS];
    populateList(USER_TODOS);
    saveCurrentListToStorage(USER_TODOS);
  }

  updateActiveCount();
};

initializeList();

// Drag & Drop
const sortableList = Sortable.create(todoContainerEl, {
  group: "sortableToDo",
  sort: true,
  animation: 150,
  draggable: ".todo-el",
  dataIdAttr: "data-id",
  ghostClass: "blue-bg",
  filter: ".todo-remove",
  onFilter: (evt) => {
    const currentToDo = evt.item;
    ctrl = evt.target;

    if (Sortable.utils.is(ctrl, ".todo-remove")) {
      currentToDo.parentNode.removeChild(currentToDo);
      updateUserTODOs();
      updateActiveCount();
    }
  },
  onSort: () => {
    saveCurrentOrder();
    updateUserTODOs();
    updateActiveCount();
  },
  store: {
    get: (sortableList) => {
      const order = localStorage.getItem(sortableList.options.group.name);
      return order ? order.split("|") : [];
    },
    set: () => {
      saveCurrentOrder();
    },
  },
});

// TODO add/remove scripts

const addTODOInputEL = document.getElementById("add-todo");
const addTODOCheckbox = document.querySelector(".add-todo-checkbox");

const addToDo = () => {
  const ToDoValue = addTODOInputEL.value;

  const newToDoObj = {
    text: ToDoValue,
    isCompleted: "false",
    id: generateID(),
  };

  USER_TODOS.push(newToDoObj);

  makeTodoDOMEl(newToDoObj);

  saveCurrentListToStorage(USER_TODOS);
  // populateList(USER_TODOS);
  sortableList.save();

  updateActiveCount();
  addTODOInputEL.value = "";
};

addTODOInputEL.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addToDo();
  }
});

addTODOCheckbox.addEventListener("click", () => {
  if (addTODOInputEL.value) {
    addToDo();
  }
});

const saveCurrentOrder = () => {
  const order = sortableList.toArray();
  localStorage.setItem(sortableList.options.group.name, order.join("|"));
};

// Reset TODO list
const resetBtn = document.getElementById("reset-btn");

const resetEverything = () => {
  todoContainerEl.replaceChildren();
  localStorage.removeItem("userTODOs");
  localStorage.removeItem("sortableToDo");
  USER_TODOS = [...INITIAL_TODOS];
  populateList(USER_TODOS);
  saveCurrentListToStorage(USER_TODOS);
  sortableList.save();
  updateActiveCount();
};

resetBtn.addEventListener("click", resetEverything);

const todoStatusCheckboxes = document.querySelectorAll(".status-checkbox");


todoStatusCheckboxes.forEach((el) => {
  el.addEventListener("change", () => {
    if (el.checked) {
      el.closest("li").dataset.completed = "true";
    } else {
      el.closest("li").dataset.completed = "false";
    }
    updateActiveCount();
    updateUserTODOs();
    updateVisibility();
  });
});

const clearCompletedBtn = document.getElementById("clear-completed-btn");

clearCompletedBtn.addEventListener("click", () => {
  const completed = document.querySelectorAll('[data-completed="true"]');

  completed.forEach((el) => {
    el.remove();
  });

  updateActiveCount();
  updateUserTODOs();
  sortableList.save();
});

const updateVisibility = () => {
  const allEls = document.querySelectorAll(".todo-el");
  const activeEls = document.querySelectorAll('[data-completed="false"]');
  const completedEls = document.querySelectorAll('[data-completed="true"]');

  if (currentFilter === "active") {

    completedEls.forEach((el) => {
      el.classList.remove("show-todo");
      el.classList.add("hide-todo");
    });
    activeEls.forEach((el) => {
      el.classList.add("show-todo");
      el.classList.remove("hide-todo");
    });
  } else if (currentFilter === "completed") {

    completedEls.forEach((el) => {
      el.classList.remove("hide-todo");
      el.classList.add("show-todo");
    });
    activeEls.forEach((el) => {
      el.classList.add("hide-todo");
      el.classList.remove("show-todo");
    });
  } else {
    allEls.forEach((el) => {
      el.classList.add("show-todo");
      el.classList.remove("hide-todo");
    });
  }
};

const filterRadios = document.querySelectorAll(".filter-radio");

filterRadios.forEach((el) => {
  el.addEventListener("change", () => {
    currentFilter = el.value;
    updateVisibility();
  });
});
