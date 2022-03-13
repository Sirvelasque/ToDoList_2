/**
 * @jest-environment jsdom
 */
import update from './ToDoList.js';
import Task from './tasks.js';
import { isSymbol } from 'lodash';
import status from './status.js';

describe('TodoList Test add and remove', () => {

  document.body.innerHTML = '<section class="main">'
  + '  <div id="list_container">'
  + '    <ul id="list">'
  + '<li class="item"><input name="completed" type="checkbox" class="completed_check"><div class="task"> <div>homework</div></div></li>'
  + '    </ul>'
  + '  </div>'
  + '</section>';

  it('Add Task', () => {
    update.addTask('homework');
    update.addTask('eat');
    update.addTask('dishes');
    const data = JSON.parse(localStorage.getItem('tasks'));
    const tempData = data.map((value) => new Task(value.completed, value.task, value.index));
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(4);
    expect(tempData.length).toBe(update.tasks.length);
    tempData.forEach((task, index) => {
      expect(task.task).toBe(update.tasks[index].task);
      expect(task.completed).toBe(update.tasks[index].completed);
      expect(task.index).toBe(update.tasks[index].index);
    });
  });

  it('Remove Task', () => {
    update.addTask('run');
    expect(update.tasks[0].task).toBe('homework');
    update.tasks[0].completed = true;
    update.removeFromList(update.tasks[0]);
    localStorage.setItem('tasks', JSON.stringify(update.tasks));
    expect(update.tasks.length).toBe(3);
    const data = JSON.parse(localStorage.getItem('tasks'));
    const tempData = data.map((value) => new Task(value.completed, value.task, value.index));
    expect(tempData.length).toBe(update.tasks.length);
});

});

describe("Todo list test, change and clear completed tasks", () => {

  it('Change second task', () => {
    const newTask = "spin";
    const oldTask = update.tasks[1].task;

    update.tasks.forEach((task) => {
      update.saveChanges(task, oldTask, newTask);
    })

    expect(update.tasks[1].task).toBe('spin');
  });

  it('Change third task', () => {
    const newTask = "laundry";
    const oldTask = update.tasks[2].task;

    update.tasks.forEach((task) => {
      update.saveChanges(task, oldTask, newTask);
    })

    expect(update.tasks[2].task).toBe('laundry');
  });

  it('Completed status', () => {
    const task = update.tasks[0];
    task.completed = status.istrue();
    expect(task.completed).toBe(true);

  })
});
