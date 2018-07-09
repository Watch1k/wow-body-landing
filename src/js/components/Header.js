import { TimelineMax, TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import ScrollMagic from 'Scrollmagic';
import { preloader } from './Preloader';
import { currentPage, Resp, css } from '../modules/dev/_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.nav = this.header.querySelector('.header__nav');
    this.navLinks = this.nav.querySelector('.header__nav-list');
    this.navMobLinks = [...this.header.querySelector('.header__nav ul').children];
    this.mobActions = [...this.header.querySelector('.header__mob-actions').children];
    this.navFooter = document.querySelector('.footer__nav');
    this.headerTrigger = document.querySelector('.about');
    this.logo = this.header.querySelector('.header__logo');
    this.lang = this.header.querySelector('.header__lang');
    this.navBtn = this.header.querySelector('.header__nav-toggle');
    this.lineLeft = this.header.querySelector('.header__line_l');
    this.lineRight = this.header.querySelector('.header__line_r');

    this.init();
  }

  async init() {
    await preloader.wait();
    this.prepareHeaderAnim();
    this.bindEvents();
    if (!Resp.isDesk) this.initLang();
  }

  bindEvents() {
    if (currentPage === 'home') this.initScroll();
    if (!Resp.isMobile) this.showHeader();

    this.navBtn.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  initScroll() {
    const offsetTop = Resp.isDesk ? 80 : 60;

    this.logo.addEventListener('click', () => {
      this.header.classList.contains(css.menuActive) ? this.navBtn.click() : false;

      TweenMax.to(window, 1.5, {
        scrollTo: { y: 0, autoKill: false }
      });
    });

    [...this.navLinks.querySelectorAll('a')].forEach(item => {
      item.addEventListener('click', (e) => {
        this.body.classList.remove(css.locked);
        if (item.href.indexOf('#') !== -1) {
          e.preventDefault();
          const href = item.href;
          const hashName = href.slice(href.indexOf('#') + 1, href.length);

          TweenMax.to(window, 1.5, {
            scrollTo: {
              y: document.getElementById(hashName).getBoundingClientRect().top + window.pageYOffset - offsetTop,
              autoKill: false
            }
          });
        }
      });
    });

    [...this.navFooter.querySelectorAll('a')].forEach(item => {
      item.addEventListener('click', (e) => {
        this.body.classList.remove(css.locked);
        if (item.href.indexOf('#') !== -1) {
          e.preventDefault();
          const href = item.href;
          const hashName = href.slice(href.indexOf('#') + 1, href.length);

          TweenMax.to(window, 1.5, {
            scrollTo: {
              y: document.getElementById(hashName).getBoundingClientRect().top + window.pageYOffset - offsetTop,
              autoKill: false
            }
          });
        }
      });
    });
  }

  toggleMenu(state = false) {
    switch (state) {
      case 'open':
        this.navBtn.classList.add(css.active);
        break;
      case 'close':
        this.navBtn.classList.remove(css.active);
        break;
      default:
        this.burgerActiveState = css.active;
    }

    this.toggleNav();

    return HeaderAPI;
  }

  set burgerActiveState(className) {
    this.navBtn.classList.toggle(className);
  }

  get burgerActiveState() {
    return this.navBtn.classList.contains(css.active);
  }

  prepareHeaderAnim() {
    this.mobTl = new TimelineMax({
      paused: true, onComplete: () => {
        this.lockBody();
      }
    });

    this.mobTl
      .to(this.nav, .35, {
        y: 0
      })
      .staggerTo(this.navMobLinks, 0.15, {
        autoAlpha: 1,
        y: 0
      }, 0.125)
      .staggerTo(this.mobActions, 0.25, {
        autoAlpha: 1,
        y: 0
      }, 0.125, '=-0.125')
      .to(this.lineLeft, .35, { right: '50%' }, '+=.3 lines')
      .to(this.lineRight, .35, { left: '50%' }, '+=.3 lines');
  }

  toggleNav() {
    if (this.burgerActiveState) {
      this.beforeOpen();
      this.mobTl.timeScale(1).play();
    } else {
      this.beforeClose();
      this.mobTl.timeScale(3).reverse();
      this.body.classList.remove(css.locked);
    }

    if (!Resp.isDesk) {
      this.navLinks.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => {
          this.navBtn.click();
        });
      });
    }
  }

  showHeader() {
    const _this = this;
    const scrollController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: _this.headerTrigger,
      triggerHook: 0
    })
      .on('enter', () => {
        _this.header.classList.add(css.visible);
      })
      .on('leave', () => {
        _this.header.classList.remove(css.visible);
      })
      .addTo(scrollController);
  }

  initLang() {
    [...this.lang.querySelectorAll('a')][0].addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.lang.classList.add(css.active);
    });

    document.addEventListener('click', () => {
      if (this.lang.classList.contains(css.active)) {
        this.lang.classList.remove(css.active);
      }
    });
  }

  lockBody() {
    this.body.classList.toggle(css.locked);
  }

  beforeOpen() {
    this.scrollTop = window.scrollY;
    this.scrollTop > 0 ? this.header.classList.add(css.menuActive) : false;
  }

  beforeClose() {
    this.body.classList.remove(css.locked);
    TweenMax.to(window, 0, {
      scrollTo: { y: this.scrollTop, autoKill: false }
    });
    this.header.classList.remove(css.menuActive);
  }

}

export const HeaderAPI = new Header();
