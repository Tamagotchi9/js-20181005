import Component from '../../component.js';

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
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li class="thumbnail" data-element="phone-item" data-phone-id="${ phone.id }">
            <a href="#${ phone.id }" class="thumb" data-element="phone-link">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="add-button">
                Add
              </a>
            </div>
  
            <a href="#${ phone.id }" data-element="phone-link">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
    `;
  }
}
