document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item${todo.completed ? ' complete' : ''}`;
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="complete-btn">&#10003;</button>
                    <button class="edit-btn">&#9998;</button>
                    <button class="delete-btn">&times;</button>
                </div>
            `;

            todoItem.querySelector('.complete-btn').addEventListener('click', () => {
                todo.completed = !todo.completed;
                saveToLocalStorage();
                renderTodos();
            });

            todoItem.querySelector('.edit-btn').addEventListener('click', () => {
                const newTask = prompt('Update the task:', todo.text);
                if (newTask) {
                    todo.text = newTask;
                    saveToLocalStorage();
                    renderTodos();
                }
            });

            todoItem.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                saveToLocalStorage();
                renderTodos();
            });

            todoList.appendChild(todoItem);
        });
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = {
            text: todoInput.value,
            completed: false
        };
        todos.push(newTodo);
        saveToLocalStorage();
        renderTodos();
        todoInput.value = '';
    });

    renderTodos();
});
