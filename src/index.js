import './style.css';
import update from '../modules/ToDoList.js';

const deleteBtn = document.querySelector('#delete');
const input = document.querySelector('#newTask');

update.loadDataFromStorage();

input.addEventListener('keypress', (e) => {
  const task = input.value;
  if (e.key === 'Enter') {
    update.addTask(task);
    input.value = '';
  }
});

deleteBtn.addEventListener('click', () => {
  update.removefromUI();
});
