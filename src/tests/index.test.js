import * as init from '../modules/render_save';

describe('Testing save function', () => {
  it('Testing if the Object returned is an Array', () => {
    init.save();
    expect(init.lists).toEqual([]);
  });
});