'use strict';

const task=document.getElementById('task');
const submit=document.getElementById('submit');
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
    var tbody = document.getElementById('list');
    list.innerHTML = '';
    if(todos !== 'undefined') {
        for (let i = 0; i < todos.length; i++){
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = i;
            tbody.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = todos[i].todo;
            tbody.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = '<button>作業中</button>';
            tbody.appendChild(td);
            var td = document.createElement('td');
            td.innerHTML = '<button>削除</button>';
            tbody.appendChild(td);
            tbody.appendChild(tr);
        }
    }
}

submit.addEventListener('click', () => {
    addTodo();
    outputResult();
});