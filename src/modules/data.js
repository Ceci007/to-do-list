
// const defaultLists = {
//     'Daily Plans': {		
//     'Wash my car': new Task(			
//         null, 			
//         [{title: 'find something', done: true},		   	 
//         {title: 'something else', done: false},		   	 
//         {title: 'find something', done: false}],
//         3,		   	
//         new Date(Date.now() + 24 * 3600 * 1000),
//         false),		
//     'Something else':  new Task(
//         'blblblblbl',
//         [{title: 'find something', done: true},		   	 
//         {title: 'something else', done: false},		   	 
//         {title: 'find something', done: false}],
//         1,		   	
//         new Date(Date.now() + 24 * 3600 * 1000), 
//         true)},
    
//         }

const projects = {		
    'Wash my car': new Task(
        "description",
        "title",
        3,		   	
        new Date(Date.now() + 24 * 3600 * 1000),
        false)
    }

class Project {
    constructor (name) {
        this.name = name;
    }



}


const userListsPrototype = {
    addNewList: function(titleList) {		
        this[titleList] = {};	},	
        isListUnique: function(titleList) {		
            if(this[titleList] == null) {			
                return true;		}
                else {			
                return false;		}	},}