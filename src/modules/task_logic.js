import { save, saveAndRender, renderTaskCount, lists, selectedListId } from './render_save'; // eslint-disable-line 

const tasksContainer = document.querySelector('[data-tasks]');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newPriorityInput = document.querySelector('[data-new-priority-input]');
const newDueDateInput = document.querySelector('[data-new-dueDate]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');

function Task(name, id, complete, priority, dueDate) {
  this.id = id;
  this.name = name;
  this.complete = complete;
  this.priority = priority;
  this.dueDate = dueDate;
}

const tasksContainerListener = (tasksContainer) => {
  tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find(list => list.id === selectedListId);
      const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
      selectedTask.complete = e.target.checked;
      save();
      renderTaskCount(selectedList);
    }
  });
};

const clearCompleteTasksButtonListener = (clearCompleteTasksButton) => {
  clearCompleteTasksButton.addEventListener('click', () => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
  });
};

const newTaskFormListener = (newTaskForm) => {
  newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    const taskPriority = newPriorityInput.value;
    const taskDueDate = newDueDateInput.value;
    if (taskName == null || taskName === '') return;
    const task = new Task(taskName, Date.now().toString(), false, taskPriority, taskDueDate);
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);

    saveAndRender();
  });
};

tasksContainerListener(tasksContainer);
clearCompleteTasksButtonListener(clearCompleteTasksButton);
newTaskFormListener(newTaskForm);
/* eslint-disable import/prefer-default-export */
export {
  tasksContainer,
};
