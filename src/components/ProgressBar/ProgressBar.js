import styles from './ProgressBar.module.scss';

const svgNS = 'http://www.w3.org/2000/svg';

class ProgressBar {
  constructor(container, defaultValue = 0, isAnimated = false, isHidden = false, additionalClass = '') {
    if (!container) {
      throw new Error('Container is required');
    }

    this.container = container;
    this.value = this._validateValue(defaultValue);
    this.isAnimated = this._validateBoolean(isAnimated);
    this.isHidden = this._validateBoolean(isHidden);
    this.additionalClass = additionalClass;
    this._render();
  }

  setValue(value) {
    this.value = this._validateValue(value);
    this.update();
  }

  setAnimating(isAnimated) {
    this.isAnimated = this._validateBoolean(isAnimated);
    this.update();
  }

  setHiding(isHidden) {
    this.isHidden = this._validateBoolean(isHidden);
    this.update();
  }

  update() {
    this.circleElement.style.strokeDashoffset = String(this.circumference * (1 - this.value / 100));

    if (this.isAnimated) {
      this.circleElement.classList.add(styles.animated);
    } else {
      this.circleElement.classList.remove(styles.animated);
    }

    this.svgElement.style.opacity = this.isHidden ? '0' : '1';
    this.circleElement.style.opacity = this.value === 0 ? '0' : '1';
  }

  _render() {
    this.svgElement = this._createSvgElement();
    this.circleBackground = this._createCircleBackgroundElement();
    this.circleElement = this._createCircleElement();

    this.svgElement.appendChild(this.circleBackground);
    this.svgElement.appendChild(this.circleElement);
    this.container.appendChild(this.svgElement);

    this.circumference = 2 * Math.PI * this.circleElement.r.baseVal.value;
    this.circleElement.style.strokeDasharray = `${this.circumference} ${this.circumference}`;

    this.update();
  }

  _createSvgElement() {
    const svgElement = document.createElementNS(svgNS, 'svg');

    svgElement.setAttribute('viewBox', '0 0 100 100');
    svgElement.classList.add(styles.svgCircle);

    if (this.additionalClass) {
      svgElement.classList.add(this.additionalClass);
    }

    return svgElement;
  }

  _createCircleBackgroundElement() {
    const circleBackground = document.createElementNS(svgNS, 'circle');

    circleBackground.setAttribute('cx', '50');
    circleBackground.setAttribute('cy', '50');
    circleBackground.setAttribute('r', '45');
    circleBackground.classList.add(styles.circleBackground);

    return circleBackground;
  }

  _createCircleElement() {
    const circleElement = document.createElementNS(svgNS, 'circle');

    circleElement.setAttribute('cx', '50');
    circleElement.setAttribute('cy', '50');
    circleElement.setAttribute('r', '45');
    circleElement.classList.add(styles.circleLoader);

    return circleElement;
  }

  _validateValue(value) {
    let validatedValue = parseInt(value, 10);

    if (isNaN(validatedValue) || validatedValue < 0 || validatedValue > 100) {
      validatedValue = 0;
    }

    return validatedValue;
  }

  _validateBoolean(value) {
    return typeof value === 'boolean' ? value : false;
  }
}

export default ProgressBar;
