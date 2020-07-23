import Component from '../../component.js';

import templateFunction from './phone-catalog.hbs';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._phones = [];

    this._render();

    this.on('click', 'phone-link',  (event) => {
      const phoneElement = event.target.closest('[data-element="phone-item"]');

      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', "add-button",  (event) => {
      const phoneElement = event.target.closest('[data-element="phone-item"]');

      this.emit('add', phoneElement.dataset.phoneId);
    });
  }

  show(phones) {
    this._phones = phones;
    this._render();
    super.show();
  }

  _render() {
    this._element.innerHTML = templateFunction({
      phones: this._phones,
    });
  }
}
