import ScrollMagic from 'Scrollmagic';
import TweenMax from 'gsap';
import { css } from '../modules/dev/_helpers';

export default class ToTop {
  constructor(trigger) {
    this.btn = document.querySelector('.to-top');
    if (!this.btn) return;

    this.trigger = document.querySelector(trigger);

    this.init();
  }
	
  init() {
    this.showBtn();
    this.bindEvents();
  }

  bindEvents() {
    this.btn.addEventListener('click', this.scrollToTop);
  }

  showBtn() {
    const _this = this;
    const scrollController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: _this.trigger,
      triggerHook: .9
    })
      .on('enter', () => {
        _this.btn.classList.add(css.active);
      })
      .on('leave', () => {
        _this.btn.classList.remove(css.active);
      })
      .addTo(scrollController);
  }

  scrollToTop() {
    TweenMax.to(window, 1.5, {
      scrollTo: { y: 0, autoKill: false }
    });
  }
}
