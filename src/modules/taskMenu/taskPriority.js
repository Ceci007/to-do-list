import {events} from './../pubSub.js';
import {checkUserInput} from './../addListMenu/addListMenuModule.js';
import {userLists} from './../DATA-JSON.js';

const descriptionHandler = function(args) {
	let [listTitle, taskTitle] = args;
	//cache DOM
	const textAreaContainer = document.querySelector('.task-description__textarea-container');
	const saveButton = textAreaContainer.querySelector('.task-description__textarea-container .d-button');
	const textArea = document.querySelector('.task-description__textarea');
	const paragraph = document.querySelector('.task-description__text');
	saveButton.addEventListener('click', function(event) {
		if(!checkUserInput(textArea)) {
			userLists.setTaskDescription(listTitle, taskTitle, null);
		}else {
			const description = textArea.value;
			userLists.setTaskDescription(listTitle, taskTitle, description);
			textAreaContainer.classList.toggle('task-description__textarea-container_display_none');
			paragraph.classList.toggle('task-description__text_display_none');
			paragraph.textContent = description;
		}
		events.emit('taskDescriptionUpdate', [userLists]);
	});
	paragraph.addEventListener('click', function(event) {
		textArea.value = paragraph.textContent;
		textAreaContainer.classList.toggle('task-description__textarea-container_display_none');
		paragraph.classList.toggle('task-description__text_display_none');
	});
};

events.on('taskMenuBuilded', descriptionHandler);