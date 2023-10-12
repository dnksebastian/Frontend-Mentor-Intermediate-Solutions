console.log('.');

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