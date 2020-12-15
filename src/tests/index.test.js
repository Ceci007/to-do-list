import { sum } from "../modules/render_save.js";
jest.mock("../modules/task_logic.js")
// jest.mock("../modules/list_logic.js")
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('MODULE BUTTONS CONTAINER TASK', () => {
  beforeEach(() => JSDOM.fromFile('./dist/index.html')
    .then((dom) => {
      document.body.innerHTML = dom.window.document.body.outerHTML;
    }));
});

test("testing function sum", () => {
  expect(sum(1,2)).toBe(3);
});

