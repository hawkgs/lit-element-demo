import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { classMap } from 'lit-html/directives/class-map';

class TodoList extends LitElement {
  static get styles() {
    return css`
      .todo-list-item {
        border-top: 1px solid #eee;
        padding: 15px 20px;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .todo-list-item:hover {
        background-color: rgb(245, 245, 245);
      }

      .text {
        margin: 0;
        flex: 1;
      }

      .text.starred {
        color: goldenrod;
      }

      .actions {
        font-size: 14px;
        color: #999;
        cursor: pointer;
      }

      .actions > span {
        margin-left: 10px;
      }

      .actions > span:hover {
        text-decoration: underline;
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
            <div class="todo-list-item" data-id=${t.id}>
              <p class=${classMap({'text': true, starred: t.starred })}>
                <span>${ t.starred ? '⭐ ' : '' }${t.text}</span>
              </p>
              <div class="actions">
                <span @click=${() => this.onToggleStarring(t.id)}>
                  ${ t.starred ? 'Unstar' : 'Star' }
                </span>
                <span @click=${() => this.onDelete(t.id)}>Done</span>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
