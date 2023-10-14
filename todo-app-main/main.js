// Dark & Light mode
const bodyEl = document.querySelector('body');
const toggleIconEl = document.getElementById('theme-toggle');

let currentTheme = 'light';
const userTheme = localStorage.getItem('theme');
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

const checkUserTheme = () => {

    if(!userTheme && !prefersDarkTheme) {
        bodyEl.classList.remove('dark-theme')
        bodyEl.classList.add('light-theme');
    }

    if (prefersDarkTheme) {
        bodyEl.classList.remove('light-theme')
        bodyEl.classList.add('dark-theme');
        // localStorage.setItem("theme", 'dark');
        currentTheme = 'dark'
    }

    if (userTheme == "dark") {
        bodyEl.classList.remove('light-theme')
        bodyEl.classList.add('dark-theme');
        currentTheme = 'dark'
    } else if (userTheme == "light") {    
        bodyEl.classList.remove('dark-theme')
        bodyEl.classList.add('light-theme');
        currentTheme = 'light'
      }

    };

// checkUserTheme()


const toggleTheme = () => {

    if(currentTheme === 'light') {
        bodyEl.classList.remove('light-theme');
        bodyEl.classList.add('dark-theme')
        // localStorage.setItem("theme", 'dark');
    } else if(currentTheme === 'dark') {
        bodyEl.classList.remove('dark-theme');
        bodyEl.classList.add('light-theme')
        // localStorage.setItem("theme", 'light');
    }
};

toggleIconEl.addEventListener('click', toggleTheme)



// TODO scripts


const INITIAL_TODOS = [
    {
        text: 'Complete online JavaScript course',
        isCompleted: true,
        place: 0
    },
    {
        text: 'Jog around the park 3x',
        isCompleted: false,
        place: 1
    },
    {
        text: '10 minutes meditation',
        isCompleted: false,
        place: 2
    },
    {
        text: 'Read for 1 hour',
        isCompleted: false,
        place: 3
    },
    {
        text: 'Pick up groceries',
        isCompleted: false,
        place: 4
    },
    {
        text: 'Complete Todo App on Frontend Mentor',
        isCompleted: false,
        place: 5
    }
];


const todoContainerEl = document.getElementById('todos-container');
const todoTemplate = document.getElementById('todo-element-template')

const populateList = () => {
    INITIAL_TODOS.forEach((todo) => {
        const clonedTemplate = todoTemplate.content.cloneNode(true);

        clonedTemplate.querySelector('.todo-text').textContent = todo.text

        todoContainerEl.appendChild(clonedTemplate)
    });
}

populateList()