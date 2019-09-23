import { fixture, expect, elementUpdated } from '@open-wc/testing';

import '../src/todo-element/todo-element';
import '../src/todo-element/todo-list';

describe('todo-element', () => {
  let el;

  beforeEach(async () => {
    el = await fixture('<todo-element></todo-element>');
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
});
