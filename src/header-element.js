import { LitElement, html, css } from 'lit-element';

class HeaderElement extends LitElement {
  static get styles() {
    return css`
      .header {
        color: red;
        width: 100%;
        background: #fff;
        text-align: center;
        padding: 10px;
      }

      .content {
        font-size: 20px;
        color: #ccc;
      }
    `;
  }

  render() {
    return html`
      <header class="header">
        <div class="content">
          lit-html-demo
        </div>
      </header>
    `;
  }
}

customElements.define('header-element', HeaderElement);

