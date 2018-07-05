import 'dotdotdot';
import { $window, throttle } from '../modules/dev/_helpers';

export default class Dot {

  constructor(el) {
    this.$el = $(el);

    this.init();
  }

  init() {
    $window.on('load', () => {
      this.initDot();
      this.onResize();
    });
  }

  onResize() {
    const reinitDot = throttle(() => {
      this.destroy();
      this.initDot();
    }, 250, this);

    $window.on('resize orientationchange', reinitDot);
  }

  initDot() {
    this.$el.dotdotdot();
  }

  destroy() {
    this.$el.trigger('destroy');
  }
}

$('.js-dot').find('*').each((i, el) => {
  new Dot(el);
});
