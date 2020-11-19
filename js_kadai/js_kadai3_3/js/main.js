'use strict';

const task = document.getElementById('task');
const submit = document.getElementById('submit');
const list = document.getElementById('list');
const status = document.getElementsByName('status');
const todos = [];

const addTodo = () => {
    let item = {
        todo: task.value,
        isDone: false,
    }
    todos.push(item);
    task.value = ''; 
};

const processingResult = () => {
    list.innerHTML = '';
    if (todos) {
        for (let i = 0; i < todos.length; i++) {
            if (status[0].checked) {
                displayTodos(i);
            } else if (status[1].checked) {
                if (!todos[i].isDone){
                    displayTodos(i);
                }
            } else {
                if (todos[i].isDone){
                    displayTodos(i);
                }
            }
        }
    }
}

const makeButton = (newRow, newCell, newText, index) => {
    newCell = newRow.insertCell();
    newText = document.createElement('button');
    !todos[index].isDone ? newText.innerText = '作業中' : newText.innerText = '完了';
    newCell.appendChild(newText);

    newText.addEventListener('click', () => changeStatus(index));

    newCell = newRow.insertCell();
    newText = document.createElement('button');
    newText.innerText = '削除';
    newCell.appendChild(newText);

    newText.addEventListener('click', () => removeTodo(newText, index));
}

const displayTodos = (index) => {
    const newRow = list.insertRow();
    let newCell = newRow.insertCell();
    let newText = document.createTextNode(index);
    newCell.appendChild(newText);

    newCell = newRow.insertCell();
    newText = document.createTextNode(todos[index].todo);
    newCell.appendChild(newText);

    makeButton(newRow, newCell, newText, index);
}

const changeStatus = (index) => {
    todos[index].isDone = !todos[index].isDone;
    processingResult();
};

const removeTodo = (newText, index) => {
    const targetTask = newText.closest('tr');
    list.removeChild(targetTask);
    todos.splice(index, 1);
    processingResult();
};

submit.addEventListener('click', () => {
    addTodo();
    processingResult();
});

status.forEach(function(e) {
    e.addEventListener('click', function() {           
        processingResult();
    });
});