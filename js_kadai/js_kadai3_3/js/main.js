'use strict';

const task = document.getElementById('task');
const submit = document.getElementById('submit');
const list = document.getElementById('list');
const status = document.getElementsByName('status');
let todos = [];

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
    if (todos !== 'undefined') {
        for (let i = 0; i < todos.length; i++) {
            if (status[0].checked) {
                outputResult(i);
            } else if (status[1].checked) {
                if (todos[i].isDone===false){
                    outputResult(i);
                }
            } else {
                if (todos[i].isDone === true){
                    outputResult(i);
                }
            }
        }
    }
}

const outputResult = (i) => {
    let newRow = list.insertRow();
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(i);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createTextNode(todos[i].todo);
        newCell.appendChild(newText);

        newCell = newRow.insertCell();
        newText = document.createElement('button');
        todos[i].isDone === false ? newText.innerText = '作業中' : newText.innerText = '完了';
        newCell.appendChild(newText);

        newText.addEventListener('click', () => changeStatus(i));

        newCell = newRow.insertCell();
        newText = document.createElement('button');
        newText.innerText = '削除';
        newCell.appendChild(newText);

        newText.addEventListener('click', () => removeTodo(newText, i));
}

const changeStatus = (i) => {
    todos[i].isDone = !todos[i].isDone;
    processingResult();
};

const removeTodo = (newText, i) => {
    const targetTask = newText.closest('tr');
    list.removeChild(targetTask);
    todos.splice(i, 1);
    processingResult();
};

submit.addEventListener('click', () => {
    addTodo();
    processingResult();
});

status.forEach(function(e) {
    e.addEventListener("click", function() {           
        processingResult();
    });
});