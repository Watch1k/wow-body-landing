import { TimelineMax, TweenMax } from 'gsap';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');
    this.$preloaderImgOver = $('.preloader__img-over');

    this.init();
  }

  async init() {
    this.animPreloader();
  }

  wait() {
    return this.resolve;
  }

  animPreloader() {
    this.resolve = new Promise(resolve => {

      resolve();
      const tl = new TimelineMax({
        onComplete() {
          resolve();
        }
      });

      tl
        .to(this.$preloaderImgOver, .5, { className: '+=is-anim' })
        .to(this.$preloader, .5, { autoAlpha: 0 }, '+=1');
    });
  }
}

export const preloader = new Preloader();
