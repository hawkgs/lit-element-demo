import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

class TodoList extends LitElement {
  static get styles() {
    return css`
      li { cursor: pointer; }
    `;
  }

  static get properties() {
    return {
      todos: { type: Array },
      onToggleStarring: { type: Function }
    };
  }

  get sortedTodos() {
    // Add .slice() maybe
    return this.todos
      .sort((a, b) => {
        if (a.starred === b.starred) {
          return 0;
        } else if (a.starred && !b.starred) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  render() {
    return html`
      <ul>
        ${repeat(this.sortedTodos, (t) => t.id, (t) =>
          html`
            <li
              @click=${() => this.onToggleStarring(t.id)}
            >
              ${t.text} ${t.starred ? '[starred]' : ''}
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('todo-list', TodoList);
