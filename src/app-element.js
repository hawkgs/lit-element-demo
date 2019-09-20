import { LitElement, html } from 'lit-element';

class AppElement extends LitElement {
  render() {
    return html`
      <p>App works!!</p>
    `;
  }
}

customElements.define('app-element', AppElement);

