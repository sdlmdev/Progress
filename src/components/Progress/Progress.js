import styles from './Progress.module.scss';
import ProgressBar from '@/components/ProgressBar/ProgressBar.js';
import Input from '@/components/Input/Input.js';
import Switcher from '@/components/Switcher/Switcher.js';

class Progress {
  constructor(container, value = 0, isAnimated = false, isHidden = false, additionalClass = '') {
    if (!container) {
      throw new Error('Container is required');
    }

    this.container = container;
    this.value = value;
    this.isAnimated = isAnimated;
    this.isHidden = isHidden;
    this.additionalClass = additionalClass;
    this._render();
  }

  _render() {
    const app = this._createAppElement();
    const titleElement = this._createTitleElement();
    const progressContainer = this._createProgressContainer();
    const progressBarContainer = this._createProgressBarContainer();
    const controlsContainer = this._createControlsContainer();

    this.input = new Input(controlsContainer, this.value, 'Value');
    this.animateSwitcher = new Switcher(controlsContainer, 'Animate', this.isAnimated);
    this.hideSwitcher = new Switcher(controlsContainer, 'Hide', this.isHidden);
    this.progressBar = new ProgressBar(progressBarContainer, this.value, this.isAnimated, this.isHidden);

    app.appendChild(titleElement);
    progressContainer.appendChild(progressBarContainer);
    progressContainer.appendChild(controlsContainer);
    app.appendChild(progressContainer);
    this.container.appendChild(app);

    this._setupEventListeners();
  }

  _createAppElement() {
    const app = document.createElement('div');

    app.classList.add(styles.app);

    if (this.additionalClass) {
      app.classList.add(this.additionalClass);
    }

    return app;
  }

  _createTitleElement() {
    const titleElement = document.createElement('h1');

    titleElement.textContent = 'Progress';
    titleElement.classList.add(styles.title);

    return titleElement;
  }

  _createProgressContainer() {
    const progressContainer = document.createElement('div');

    progressContainer.classList.add(styles.progress);

    return progressContainer;
  }

  _createProgressBarContainer() {
    const progressBarContainer = document.createElement('div');

    progressBarContainer.classList.add(styles.progressBar);

    return progressBarContainer;
  }

  _createControlsContainer() {
    const controlsContainer = document.createElement('div');

    controlsContainer.classList.add(styles.controls);

    return controlsContainer;
  }

  _setupEventListeners() {
    this.input.onChange((value) => {
      this.value = value;
      this.progressBar.setValue(value);
    });

    this.animateSwitcher.onToggle((isAnimating) => {
      this.isAnimated = isAnimating;
      this.progressBar.setAnimating(isAnimating);
    });

    this.hideSwitcher.onToggle((isHiding) => {
      this.isHidden = isHiding;
      this.progressBar.setHiding(isHiding);
    });
  }
}

export default Progress;
