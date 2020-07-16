import Component from "../../component.js";

export  default class Filter extends Component {
    constructor({ element }) {
        super({ element });

        this._render();

        this.on('input', 'query', (event) => {
            this.emit('filter',event.delegateTarget.value);
        });
    }

    _render() {
        this._element.innerHTML = `
        <section>
            <p>
              Search:
              <input data-element="query">
            </p>
    
            <p>
              Sort by:
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </section>
        `;
    }
}