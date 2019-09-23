import { fixture, expect } from '@open-wc/testing';

import '../src/ui/app-element';

describe('app-element', () => {
  it('should contain header and todo element', async () => {
    const el = await fixture('<app-element></app-element>');
    expect(el).shadowDom.to.equal(`
      <div id="app">
        <header-element></header-element>
        <todo-element></todo-element>
      </div>
    `);
  });
});
