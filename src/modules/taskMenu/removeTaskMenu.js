import {events} from './../pubSub.js';

function closeMenu() {
	const closeIcon = document.querySelector('.close-menu__icon');
	closeIcon.addEventListener('click', function() {
		document.querySelector('.task-properties').remove();
	});
}

events.on('taskMenuBuilded', closeMenu);