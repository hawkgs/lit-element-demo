import { LitElement } from 'lit-element';
import { fixture, expect } from '@open-wc/testing';

import { StorageMixin } from '../src/storage/storage-mixin';
import { LocalStorage } from '../src/storage/local-storage';

const PROP_NAME = 'mock';
const PROP_VALUE = 42;

const createElement = () => class extends StorageMixin(LitElement) {
  constructor() {
    super();
    this.storeProperties([
      { name: PROP_NAME, value: PROP_VALUE }
    ]);
  }
};

describe('storage-mixin', () => {
  let el;

  beforeEach(async () => {
    LocalStorage.clear();

    const MockElement = createElement();
    const tag = 'mock-element-' + Date.now();
    customElements.define(tag, MockElement);

    el = await fixture(`<${tag}></${tag}>`);
  });

  it('should get initial property', () => {
    // Check element's prop
    expect(el[PROP_NAME]).to.equal(PROP_VALUE);

    // Check storage
    const value = el.__storage.get(PROP_NAME);
    expect(value).to.equal(PROP_VALUE);
  });

  it('should set a property', () => {
    el[PROP_NAME] = 1337;

    // Check element's prop
    expect(el[PROP_NAME]).to.equal(1337);

    // Check storage
    const value = el.__storage.get(PROP_NAME);
    expect(value).to.equal(1337);
  });
});
