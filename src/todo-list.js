import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

class TodoList extends LitElement {
  static get styles() {
    return css`
      .todo {
        display: flex;
      }
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
      <div class="todo-list">
        ${repeat(this.sortedTodos, (t) => t.id, (t) =>
          html`
            <div class="todo">
              <span>${t.starred ? '⭐ ' : ''}${t.text}</span>
              <a href="javascript:void(0);" @click=${() => this.onToggleStarring(t.id)}>[star]</a>
              <a href="javascript:void(0);" @click=${() => this.onDelete(t.id)}>[delete]</a>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
