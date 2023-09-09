import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import Post from './Post/Post';
import Loader from './Loader/Loader';
import Animate from '../Utility/Animate';

export default class News {
  constructor() {
    this.element = null;
    this.els = {
      listPosts: null,
    };
    this.url = new URL('https://workers-loading-styling-backen.herokuapp.com/');

    this.init();
  }

  init() {
    this.element = document.querySelector('.news-box');
    this.els.listPosts = this.element.querySelector('.list-posts');
    this.element.querySelector('.news__btn-refresh')
      .addEventListener('click', (event) => this.onBtnRefreshClick(event));
  }

  getLoader() {
    this.els.listPosts.innerHTML = '';

    for (let i = 0; i < 3; i += 1) {
      this.els.listPosts.append(new Loader().element);
    }
  }

  refresh(data) {
    if (!data) return;

    const postsEls = data.reduce((acc, postData) => {
      acc.push(new Post(postData).element);
      return acc;
    }, []);

    this.els.listPosts.innerHTML = '';
    this.els.listPosts.append(...postsEls);
  }

  getNews() {
    this.getLoader();
    Animate.animationOpacity(this.els.listPosts, 300);

    ajax.getJSON(`${this.url}news/latest`)
      .pipe(
        map(({ data }) => data),
        catchError((err) => {
          this.openErrorModal();

          if (err.status > 500) {
            return throwError(new Error('Внутренняя Ошибка Сервера'));
          }
          if (err.status > 400) {
            return throwError(new Error('Неверный запрос'));
          }
          return of(null);
        }),
      )
      .subscribe({
        next: (data) => {
          Animate.animationOpacityReverse(this.els.listPosts, 300);
          setTimeout(() => {
            this.refresh(data);
            Animate.animationOpacity(this.els.listPosts, 300);
          }, 300);
        },
      });
  }

  onBtnRefreshClick(event) {
    event.preventDefault();

    const errModalEl = this.element.querySelector('.err-modal');
    if (errModalEl) this.closeErrorModal();
    this.getNews();
  }

  openErrorModal() {
    const errModal = document.createElement('div');
    errModal.classList.add('err-modal');
    errModal.textContent = 'Не удалось загрузить данные. Проверьте подключение и обновите страницу.';
    this.element.append(errModal);
    Animate.animationOpacity(this.element.querySelector('.err-modal'), 300);
    Animate.animationOpacityReverse3(this.element.querySelector('.news'), 300);
  }

  closeErrorModal() {
    Animate.animationOpacity3(this.element.querySelector('.news'), 300);
    Animate.animationOpacityReverse(this.element.querySelector('.err-modal'), 300);
    setTimeout(() => this.element.querySelector('.err-modal').remove(), 300);
  }
}
