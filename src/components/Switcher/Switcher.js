import styles from './Switcher.module.scss';

class Switcher {
  constructor(container, label = '', defaultValue = false, additionalClass = '') {
    if (!container) {
      throw new Error('Container is required');
    }

    this.container = container;
    this.label = label;
    this.defaultValue = defaultValue;
    this.additionalClass = additionalClass;
    this.events = [];
    this._render();
  }

  onToggle(callback) {
    const handler = () => callback(this.getValue());

    this.events.push(handler);
    this.inputElement.addEventListener('change', handler);
  }

  getValue() {
    return this.inputElement.checked;
  }

  setValue(isChecked) {
    this.inputElement.checked = this._validateBoolean(isChecked);
  }

  destroyEvents() {
    this.events.forEach((handler) => {
      this.inputElement.removeEventListener('change', handler);
    });
    this.events = [];
  }

  _render() {
    this.inputElement = this._createInputElement();
    this.inputElement.classList.add(styles.input);
    const wrapper = this._createWrapperElement();
    const labelElement = this._createLabelElement();

    wrapper.appendChild(labelElement);
    wrapper.appendChild(document.createTextNode(this.label));
    this.container.appendChild(wrapper);
  }

  _createInputElement() {
    const input = document.createElement('input');

    input.type = 'checkbox';
    input.checked = this.defaultValue;

    return input;
  }

  _createWrapperElement() {
    const wrapper = document.createElement('div');

    wrapper.classList.add(styles.wrapper);

    if (this.additionalClass) {
      wrapper.classList.add(this.additionalClass);
    }

    return wrapper;
  }

  _createLabelElement() {
    const labelElement = document.createElement('label');
    const divElement = document.createElement('div');

    labelElement.classList.add(styles.switcher);
    labelElement.appendChild(this.inputElement);

    divElement.classList.add(styles.slider);
    labelElement.appendChild(divElement);

    return labelElement;
  }

  _validateBoolean(value) {
    return typeof value === 'boolean' ? value : this.getValue();
  }
}

export default Switcher;
