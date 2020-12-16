import * as init from '../modules/render_save';

describe('Testing save function', () => {
  it('Testing if the Object returned is an Array', () => {
    init.save();
    expect(init.lists).toEqual([]);
  });
});

describe('testing clearElement function', () => {
  it('Clear all child elements and return false', () => {
    const element = document.createElement('ul');
    const li = document.createElement('li');
    element.appendChild(li);
    init.clearElement(element);
    expect(element.hasChildNodes()).toBe(false);
  });
  it('Check if element has child nodes', () => {
    const element = document.createElement('ul');
    const li = document.createElement('li');
    element.appendChild(li);
    expect(element.hasChildNodes()).toBe(true);
  });
});
