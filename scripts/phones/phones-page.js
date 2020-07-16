'use strict'

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from "./components/shopping-cart.js";
import Filter from "./components/filter.js";
import PhoneService from './phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    const phones = PhoneService.getAll();
    this._catalog.show(phones);

    this._catalog.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });

    this._catalog.subscribe('phone-selected', (phoneId) => {
      const phoneDetails = PhoneService.getOneById(phoneId);

      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe("back", () =>  {
      this._viewer.hide();
      this._catalog.show();
    });

    this._viewer.subscribe("add", (phoneId) => {
      this._cart.add(phoneId)
    });
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: document.querySelector('[data-component="filter"]'),
    });

    this._filter.subscribe('filter', (query) => {
      const filteredPhones = PhoneService.getAll({ query });
      this._catalog.show(filteredPhones);
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">
  
        <!--Sidebar-->
        <div class="col-md-2">
          <div data-component="filter"></div>
          <div data-component="shopping-cart"></div>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer"></div>
        </div>
      </div>
    `;
  }
}
