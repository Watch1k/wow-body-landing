import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from '../components/Preloader';
import { css } from '../modules/dev/_helpers';

class Programs {
  constructor () {
    this.block = document.querySelector('.programs');

    if (!this.block) return;

    this.items = this.block.querySelectorAll('.program-card');
    this.tl = new TimelineMax();

    this.init();
  }

  async init() {
    await preloader.wait();
    this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    for (const [i, item] of this.items.entries()) {
      new ScrollAnim({
        el: item,
        onEnter() {
          _this.initScrollAnim(i, item);
        }
      });
    }
  }

  initScrollAnim(i, item) {
    const mask = item.querySelector('.program-card__mask');
    const delay = i * 0.06;

    this.tl
      .to(mask, 1, { width: 0 }, delay)
      .add(() => {
        item.classList.remove(css.disabled);
      });
  }
}

export default new Programs();
