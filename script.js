const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');

let todos = [];

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = newTodoInput.value.trim();
    if (newTodo) {
        const todo = {
            id: Date.now(),
            title: newTodo,
            isCompleted: false,
            dueDate: null
        };
        todos.push(todo);
        renderTodos();
        newTodoInput.value = '';
    }
});

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span class="title">${todo.title}</span>
            <span class="due-date">${todo.dueDate ? `Due: ${todo.dueDate}` : ''}</span>
            <button class="edit">Edit</button>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
        `;
        todoList.appendChild(todoItem);

        const editButton = todoItem.querySelector('.edit');
        editButton.addEventListener('click', () => {
            const newTitle = prompt('Edit todo:', todo.title);
            if (newTitle) {
                todo.title = newTitle;
                renderTodos();
            }
        });

        const completeButton = todoItem.querySelector('.complete');
        completeButton.addEventListener('click', () => {
            todo.isCompleted = !todo.isCompleted;
            renderTodos();
        });

        const deleteButton = todoItem.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            todos = todos.filter((t) => t.id !== todo.id);
            renderTodos();
        });
    });
}

renderTodos();