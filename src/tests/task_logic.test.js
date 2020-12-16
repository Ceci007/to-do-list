describe('Testing tasks constructor function', () => {
  const tasks = [
    {
      id: 1,
      name: 'shopping1',
      complete: true,
      priority: '2',
      dueDate: '2020-12-24',
    },
    {
      id: 2,
      name: 'shopping2',
      complete: false,
      priority: '1',
      dueDate: '2020-12-25',
    },
  ];

  it('Testing if the first task object id is set to 1', () => {
    expect(tasks[0].id).toBe(1);
  });

  it('Testing if the first task name is set to a string', () => {
    expect(tasks[0].name).toBe('shopping1');
  });

  it('Testing if the first task complete key is set to true', () => {
    expect(tasks[0].complete).toBe(true);
  });

  it('Testing if the first task complete key is set to false', () => {
    expect(tasks[1].complete).toBe(false);
  });

  it('Testing if the first task priority is set to a value between 1 and 3', () => {
    expect(tasks[0].priority).toBe('2');
  });

  it('Testing if the first task due-date is set to 2020-12-24', () => {
    expect(tasks[0].dueDate).toBe('2020-12-24');
  });

  it('Testing the tasks length', () => {
    expect(tasks.length).toBe(2);
  });
});