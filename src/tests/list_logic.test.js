describe('Testing list constructor function', () => {
  const list = {
    id: 1,
    name: 'christmas shopping',
    tasks: [
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
    ],
  };

  it('Testing if the list object id is set to an integer', () => {
    expect(list.id).toBe(1);
  });

  it('Testing if the list object name is set to a string', () => {
    expect(list.name).toBe('christmas shopping');
  });

  it('Testing if the list object tasks is an array of objects', () => {
    expect(list.tasks).toEqual([
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
    ]);
  });
});