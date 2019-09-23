import { LitElement, html } from 'lit-element';

import './header-element/header-element';
import './todo-element/todo-element';

class AppElement extends LitElement {
  render() {
    return html`
      <div id="app">
        <header-element></header-element>
        <todo-element></todo-element>
      </div>
    `;
  }
}

customElements.define('app-element', AppElement);
