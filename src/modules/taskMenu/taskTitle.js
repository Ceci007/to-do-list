import {events} from './../pubSub.js';
import {userLists} from './../DATA-JSON.js';
import {checkUserInput} from './../addListMenu/addListMenuModule.js';
const titleHandler = function(args) {
	const title = document.querySelector('.task-title');
	let [listTitle, taskTitle] = args;

	const handleTitleInput = function(event) {
		if(event.code !== 'Enter') return;
		const input = event.target;
		if(checkUserInput(input) && 
			userLists.isTaskUnique(listTitle, input.value.trim())) {
			let newTaskTitle = input.value.trim();
			userLists.changeTaskTitle(listTitle, taskTitle, newTaskTitle);
			taskTitle = newTaskTitle;
			events.emit('changeTaskTitle', [userLists ,userLists[listTitle][newTaskTitle], listTitle, taskTitle]);
		}else {
			input.blur();
		}
	};

	const hideListTitleInput = function() {
		this.removeEventListener('keydown', handleTitleInput);
		this.classList.toggle('title__title-edit-input_display_none');
	};

	const showUserInput = function(userInput) {
		userInput.classList.toggle('title__title-edit-input_display_none');
		userInput.value = taskTitle;
		userInput.focus();
		userInput.addEventListener('keydown', handleTitleInput);
		userInput.onblur = hideListTitleInput;
	};

	title.addEventListener('click', function() {
		const userInput = title.querySelector('.title__title-edit-input');
		
		showUserInput(userInput);
	});
};

events.on('taskMenuBuilded', titleHandler);