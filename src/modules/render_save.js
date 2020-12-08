import {tasksContainer} from './task_logic';
import {listsContainer} from './list_logic';

const taskTemplate = document.getElementById('task-template');
const listCountElement = document.querySelector('[data-list-count]')
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)


const saveAndRender = () => {
    save()
    render()
  }
  
  function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
  }

  const renderLists = () => {
    lists.forEach(list => {
      const listElement = document.createElement('li')
      listElement.dataset.listId = list.id
      listElement.classList.add("list-name")
      listElement.innerText = list.name
      if (list.id === selectedListId) {
        listElement.classList.add('active-list')
      }
      listsContainer.appendChild(listElement)
    })
  }

  const renderTasks = selectedList => {
    selectedList.tasks.forEach(task => {
      const taskElement = document.importNode(taskTemplate.content, true)
      const checkbox = taskElement.querySelector('input')
      checkbox.id = task.id
      checkbox.checked = task.complete
      const label = taskElement.querySelector('label')
      label.htmlFor = task.id
      label.append(task.name)
      tasksContainer.appendChild(taskElement)
    })
  }
  
  const renderTaskCount = selectedList => {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
  }

  const render = () => {
    clearElement(listsContainer);
    renderLists();
  
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
      listDisplayContainer.style.display = 'none'
    } else {
      listDisplayContainer.style.display = ''
      listTitleElement.innerText = selectedList.name
      renderTaskCount(selectedList)
      clearElement(tasksContainer)
      renderTasks(selectedList)
    }
  }
  
  const clearElement = element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }

  export {
    saveAndRender, 
    save, 
    render,
    renderTaskCount, 
    renderLists, 
    renderTasks, 
    lists, 
    selectedListId}