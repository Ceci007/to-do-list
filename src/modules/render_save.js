import { tasksContainer } from './task_logic'; // eslint-disable-line 
import { listsContainer } from './list_logic'; // eslint-disable-line 

const taskTemplate = document.getElementById('task-template');
const listCountElement = document.querySelector('[data-list-count]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; // eslint-disable-line 
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY); // eslint-disable-line 

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderTasks = selectedList => {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    const dueDateText = document.createElement('span');
    dueDateText.classList.add('small-text');

    dueDateText.innerText = task.dueDate;
    if (task.priority === '1') {
      label.classList.add('priority-1');
    } else if (task.priority === '2') {
      label.classList.add('priority-2');
    } else if (task.priority === '3') {
      label.classList.add('priority-3');
    }

    label.htmlFor = task.id;
    label.append(task.name);
    label.appendChild(dueDateText);
    tasksContainer.appendChild(taskElement);
  });
};

const renderTaskCount = selectedList => {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
};

const renderLists = () => {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listsContainer.appendChild(listElement);
  });
};

const render = () => {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find(list => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
};

const saveAndRender = () => {
  save();
  render();
};

export {
  saveAndRender,
  save,
  render,
  renderTaskCount,
  renderLists,
  renderTasks,
  lists,
  selectedListId,
};