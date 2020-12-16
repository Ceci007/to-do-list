import * as init from '../modules/render_save';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('Testing save function', () => {
  it('Testing if the Object returned is an Array', () => {
    init.save();
    expect(init.lists).toEqual([]);
  });
});

describe('testing clearElement function', () =>{
  it('Clear all child elements and return false', () => {
    const element = document.createElement('ul');
    const li = document.createElement('li')
    element.appendChild(li);
    init.clearElement(element);
    expect(element.hasChildNodes()).toBe(false)
  });
  it('Check if element has child nodes', () => {
    const element = document.createElement('ul');
    const li = document.createElement('li')
    element.appendChild(li);
    expect(element.hasChildNodes()).toBe(true)
  })
});

describe('testing renderTasks function', ()=> {
  beforeEach(() => JSDOM.fromFile('./dist/index.html')
    .then((dom) => {
      document.body.innerHTML = dom.window.document.body.outerHTML;
    }));
  //   beforeEach(() => {
  //   const taskList = new list.List('chistmas shopping', Date.now().toString(), [{ 
  //     id : Date.now().toString(),
  //     name : 'shopping1',
  //     complete : true,
  //     priority: '2',
  //     dueDate: '2020-12-24'
  //   },
  //   { 
  //     id : Date.now().toString(),
  //     name : 'shopping2',
  //     complete : false,
  //     priority: '1',
  //     dueDate: '2020-12-25'
  //   }
  // ])}
  //   )
  it('checking complete value', () => {
    const taskList = { 
      id : Date.now().toString(), 
      name : 'christmas shopping', 
      tasks : [{ 
      id : Date.now().toString(),
      name : 'shopping1',
      complete : true,
      priority: '2',
      dueDate: '2020-12-24'
    },
    { 
      id : Date.now().toString(),
      name : 'shopping2',
      complete : false,
      priority: '1',
      dueDate: '2020-12-25'
    }
  ]
}

    init.renderTasks(taskList);
    // const h1 = document.querySelector('.title')
    // const taskId = taskList.tasks[0].id
    // const checkbox = document.querySelector(taskId)
    expect(h1).toBe(true)
  })
})