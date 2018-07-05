import Isotope from 'isotope-layout';
import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css, Resp } from '../modules/dev/_helpers';

class Events {
  constructor() {
    this.block = document.querySelector('.events');

    if (!this.block) return;

    this.tabs = [...this.block.querySelectorAll('.c-tabs__tab')];
    this.tabsBtns = this.block.querySelectorAll('.c-tabs__btn');
    this.btns = this.block.querySelectorAll('.events__more-btn');
    this.itemContainers = document.querySelectorAll('.events__tabs-inner');

    this.init();
  }

  async init() {
    this.getItemsForAnim();
    this.handleScrollAnim();

    if (!Resp.isDesk) this.hideItems();

    await this.buildGrid();
    await this.setSectionHeight();
  }

  setSectionHeight() {
    this.height = parseInt(getComputedStyle(this.block).height);

    this.block.style.minHeight = `${this.height}px`;
  }

  getItemsForAnim(items) {
    return items = [...this.tabs[0].querySelectorAll('.events__item')]
      .filter(function (item) {
        return !item.classList.contains(css.hidden);
      });
  }

  handleScrollAnim() {
    const _this = this;
    const animItems = this.getItemsForAnim();

    for (const [i, item] of animItems.entries()) {
      this.prepareScrollAnim(item);

      new ScrollAnim({
        el: item,
        onEnter() {
          _this.initScrollAnim(i, item);
        }
      });
    }
  }

  prepareScrollAnim(item) {
    TweenMax.set(item, { autoAlpha: 0, y: 50 });
  }

  initScrollAnim(i, item) {
    const tl = new TimelineMax();
    const delay = i * 0.15;

    tl
      .add(() => {
        if (!Resp.isMobiles) {
          tl.staggerTo(this.tabsBtns, .4, { autoAlpha: 1, y: 0 }, '.1', '-=.3');
        }
      })
      .to(item, .5, { y: 0, autoAlpha: 1 }, delay);
  }

  buildGrid() {
    for (const grid of this.itemContainers) {
      const itemsToAnim = grid.querySelectorAll('.events__item.is-hidden');
      const sizer = grid.querySelector('.events__grid-sizer');
      const btn = grid.nextElementSibling.querySelector('.events__more-btn');

      const iso = new Isotope(grid, {
        itemSelector: '.events__item',
        transitionDuration: 0,
        masonry: {
          columnWidth: sizer
        }
      });

      const initShow = Resp.isTablet ? 4 : Resp.isMobile ? 3 : 6;
      let counter = initShow;

      loadMore(initShow);

      function loadMore(toShow) {
        const hiddens = grid.querySelectorAll('.is-hidden');

        for (const item of hiddens) item.classList.remove(css.hidden);

        const hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map((item) => {
          return item.element;
        });

        for (const el of hiddenElems) {
          el.classList.add(css.hidden);
        }

        iso.layout();

        TweenMax.set(itemsToAnim, { autoAlpha: 0, y: -50 });
      }

      btn.addEventListener('click', () => {
        this.showMore(btn, itemsToAnim);

        counter = initShow;
        counter = counter + initShow;
        loadMore(counter);
      });

      for (const btn of this.tabsBtns) {
        btn.addEventListener('click', () => {
          setTimeout(() => {
            iso.layout();
          }, 500);
        });
      }
    }
  }

  showMore(btn, items) {
    const tl = new TimelineMax();
    const moreContainer = btn.parentElement;

    tl
      .to(btn, .3, { autoAlpha: 0, y: 50 })
      .set(moreContainer, { height: 0, overflow: 'hidden' })
      .staggerTo(items, .5, { y: 0, autoAlpha: 1 }, .2);
  }

  hideItems() {
    const showCount = Resp.isTablet ? 4 : Resp.isMobile ? 3 : false;

    for (const container of this.itemContainers) {
      const allItems = [...container.querySelectorAll('.events__item')];
      const itemsToHide = allItems.slice(showCount, allItems.length);

      for (const item of itemsToHide) {
        item.classList.add(css.hidden);
      }
    }
  }
}

export default new Events();
