/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);




let currentPage = new _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  element: document.querySelector('[data-page-container]'),
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhonesPage; });
/* harmony import */ var _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _components_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _phone_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);








class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
  }

  _initCatalog() {
    this._catalog = new _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._showFilteredPhones();

    this._catalog.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });

    this._catalog.subscribe('phone-selected', (phoneId) => {
      const promise = _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getOneById(phoneId);

      promise.then((phoneDetails) => {
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });
    });
  }

  _initViewer() {
    this._viewer = new _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe("back", () =>  {
      this._viewer.hide();
      this._showFilteredPhones();
    });

    this._viewer.subscribe("add", (phoneId) => {
      this._cart.add(phoneId)
    });
  }

  _initShoppingCart() {
    this._cart = new _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new _components_filter_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      element: document.querySelector('[data-component="filter"]'),
    });

    this._filter.subscribe('filter', (query) => {
      this._currentQuery = query;
      this._showFilteredPhones();
    });

    this._filter.subscribe('change-order', (orderBy) => {
      this._currentOrderBy = orderBy;
      this._showFilteredPhones();
    });
  }

  async _showFilteredPhones() {
    const phones = await _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getAll({
      query: this._currentQuery,
      orderBy: this._currentOrderBy
    })
        this._catalog.show(phones);
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneCatalog; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class PhoneCatalog extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {
  constructor({element}) {
    this._element = element;
  }

  show() {
    this._element.hidden = false;
  }

  hide() {
    this._element.hidden = true;
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element='${elementName}']`);

      if (!delegateTarget) {
        return;
      }

      event.delegateTarget = delegateTarget;

      callback(event);
    });
  }

  subscribe(eventName, callback) {
    this._element.addEventListener(eventName, (event) => {
      callback(event.detail);
    });
  }

  emit(eventName, data) {
    const customEvent = new CustomEvent(eventName, {detail: data });

    this._element.dispatchEvent(customEvent);
  }

}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneViewer; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);



class PhoneViewer extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this.on('click', 'back-button', () => {
      this.emit("back");
    });

    this.on('click', 'add-button', () => {
      this.emit("add", this._phone.id); 
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



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShoppingCart; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class ShoppingCart extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor({ element }) {
        super({ element })

        this._items = {
            'Samsung Galaxy S9': 2,
        };

        this._render();

        this.on('click', 'remove-button', (event) => {
            const item = event.target.closest('[data-element="item"]')
            this.remove(item.dataset.itemId);
        });
    }

    add(itemId) {
        if (!this._items[itemId]) {
            this._items[itemId] = 0;
        }

        this._items[itemId] += 1;

        this._render();
    }

    remove(itemId) {
        this._items[itemId] -= 1;

        if (this._items[itemId] === 0) {
            delete this._items[itemId];
        }

        this._render();
    }

    _render() {
        this._element.innerHTML = `
      <section>
        <h3>Shopping Cart</h3>
        <ul>
          ${ Object.entries(this._items).map(([id, quantity]) => `
            <li data-element="item" data-item-id="${ id }">
              ${ id } (${ quantity })
              <button data-element="remove-button">x</button>
            </li>
            
          `).join('')}
        </ul>
      </section>
    `;
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Filter extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor({ element }) {
        super({ element });

        this._render();

        this.on('input', 'query', (event) => {
            this.emit('filter',event.delegateTarget.value);
        });

        this.on('change', 'order-by', (event) => {
            this.emit('change-order',event.delegateTarget.value);
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
              <select data-element="order-by">
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </section>
        `;
    }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const API_URL = `https://mgrinko.github.io/js-20181004/api`;

const PhoneService = {
  getAll({ query, orderBy } = {}) {
      return this.fetchData(`/phones`)
        .then(phones => {
            const filteredPhones = this._filter(phones, query);
            return this._sort(filteredPhones, orderBy);
        })
  },

  getOneById(phoneId) {
      return this.fetchData(`/phones/${ phoneId }`);
  },

  fetchData(url, params = {}) {
      return fetch(`${ API_URL }${ url }.json`, params)
          .then((response) => response.json())
  },

  sendRequest(url, {method = "GET"} = {}) {
    return new Promise(
      (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url,
              true);
        xhr.send();

        xhr.onload = () => {
          if(xhr.status !== 200) {
            reject(new Error(xhr.status + ' : ' + xhr.statusText));
          } else {
            resolve(JSON.parse(xhr.responseText));
            }
          };
        });
  },

  _filter(phones, query) {
    if(!query) {
      return phones;
    }

    const normalizedQuery = query.toLowerCase();
    return phones
        .filter(phone => {
          const normalizedName = phone.name.toLowerCase();
          return normalizedName.includes(normalizedQuery)
        });
  },

  _sort(phones, orderBy) {
    if(!orderBy) {
      return phones;
    }

    return [...phones].sort((phone1, phone2) => {
      return (phone1[orderBy] > phone2[orderBy]) ? 1 : -1;
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (PhoneService);


/***/ })
/******/ ]);