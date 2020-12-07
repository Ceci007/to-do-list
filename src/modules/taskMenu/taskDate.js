mport {events} from './../pubSub.js';
import {userLists} from './../DATA-JSON.js';
import {checkUserInput, showInputWarning} from './../addListMenu/addListMenuModule.js';

const dateHandler = function(args) {
	let [listTitle, taskTitle] = args;

	//cache DOM
	const saveButton = document.querySelector('.set-due-form__confirm-btns .d-button_action_save');
	const removeButton = document.querySelector('.set-due-form__confirm-btns .d-button_action_remove');

	const saveDate = function(event) {
		const userInput = document.querySelector('.set-due-form__due-input');
		if(checkUserInput(userInput)) {
			const dueDate = new Date(userInput.value);
			userLists.setDueDate(listTitle, taskTitle, dueDate);
			events.emit('dueDateUpdated', [userLists ,userLists[listTitle][taskTitle], listTitle, taskTitle]);
		}else {
			showInputWarning(userInput, 'set-due-form__due-input_content_empty');
		}
	};

	const removeDate = function() {
		const userInput = document.querySelector('.set-due-form__due-input');
		const dueDate = null;
		userLists.setDueDate(listTitle, taskTitle, dueDate);
		events.emit('dueDateUpdated', [userLists ,userLists[listTitle][taskTitle], listTitle, taskTitle]);
	};

	saveButton.addEventListener('click', saveDate);
	removeButton.addEventListener('click', removeDate);
};

events.on('taskMenuBuilded', dateHandler);