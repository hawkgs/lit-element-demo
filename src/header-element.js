import { LitElement, html, css } from 'lit-element';

class HeaderElement extends LitElement {
  static get styles() {
    return css`
      .header {
        color: red;
        width: 100%;
        background: #fff;
      }

      .content {
        color: red;
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

