'use strict';

const task = document.getElementById('task');
const submit = document.getElementById('submit');
const list = document.getElementById('list');
let todos = [];

const addTodo = () => {
    let item = {
        todo: task.value,
        isDone: false,
    }
    todos.push(item);
    task.value = ''; 
};

const outputResult = () => {
    list.innerHTML = '';
    if (todos !== 'undefined') {
        for (let i = 0; i < todos.length; i++) {

            let newRow = list.insertRow();

            let newCell = newRow.insertCell();
            let newText = document.createTextNode(i);
            newCell.appendChild(newText);

            newCell = newRow.insertCell();
            newText = document.createTextNode(todos[i].todo);
            newCell.appendChild(newText);

            newCell = newRow.insertCell();
            newText = document.createElement('button');
            newText.innerText = '作業中';
            newCell.appendChild(newText);

            newCell = newRow.insertCell();
            newText = document.createElement('button');
            newText.innerText = '削除';
            newCell.appendChild(newText);

            newText.addEventListener('click', () => removeTodo(newText, i));
        }
    }
}

const removeTodo = (newText, i) => {
    const targetTask = newText.closest('tr');
    list.removeChild(targetTask);
    todos.splice(i, 1);
    outputResult();
};

submit.addEventListener('click', () => {
    addTodo();
    outputResult();
});