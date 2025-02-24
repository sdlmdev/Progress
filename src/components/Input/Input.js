import styles from './Input.module.scss';

class Input {
  constructor(container, defaultValue = 0, label = '', min = 0, max = 100, additionalClass = '') {
    if (!container) {
      throw new Error('Container is required');
    }

    this.container = container;
    this.defaultValue = defaultValue;
    this.min = min;
    this.max = max;
    this.label = label;
    this.additionalClass = additionalClass;
    this.events = [];
    this._render();
  }

  onChange(callback) {
    const handler = () => callback(this.getValue());

    this.events.push(handler);
    this.inputElement.addEventListener('input', handler);
  }

  getValue() {
    return parseInt(this.inputElement.value, 10);
  }

  setValue(value) {
    this._validateInput(value);
  }

  destroyEvents() {
    this.events.forEach((handler) => {
      this.inputElement.removeEventListener('input', handler);
    });

    this.events = [];
  }

  _render() {
    const labelElement = this._createLabelElement();
    this.inputElement = this._createInputElement();

    this._validateInput(this.defaultValue);

    labelElement.appendChild(this.inputElement);
    labelElement.appendChild(document.createTextNode(this.label));
    this.container.appendChild(labelElement);

    this.inputElement.addEventListener('input', (e) => this._validateInput(e.target.value));
  }

  _createInputElement() {
    const input = document.createElement('input');

    input.classList.add(styles.input);
    input.type = 'text';
    input.min = String(this.min);
    input.max = String(this.max);

    return input;
  }

  _createLabelElement() {
    const labelElement = document.createElement('label');

    labelElement.classList.add(styles.label);

    if (this.additionalClass) {
      labelElement.classList.add(this.additionalClass);
    }

    return labelElement;
  }

  _validateInput(value) {
    if (value === '') {
      value = 0;
    } else if (/^0\d+/.test(value)) {
      value = value.replace(/^0+/, '');
    }

    if (!/^\d+$/.test(value)) {
      value = 0;
    } else {
      value = parseInt(value, 10);
    }

    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    this.inputElement.value = value;
  }
}

export default Input;
