/**
 * @jest-environment jsdom
 */
import update from './ToDoList.js';
import Task from './tasks.js';

describe('TodoList Test', () => {


  document.body.innerHTML = '<section class="main">'
  + '  <div id="list_container">'
  + '  <ul id="list">'
  + '  </ul>'
  + '   </div>'
  + '</section>';


  // update.loadDataFromStorage();

  it('Add Task', () => {
    update.addTask('homework');
    update.addTask('eat');
    update.addTask('dishes');
    const data = JSON.parse(localStorage.getItem('tasks'));
    const tempData = data.map((value) => new Task(value.completed, value.task, value.index));
    const list = document.querySelectorAll('.item');
    expect(list).toHaveLength(3);
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

})