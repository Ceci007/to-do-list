import {events} from './../pubSub.js';
import {userLists} from './../DATA-JSON.js';
import {checkUserInput, showInputWarning} from './../addListMenu/addListMenuModule.js';

const checklistHandler = function(args) {
	let [listTitle, taskTitle] = args;

	//cache DOM
	const checklist = document.querySelector('.checklist__task-parts-list');
	const addItemButton = document.querySelector('.add-checklist-item__task-properties-button');
	const closeAddMenuSVG = document.querySelector('.add-checklist-item__delete-icon');
	const userInput = document.querySelector('.add-checklist-item__user-input');
	checklist.addEventListener('click', function(event) {
		if(!event.target) return;

		const target = event.target;
		//toggle done checklistItem
		if(!!target.closest('.checklist__checklist-done-item')) {
			const li = target.closest('.checklist__task-parts-item');
			li.classList.toggle('checklist__task-parts-item_state_done');
			const checklistItemTitle = li.querySelector('.checklist__h2').textContent.trim();
			userLists.toggleDoneChecklistItem(listTitle, taskTitle, checklistItemTitle);
			events.emit('toggleDoneChecklistItem', [userLists]);
		}
		//remove checklistItem
		if(!!target.closest('.checklist__delete-icon')) {
			const li = target.closest('.checklist__task-parts-item');
			const checklistItemTitle = li.querySelector('.checklist__h2').textContent.trim();
			userLists.deleteChecklistItem(listTitle, taskTitle, checklistItemTitle);
			events.emit('checklistItemRemoved', [userLists ,userLists[listTitle][taskTitle], listTitle, taskTitle]);
		}
	});
	const addChecklistItem = function(event) {
		if(!event.target.closest('.task-properties-button') &&
			event.code !== 'Enter') return;
		const checklistItemTitle = userInput.value.trim();
		if(checkUserInput(userInput) && 
			userLists.isChecklistItemUnique(listTitle,taskTitle,checklistItemTitle)) {
			userLists.addChecklistItem(listTitle,taskTitle,checklistItemTitle);
			events.emit('newChecklistItem', [userLists, userLists[listTitle][taskTitle], listTitle, taskTitle]);
		}else {
			userInput.blur();
			showInputWarning(userInput, 'add-checklist-item__user-input_content_empty');
		}
	};
	const showAddMenu = function(event) {
		addItemButton.removeEventListener('click', showAddMenu);
		userInput.classList.toggle('add-checklist-item__user-input_display_none');
		userInput.focus();
		closeAddMenuSVG.classList.toggle('add-checklist-item__delete-icon_display_none');
		addItemButton.addEventListener('click', addChecklistItem);
		userInput.addEventListener('keydown', addChecklistItem);
	};
	const hideAddMenu = function() {
		addItemButton.removeEventListener('click', addChecklistItem);
		userInput.removeEventListener('keydown', addChecklistItem);
		userInput.classList.toggle('add-checklist-item__user-input_display_none');
		closeAddMenuSVG.classList.toggle('add-checklist-item__delete-icon_display_none');
		addItemButton.addEventListener('click', showAddMenu);
	};
	addItemButton.addEventListener('click', showAddMenu);
	closeAddMenuSVG.addEventListener('click', hideAddMenu);
};

events.on('taskMenuBuilded', checklistHandler);