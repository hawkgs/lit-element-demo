import { fixture, expect } from '@open-wc/testing';

import '../src/header-element/header-element';

describe('header-element', () => {
  it('should contain title', async () => {
    const el = await fixture('<header-element></header-element>');
    expect(el).shadowDom.to.equal(`
      <header id="header">
        lit-html-demo
      </header>
    `);
  });
});
