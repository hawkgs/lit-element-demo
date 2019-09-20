import { LitElement, html } from 'lit-element';

import './header-element';
import './todo-input';

class AppElement extends LitElement {
  render() {
    return html`
      <div id="app">
        <header-element></header-element>
        <div class="main-content">
          <todo-input
            .onSubmit=${this.onTodoSubmit}
          >
          </todo-input>
        </div>
      </div>
    `;
  }

  onTodoSubmit(todoText) {
    console.log(todoText);
  }
}

customElements.define('app-element', AppElement);

