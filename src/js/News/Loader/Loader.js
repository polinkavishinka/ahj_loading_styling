import './loader.css';
import loaderHTML from './loader.html';

export default class Loader {
  constructor() {
    this.element = null;

    this.init();
  }

  init() {
    let tempWrapEl = document.createElement('div');
    tempWrapEl.insertAdjacentHTML('afterbegin', loaderHTML);
    this.element = tempWrapEl.querySelector('.loader');
    tempWrapEl = null;
  }
}
