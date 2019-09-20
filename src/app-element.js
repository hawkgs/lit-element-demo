import { LitElement, html } from 'lit-element';

import './header-element';
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

class AppElement extends LitElement {
  constructor() {
    super();
    this.todos = [...INIT_TODOS];
  }

  static get properties() {
    return {
      todos: Array
    };
  }

  render() {
    return html`
      <div id="app">
        <header-element></header-element>
        <div class="main-content">
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

customElements.define('app-element', AppElement);
