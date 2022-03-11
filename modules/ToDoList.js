import Task from './tasks.js';
import status from './status.js';

class Todo {
  static tasks = [];

  // Add tasks to the Array, local storage and screen
  static addTask(task) {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    const newtask = new Task(false, task, this.tasks.length + 1);
    this.tasks.push(newtask);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.displaytask(newtask);
  }

  // Remove tasks in 3 steps. 1- remove them from HTML
  static removefromUI() {
    document.querySelectorAll('.completed').forEach((listItem) => listItem.remove());

    this.tasks.slice(0).forEach((task) => this.removeFromList(task));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // 2- remove them from the To do list array
  static removeFromList(task) {
    const num = task.index - 1;

    if (task.completed === true) {
      this.tasks.splice(num, 1);
      this.updateIndexes(num);
    }
  }

  // 3- update indexes every time and object is deleted
  static updateIndexes(index) {
    for (let i = index; i < this.tasks.length; i += 1) {
      this.tasks[i].index -= 1;
    }
  }

  // append a template with incoming data to the HTML
  static displaytask(task) {
    const container = document.getElementById('list');
    const row = document.createElement('li');
    const checkbox = document.createElement('input');
    const taskHtml = document.createElement('div');

    row.classList.add('item');
    checkbox.name = 'completed';
    checkbox.type = 'checkbox';
    checkbox.classList.add('completed_check');
    checkbox.addEventListener('click', (e) => {
      status.classUpdate(e);

      // get object index
      const actualindex = (this.tasks.find((task) => task.task === e.target.parentElement.querySelector('.task').innerText).index - 1);

      this.tasks[actualindex].completed = status.updateItem(e, this.tasks[actualindex]);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    });
    taskHtml.classList.add('task');
    taskHtml.innerHTML = ` <div>${task.task}</div>`;
    taskHtml.addEventListener('dblclick', (e) => {
      this.editTask(e);
    });
    if (task.completed === true) {
      checkbox.checked = true;
      row.classList.toggle('completed');
    }

    row.appendChild(checkbox);
    row.appendChild(taskHtml);
    container.appendChild(row);
  }

  // Edit task
  static editTask(e) {
    const oldTask = e.target.innerHTML;
    const newinput = document.createElement('input');
    newinput.type = 'text';
    newinput.value = oldTask;
    newinput.classList.add('edit');
    newinput.addEventListener('keypress', (e) => {
      this.saveTask(e, oldTask);
    });
    newinput.addEventListener('click', (e) => {
      this.saveTask(e, oldTask);
    });
    e.target.replaceWith(newinput);
    newinput.select();
  }

  static saveTask(e, oldTask) {
    if (e.keyCode === 13 || e.type === 'click') {
      const taskHtml = document.createElement('div');
      taskHtml.addEventListener('dblclick', (e) => {
        this.editTask(e);
      });
      taskHtml.textContent = e.target.value;
      this.tasks.forEach((task) => this.saveChanges(task, oldTask, e.target.value));
      e.target.replaceWith(taskHtml);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  static saveChanges(task, oldTask, actualtask) {
    if (task.task === oldTask) {
      this.tasks[task.index - 1].task = actualtask;
    }
  }

  // First call to the displlay function for the storaged items
  static displayTasks() {
    this.tasks.forEach((task) => this.displaytask(task));
  }

  // Getting tasks from local storage
  static loadDataFromStorage() {
    const data = JSON.parse(localStorage.getItem('tasks'));
    if (data && data !== '') {
      this.tasks = data.map((value) => new Task(value.completed, value.task, value.index));
    }
    this.displayTasks();
  }
}
export default Todo;