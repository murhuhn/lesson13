'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const headerButton = document.querySelector('.header-button');

let todoData = [];

const render = function () {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';

  todoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + '	<div class="todo-buttons"><button class="todo-remove"></button><button class="todo-complete"></button></div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
        todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function () {
        item.completed = !item.completed;
        localStorage.setItem('todoData', JSON.stringify(todoData));
        render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function(){
      todoData.splice(index, 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });
  });
};

if (localStorage.getItem('todoData')) {
  todoData = JSON.parse(localStorage.getItem('todoData'));
  render();
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false
  };

  if (headerInput.value.trim() === '') {
    alert('Укажите название задачи');
    render();
  } else {
      todoData.push(newToDo);
      headerInput.value = '';
      render();
      localStorage.setItem('todoData', JSON.stringify(todoData));
  }


});