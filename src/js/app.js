/* eslint-disable no-console */
import News from './News/News';

const news = new News();
news.getNews();

(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register(
        './service-worker.js',
      );
      console.log('sw registered');
    }
  } catch (e) {
    console.log(e);
  }
})();
