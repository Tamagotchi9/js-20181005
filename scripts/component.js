export default class Component {
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
