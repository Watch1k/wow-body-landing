import { TimelineMax, TweenMax } from 'gsap';
import { css } from '../modules/dev/_helpers';

class Shop {
  constructor() {
    this.block = document.querySelector('.shop');

    if (!this.block) return;

    this.item = this.block.querySelectorAll('.shop__item');

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.handleToggle();
  }

  handleToggle() {
    for (const item of this.item) {
      const btn = item.querySelector('.shop__item-btn');
      const btnIcon = btn.querySelector('.shop__item-btn-icon');
      const popup = item.querySelector('.shop__item-popup');
      const twMax = TweenMax;

      twMax.set(btn, { backgroundColor: '#fff' });
      twMax.set(btnIcon, { rotation: '135deg', fill: '#000' });
      twMax.set(popup, { maxHeight: '18px', width: 20, autoAlpha: 0 });

      popup.animation = new TimelineMax({ paused: true });

      popup.animation
        .set(item, { zIndex: 10 })
        .to(btn, .3, { backgroundColor: '#47505c' }, 'all')
        .to(btnIcon, .3, { rotation: 0, fill: '#fff' }, 'all')
        .to(popup, .4, { width: 330, autoAlpha: 1 }, 'all')
        .to(popup, .6, { maxHeight: '600px' });

      if (item.classList.contains(css.active)) popup.animation.play();

      btn.addEventListener('click', () => {
        this.toggle(item, popup.animation);
      });
    }
  }

  toggle(item, timeline) {
    if (item.classList.contains(css.active)) {
      item.classList.remove(css.active);
      timeline.reverse();
    } else {
      item.classList.add(css.active);
      timeline.play();
    }

    const siblings = Array
      .from(item.parentElement.children)
      .filter(x => x !== item);

    for (const el of siblings) {
      const popup = el.querySelector('.shop__item-popup');

      popup.animation.reverse();
      el.classList.remove(css.active);
    }
  }
}

export default new Shop();
