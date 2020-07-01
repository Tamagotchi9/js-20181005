import Component from '../../component.js';


export default class PhoneViewer extends Component {
  constructor({ element, onBack, onAdd }) {
    super({ element });

    this._onBack = onBack;
    this._onAdd = onAdd;


    this.on('click', 'back-button', () => {
      this._onBack();
    });

    this.on('click', 'add-button', () => {
      this._onAdd(this._phone.id);
    });

    this.on('click', 'small-image', (event) => {
      this._currentImage = event.delegateTarget.src;
      this._render();
    });
  }

  show(phone) {
    this._phone = phone;
    this._currentImage = phone.images[0];

    this._render();

    super.show();
  }

    _render() {
        const { name, description, images } = this._phone;

        this._element.innerHTML = `
      <img class="phone" src="${ this._currentImage }"  alt=""/>
  
      <button data-element="back-button">Back</button>
      <button data-element="add-button">Add to basket</button>
  
  
      <h1>${ name }</h1>
      <p>${ description }</p>
  
      <ul class="phone-thumbs" data-element="small-photos">
        ${ images.map(image => `
            <li>
                <img data-element="small-image" src="${ image }" alt="">
            </li>
        `).join("")}
      </ul>
    `;
    }
}

