import { saveAndRender, lists, selectedListId } from './render_save'; // eslint-disable-line 

const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');


function List(name, id, tasks) {
  this.id = id;
  this.name = name;
  this.tasks = tasks;
}

const listListener = (listsContainer) => {
listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});
}

const deleteListener = (deleteListButton) => {
deleteListButton.addEventListener('click', () => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});
}

newListForm.addEventListener('submit', e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === '') return;
  const list = new List(listName, Date.now().toString(), []);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

deleteListener(deleteListButton)
listListener(listsContainer)
/* eslint-disable import/prefer-default-export */

export {
  listsContainer
}
