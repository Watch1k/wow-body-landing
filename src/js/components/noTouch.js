import  { css, debounce, Resp } from '../modules/dev/_helpers';

class NoTouch {
  constructor() {
    NoTouch.init();
  }

  static init() {
    const body = document.querySelector('body');
    const toggleNoTouch = () => {
      Resp.isDesk ? body.classList.add(css.noTouch) : body.classList.remove(css.noTouch);
    };

    toggleNoTouch();
    window.addEventListener('resize', debounce(toggleNoTouch, this, 250));
  }
}

export default new NoTouch();
