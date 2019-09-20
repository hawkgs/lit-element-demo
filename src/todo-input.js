import { LitElement, html } from 'lit-element';

class TodoInput extends LitElement {
  static get properties() {
    return {
      onSubmit: { type: Function }
    };
  }

  render() {
    return html`
      <div class="todo-input">
        <form @submit=${this.createTodo}>
          <input id="todo-input" autocomplete="off" type="text" />
        </form>
      </div>
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
