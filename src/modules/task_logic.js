import { save, saveAndRender, renderTaskCount, lists, selectedListId } from './render_save'

const tasksContainer = document.querySelector('[data-tasks]');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find(list => list.id === selectedListId)
      const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
      selectedTask.complete = e.target.checked
      save()
      renderTaskCount(selectedList)
    }
  })
  
  clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
  })
  
  newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
  })
  
  function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
  }

export {tasksContainer}


