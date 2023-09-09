import './post.css';
import postHTML from './post.html';
import getFormattedDate from '../../Utility/getFormattedDate';

export default class Post {
  constructor(data) {
    this.element = null;

    this.init(data);
  }

  init(data) {
    let tempWrapEl = document.createElement('div');
    tempWrapEl.insertAdjacentHTML('afterbegin', postHTML);
    this.element = tempWrapEl.querySelector('.post');
    tempWrapEl = null;

    this.element.querySelector('.post__data').textContent = getFormattedDate(data.created);
    this.element.querySelector('.img-box img').src = data.image;
    this.element.querySelector('.post__title').textContent = data.title;
    this.element.querySelector('.post__content').textContent = data.content;
  }
}
