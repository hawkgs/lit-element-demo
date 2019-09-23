import { LitElement, html, css } from 'lit-element';

class HeaderElement extends LitElement {
  static get styles() {
    return css`
      #header {
        color: red;
        width: 100%;
        background: #fff;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        color: #ccc;
      }
    `;
  }

  render() {
    return html`
      <header id="header">
        lit-html-demo
      </header>
    `;
  }
}

customElements.define('header-element', HeaderElement);

