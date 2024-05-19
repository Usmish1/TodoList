let todos = [];
getList();
setInterval(getList, 1000);


function addTodo() {
    const input = document.getElementById('todoInput');
    const value = input.value;
    input.value = '';

    
    todos.push(value);
    sendList()

    updateTodoList();
}

function removeTodo(index) {
    
    todos.splice(index, 1);
    sendList()
    updateTodoList();
}

function editTodo(index) {
    
    todos[index] = document.getElementById('todoInput').value;
    sendList()

    updateTodoList();
}

function getList(){
    // Define the API URL
    const apiUrl = 'http://10.0.0.126:5500/api/todos';

    // Make a GET request
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.todos);
        todos = data;
        updateTodoList();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function sendList(){
    fetch('http://10.0.0.126:5500/api/todos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(todos)  // The new todo should be a list
    })
}

function updateTodoList() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    for(let i = 0; i < todos.length; i++) {
        const todo = document.createElement('li');
        todo.textContent = todos[i];

        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.className = 'remove';
        button.onclick = function() {
            removeTodo(i);
        };

        const editbutton = document.createElement('button');
        editbutton.textContent = 'Edit';
        editbutton.className = 'edit';
        editbutton.onclick = function() {
            editTodo(i);
        }
        
        todo.appendChild(editbutton)
        todo.appendChild(button);
        list.appendChild(todo);
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
