import { LitElement, html, css } from 'lit-element';

class TodoInput extends LitElement {
  static get styles() {
    return css`
      form {
        width: inherit;
      }

      input {
        width: 100%;
        border: none;
        font-size: 16px;
        padding: 15px 20px;
        box-sizing: border-box;
        color: #666;
      }
    `;
  }

  static get properties() {
    return {
      onSubmit: { type: Function }
    };
  }

  render() {
    return html`
      <form @submit=${this.createTodo}>
        <input
          id="todo-input"
          autocomplete="off"
          placeholder="Enter your to-do here"
          type="text"
        />
      </form>
    `;
  }

  firstUpdated() {
    this.todoInput = this.shadowRoot.getElementById('todo-input');
  }

  createTodo(e) {
    e.preventDefault();
    this.onSubmit(this.todoInput.value);
    this.todoInput.value = '';
  }
}

customElements.define('todo-input', TodoInput);
