import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../src/ui/todo-element/todo-element';
import '../src/ui/todo-element/todo-list';

describe('todo-element', () => {
  let el;

  beforeEach(async () => {
    el = await fixture('<todo-element></todo-element>');
    el.todos = [
      { id: 0, text: 'Groceries', starred: false },
      { id: 1, text: 'Change light bulb', starred: true }
    ];
  });

  it('should contain the input and the title', () => {
    expect(el).shadowDom.to.equal(`
      <div class="todo-element">
        <todo-input></todo-input>
        <todo-list></todo-list>
      </div>
    `);
  });

  it('should add new todo', async () => {
    const newTodoText = 'Pay bills';
    const todoInput = el.shadowRoot.querySelector('todo-input');
    const inputElem = todoInput.shadowRoot.querySelector('input');
    inputElem.value = newTodoText;
    todoInput.createTodo({ preventDefault: () => {} });

    const todoExists = !!el.todos.find((t) => t.text === newTodoText);
    expect(todoExists).to.be.true;

    await elementUpdated(el);

    const listElem = el.shadowRoot.querySelector('todo-list');
    const lastItem = listElem.shadowRoot.querySelector('.todo-list-item:last-child');
    expect(lastItem.childNodes[1].childNodes[1].innerText).to.contains(newTodoText);
  });

  it('should delete a todo', async () => {
    const expectedTodosNum = el.todos.length - 1;
    const listElem = el.shadowRoot.querySelector('todo-list');

    const firstTodo = listElem.shadowRoot.querySelector('.todo-list-item:first-child');
    firstTodo.childNodes[3].childNodes[3].click();

    expect(el.todos.length).to.equal(expectedTodosNum);

    await elementUpdated(el);

    const todoElems = listElem.shadowRoot.querySelectorAll('.todo-list-item');
    expect(todoElems.length).to.equal(expectedTodosNum);
  });

  it('should star a todo', async () => {
    const newTodoText = 'Send mail';
    el.onTodoSubmit(newTodoText);

    await elementUpdated(el);

    const listElem = el.shadowRoot.querySelector('todo-list');
    const lastTodo = listElem.shadowRoot.querySelector('.todo-list-item:last-child');
    lastTodo.childNodes[3].childNodes[1].click();

    const isStarred = !!el.todos.find((t) => t.text === newTodoText && t.starred);
    expect(isStarred).to.be.true;

    await elementUpdated(el);

    expect(lastTodo.childNodes[1].classList.contains('starred')).to.be.true;
  });

  it('should unstar a todo', async () => {
    const listElem = el.shadowRoot.querySelector('todo-list');
    const firstTodo = listElem.shadowRoot.querySelector('.todo-list-item:first-child');
    firstTodo.childNodes[3].childNodes[1].click();

    await elementUpdated(el);

    expect(firstTodo.childNodes[1].classList.contains('starred')).to.be.false;
  });

  it('should put starred todos on top', async () => {
    el.todos = [
      { id: 1, text: 'one', starred: false },
      { id: 2, text: 'two', starred: true },
      { id: 3, text: 'three', starred: false },
      { id: 4, text: 'four', starred: true },
      { id: 5, text: 'five', starred: false }
    ];

    await elementUpdated(el);

    const listElem = el.shadowRoot.querySelector('todo-list');
    expect(listElem.sortedTodos.map(t => t.starred)).to.deep.equal([true, true, false, false, false]);
  });
});
