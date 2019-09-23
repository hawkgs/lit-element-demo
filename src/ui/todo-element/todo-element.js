import { LitElement, html, css } from 'lit-element';
import { StorageMixin } from '../../storage/storage-mixin';

import './todo-input';
import './todo-list';

const INIT_TODOS = [{
  id: 0,
  text: 'Groceries',
  starred: false
}, {
  id: 1,
  text: 'Car servicing',
  starred: true
}];

class TodoElement extends StorageMixin(LitElement) {
  static get styles() {
    return css`
      .todo-element {
        width: 600px;
        margin: 50px auto 0 auto;
        background: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
    `;
  }

  static get properties() {
    return {
      todos: Array
    };
  }

  constructor() {
    super();

    this.storeProperties([
      { name: 'todos', value: [...INIT_TODOS] }
    ]);
  }

  render() {
    return html`
      <div class="todo-element">
        <todo-input
          .onSubmit=${this.onTodoSubmit.bind(this)}
        >
        </todo-input>
        <todo-list
          .todos=${this.todos}
          .onToggleStarring=${this.onToggleStarring.bind(this)}
          .onDelete=${this.onDelete.bind(this)}
        >
        </todo-list>
      </div>
    `;
  }

  onTodoSubmit(todoText) {
    this.todos = [
      ...this.todos,
      {
        id: Date.now(),
        text: todoText,
        starred: false
      }
    ];
  }

  onToggleStarring(id) {
    this.todos = this.todos.map((t) => {
      if (t.id === id) {
        t.starred = !t.starred;
      }
      return t;
    });
  }

  onDelete(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}

customElements.define('todo-element', TodoElement);
