// Dark & Light mode
const bodyEl = document.querySelector('body');
const toggleIconEl = document.getElementById('theme-toggle');

const userTheme = localStorage.getItem('theme');
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = null;


const setTheme = () => {

    if(userTheme) {
        currentTheme = userTheme

        if (userTheme === 'light' && !bodyEl.classList.contains('light-theme')) {
            bodyEl.classList.add('light-theme')
            bodyEl.classList.remove('dark-theme')
        } else if (userTheme === 'dark' && !bodyEl.classList.contains('dark-theme')) {
            bodyEl.classList.add('dark-theme')
            bodyEl.classList.remove('light-theme')
        }
    }

    if (!userTheme) {
        if (prefersDarkTheme.matches) {
            currentTheme = 'dark'
            bodyEl.classList.add('dark-theme')
            bodyEl.classList.remove('light-theme')
        } else {
            currentTheme = 'light'
            bodyEl.classList.add('light-theme')
            bodyEl.classList.remove('dark-theme')
        }
    }

};

setTheme()


const toggleTheme = () => {

    if(currentTheme === 'light') {
        bodyEl.classList.remove('light-theme');
        bodyEl.classList.add('dark-theme')
        localStorage.setItem("theme", 'dark');
        currentTheme = 'dark'
    } else if(currentTheme === 'dark') {
        bodyEl.classList.remove('dark-theme');
        bodyEl.classList.add('light-theme')
        localStorage.setItem("theme", 'light');
        currentTheme = 'light'
    }

};

toggleIconEl.addEventListener('click', toggleTheme)



// TODO scripts
let currentFilter = null;
let activeCount = 0;

const todoContainerEl = document.getElementById('todos-container');
const todoTemplate = document.getElementById('todo-element-template')

// TODO display scripts


const generateID = () => {
    return Math.floor(Math.random() * 100000);
};


const INITIAL_TODOS = [
    {
        text: 'Complete online JavaScript course',
        isCompleted: true,
        id: 0
    },
    {
        text: 'Jog around the park 3x',
        isCompleted: false,
        id: 1
    },
    {
        text: '10 minutes meditation',
        isCompleted: false,
        id: 2
    },
    {
        text: 'Read for 1 hour',
        isCompleted: false,
        id: 3
    },
    {
        text: 'Pick up groceries',
        isCompleted: false,
        id: 4
    },
    {
        text: 'Complete Todo App on Frontend Mentor',
        isCompleted: false,
        id: 5
    }
];




const populateList = () => {
    INITIAL_TODOS.forEach((todo) => {
        const clonedTemplate = todoTemplate.content.cloneNode(true);

        clonedTemplate.querySelector('.todo-text').textContent = todo.text

        clonedTemplate.querySelector('li').dataset.completed = todo.isCompleted

        if(todo.isCompleted) {
            clonedTemplate.querySelector('.status-checkbox').checked = true;
        }


        todoContainerEl.appendChild(clonedTemplate)
    });
}

populateList()


// TODO add/remove scripts

// TODO styling scripts


const allTODOElements = document.querySelectorAll('.todo-el');
const activeTODOElements = document.querySelectorAll('[data-completed="false"]');



const todoStatusCheckboxes = document.querySelectorAll('.status-checkbox');

const filterRadios = document.querySelectorAll('.filter-radio');


todoStatusCheckboxes.forEach(el => {
    el.addEventListener('change', () => {
        if (el.checked) {
            el.closest('li').dataset.completed = true;
        } else {
            el.closest('li').dataset.completed = false;
        }

        updateActiveCount()
    })
})


filterRadios.forEach(el => {
    el.addEventListener('change', () => {

        currentFilter = el.value
        
        console.log(currentFilter);
    })

});



// Item counter
const itemCounterEl = document.querySelector('.item-counter');

const updateActiveCount = () => {
    activeCount = activeTODOElements.length;
    itemCounterEl.textContent = `${activeCount} items left`;
};

updateActiveCount();

