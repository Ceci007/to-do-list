import {events} from './../pubSub.js';
import moment from 'moment';
//cache DOM
const body = document.querySelector('.body');
const buildChecklist = function(checklistArr) {
	/*const checklistUl = document.createElement('ul');
	ul.classList.add('checklist__task-parts-list');*/
	const liElemsContainer = document.createElement('ul');
	if(checklistArr != null) {
		checklistArr.forEach((elem) => {
			const li = document.createElement('li');
			li.classList.add('checklist__task-parts-item');
			if(!!elem.done) {
				li.classList.add('checklist__task-parts-item_state_done');
			}
			li.innerHTML = `
			  <div class="checklist__checklist-done-item">
		        <svg class="checklist__done-icon">
		          <use xlink:href="#checklist_done"></use>
		        </svg>
		      </div>
		      
		      <h2 class="checklist__h2">${elem.title}</h2>
		      
		      <svg class="checklist__delete-icon">
		        <use xlink:href="#close_x"></use>
		      </svg>
			`;
			liElemsContainer.append(li);
	});
	}
	return `<ul class="checklist__task-parts-list">
		${liElemsContainer.innerHTML}</ul>`;
};

const setPriorityUI = function(priority) {
	if(priority != null) {
		document.querySelector(`.priority__list-colors-item_bg-color_${priority}`).
			classList.add('priority__list-colors-item_state_selected');
	}
};

const buildTaskMenu = function(argArr) {
	const oldMenu = document.querySelector('.task-properties');
	let scrollTop;
	if(!!oldMenu) {
		scrollTop = oldMenu.querySelector('.task-properties__container').scrollTop;
		oldMenu.remove();
	}
	let [,task, listTitle, taskTitle] = argArr;
	const taskProperties = document.createElement('section');
	taskProperties.classList.add('task-properties');

	taskProperties.innerHTML = `
	<div class="task-properties__container">
	   <div class="close-menu">
		    <svg class="close-menu__icon">
		      <use xlink:href="#close_x"></use>
		    </svg>
	  	</div>
	  <div class="task-title">
	    <div class="title title_margin_top">
	      <svg class="title__icon">
	        <use xlink:href="#task_name"></use>
	      </svg>
	      <h1 class="title__h1">${task.title}</h1>
	      <input type="text" class="title__title-edit-input title__title-edit-input_display_none">
	    </div>
	  </div>
	  <div class="task-description task-properties__task-description">
	    
	    <div class="title">
	      <svg class="title__icon">
	        <use xlink:href="#subject_description"></use>
	      </svg>
	      <h1 class="title__h1">Description</h1>
	    </div>
	    ${task.description == null ? 
	    `<div class="task-description__textarea-container">
	      <textarea class="task-description__textarea" placeholder="Add description..."></textarea>
	      <button class="d-button d-button_action_save">Save</button>
	    </div>
	    <p class="task-description__text task-description__text_display_none">${task.description}</p>` :
	    `<div class="task-description__textarea-container task-description__textarea-container_display_none">
	      <textarea class="task-description__textarea" placeholder="Add description..."></textarea>
	      <button class="d-button d-button_action_save">Save</button>
	    </div>
	    <p class="task-description__text">${task.description}</p>`
		}
	  </div>
	  <div class="checklist task-properties__checklist">
	    <div class="title">
	      <svg class="title__icon">
	        <use xlink:href="#done_all"></use>
	      </svg>
	      <h1 class="title__h1">Checklist</h1>
	    </div> 
	  
	  ${buildChecklist(task.checklist)}
	    <div class="add-checklist-item checklist__add-checklist-item">
		  <input class="add-checklist-item__user-input add-checklist-item__user-input_display_none" type="text" placeholder="Add item"/>
		  <div class="add-checklist-item__add-close-toggle">
		    <button class="task-properties-button add-checklist-item__task-properties-button" type="button">Add an item</button>
		    <svg class="add-checklist-item__delete-icon add-checklist-item__delete-icon_display_none">
		      <use xlink:href="#close_x"></use>
		    </svg>
		  </div>
  		</div>
	</div>
	  <div class="priority task-properties__priority">
	    
	    <div class="title">
	        <svg class="title__icon">
	          <use xlink:href="#edit"></use>
	        </svg>
	        <h1 class="title__h1">Priority</h1>
	      </div>
	      <ul class="priority__list-colors">
	        <li class="priority__list-colors-item priority__list-colors-item_bg-color_1" data-priority="1">
	          <svg class="priority__choose-color-icon">
	            <use xlink:href="#checklist_done"></use>
	          </svg>
	        </li>
	        <li class="priority__list-colors-item priority__list-colors-item_bg-color_2" data-priority="2">
	          <svg class="priority__choose-color-icon">
	            <use xlink:href="#checklist_done"></use>
	          </svg>
	        </li>
	        <li class="priority__list-colors-item priority__list-colors-item_bg-color_3" data-priority="3">
	          <svg class="priority__choose-color-icon">
	            <use xlink:href="#checklist_done"></use>
	          </svg>
	        </li>
	        <li class="priority__list-colors-item priority__list-colors-item_bg-color_4" data-priority="4">
	          <svg class="priority__choose-color-icon">
	            <use xlink:href="#checklist_done"></use>
	          </svg>
	        </li>
	        <li class="priority__list-colors-item priority__list-colors-item_bg-color_5" data-priority="5">
	          <svg class="priority__choose-color-icon">
	            <use xlink:href="#checklist_done"></use>
	          </svg>
	        </li>
	      </ul>
	    
	  </div>
	  <div class="due-date task-properties__due-date">
	    <div class="title">
	      <svg class="title__icon">
	        <use xlink:href="#calendar"></use>
	      </svg>
	      <h1 class="title__h1">Set a due-date</h1>
	    </div>
	    <p class="due-date__user-date">
	      ${task.dueDate == null ? 
	      	'dd:mm:year hours:minutes': 
	      	moment(task.dueDate).format("dddd, MMMM Do YYYY, hh:mm")}
	    </p>
	    <form class="set-due-form due-date__set-due-form onsubmit="return false">
	      <label class="set-due-form__set-time-label">
	        Time<br>
	        <input type="datetime-local" class="set-due-form__due-input">
	      </label>
	      <div class="set-due-form__confirm-btns">
	        <button class="d-button d-button_action_save" type="button">Save</button>
	        <button class="d-button d-button_action_remove" type="button">Remove</button>
	      </div>
	    </form>
	    <button class="task-properties-button due-date__task-properties-button due-date__task-properties-button_display_none">Set a date</button>
	  </div>
	</div>
	`;
	body.append(taskProperties);
	setPriorityUI(task.priority);
	events.emit('taskMenuBuilded', [listTitle, taskTitle]);
	taskProperties.querySelector('.task-properties__container').scrollTop = scrollTop;
};

events.on('changeTaskTitle', buildTaskMenu);
events.on('userOpenTaskMenu', buildTaskMenu);
events.on('checklistItemRemoved', buildTaskMenu);
events.on('newChecklistItem', buildTaskMenu);
events.on('dueDateUpdated', buildTaskMenu);

/*TASK MENU
  <section class="task-properties">
    <div class="task-properties__container">
      
      <div class="close-menu">
        <svg class="close-menu__icon">
          <use xlink:href="#close_x"></use>
        </svg>
      </div>
      <div class="task-title">
        <div class="title">
          <svg class="title__icon">
            <use xlink:href="#task_name"></use>
          </svg>
          <h1 class="title__h1">Prepare a dish</h1>
          <input type="text" class="title__title-edit-input title__title-edit-input_display_none">
        </div>
      </div>
      <div class="task-description task-properties__task-description">
        
        <div class="title">
          <svg class="title__icon">
            <use xlink:href="#subject_description"></use>
          </svg>
          <h1 class="title__h1">Description</h1>
        </div> 
        <div class="task-description__textarea-container">
          <textarea class="task-description__textarea" placeholder="Add description..."></textarea>
        </div>
      </div>
      <div class="checklist task-properties__checklist">
        <div class="title">
          <svg class="title__icon">
            <use xlink:href="#done_all"></use>
          </svg>
          <h1 class="title__h1">Checklist</h1>
        </div> 
      
      
      <ul class="checklist__task-parts-list">
        <li class="checklist__task-parts-item checklist__task-parts-item_state_done">
          <div class="checklist__checklist-done-item">
            <svg class="checklist__done-icon">
              <use xlink:href="#checklist_done"></use>
            </svg>
          </div>
          
          <h2 class="checklist__h2">Find some stuff</h2>
          
          <svg class="checklist__delete-icon">
            <use xlink:href="#close_x"></use>
          </svg>
        </li>
        <li class="checklist__task-parts-item">
          
         <div class="checklist__checklist-done-item">
            <svg class="checklist__done-icon">
              <use xlink:href="#checklist_done"></use>
            </svg>
          </div>
          
          <h2 class="checklist__h2">Something else</h2>
          
          <svg class="checklist__delete-icon">
            <use xlink:href="#close_x"></use>
          </svg>
        </li>
        <li class="checklist__task-parts-item">
          
          <div class="checklist__checklist-done-item">
            <svg class="checklist__done-icon">
              <use xlink:href="#checklist_done"></use>
            </svg>
          </div>
          
          <h2 class="checklist__h2">Something else</h2>
          
          <svg class="checklist__delete-icon">
            <use xlink:href="#close_x"></use>
          </svg> 
        </li>
      </ul>
      <button class="task-properties-button checklist__task-properties-button" type="button">Add an item</button>
    </div>
      <div class="priority task-properties__priority">
        
        <div class="title">
            <svg class="title__icon">
              <use xlink:href="#edit"></use>
            </svg>
            <h1 class="title__h1">Priority</h1>
          </div>
          <ul class="priority__list-colors">
            <li class="priority__list-colors-item priority__list-colors-item_bg-color_1 priority__list-colors-item_state_selected">
              <svg class="priority__choose-color-icon">
                <use xlink:href="#checklist_done"></use>
              </svg>
            </li>
            <li class="priority__list-colors-item priority__list-colors-item_bg-color_2">
              <svg class="priority__choose-color-icon">
                <use xlink:href="#checklist_done"></use>
              </svg>
            </li>
            <li class="priority__list-colors-item priority__list-colors-item_bg-color_3">
              <svg class="priority__choose-color-icon">
                <use xlink:href="#checklist_done"></use>
              </svg>
            </li>
            <li class="priority__list-colors-item priority__list-colors-item_bg-color_4">
              <svg class="priority__choose-color-icon">
                <use xlink:href="#checklist_done"></use>
              </svg>
            </li>
            <li class="priority__list-colors-item priority__list-colors-item_bg-color_5">
              <svg class="priority__choose-color-icon">
                <use xlink:href="#checklist_done"></use>
              </svg>
            </li>
          </ul>
        
      </div>
      <div class="due-date task-properties__due-date">
        <div class="title">
          <svg class="title__icon">
            <use xlink:href="#calendar"></use>
          </svg>
          <h1 class="title__h1">Set a due-date</h1>
        </div>
        <p class="due-date__user-date">
          dd:mm:year hours:minutes
        </p>
        <form class="set-due-form due-date__set-due-form">
          <label class="set-due-form__set-time-label">
            Time<br>
            <input type="datetime-local" class="set-due-form__due-input">
          </label>
          <div class="set-due-form__confirm-btns">
            <button class="set-due-form__d-button set-due-form__d-button_action_save">Save</button>
            <button class="set-due-form__d-button set-due-form__d-button_action_remove">Remove</button>
          </div>
        </form>
        <button class="task-properties-button due-date__task-properties-button due-date__task-properties-button_display_none">Set a date</button>
      </div>
    </div>
  </section>
-->*/