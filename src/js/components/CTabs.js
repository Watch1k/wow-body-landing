import { TimelineMax, TweenMax } from 'gsap';
import { css, Resp } from '../modules/dev/_helpers';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

class CTabs {
  constructor(el) {
    this.$block = $('.c-tabs');
    this.$tabNav = el.find('.c-tabs__nav').find('.c-tabs__btn');
    this.$tabItemContainer = el.find('.c-tabs__for');
    this.$tabItem = this.$tabItemContainer.find('.c-tabs__tab');

    if (this.$block.length) this.init();
  }

  init() {
    this.bindEvents();
    if (Resp.isMobiles) {
      this.collapseNav();
      this.animNavOnMob();
    }
  }

  bindEvents() {
    if (!this.$tabNav.hasClass('js-disabled') && this.getActiveIndex() !== 0) {
      this.$tabItem.hide()
        .eq(this.getActiveIndex()).show();
    }

    this.$tabNav.on('click', (ev) => {
      const currentIndex = this.getActiveIndex();
      const targetIndex = $(ev.currentTarget).index();

      this.changeTab(currentIndex, targetIndex);
    });
  }

  animNavOnMob() {
    const animEl = this.$tabNav.parent().attr('data-anim', 'fade-y');

    new ScrollAnim({
      el: animEl[0],
      hook: .85,
      onEnter() {
        TweenMax.to(animEl, .4, { autoAlpha: 1, y: 0 });
      }
    });
  }

  collapseNav() {
    const _this = this;
    const $hiddenBtns = this.$tabNav.not(':first');
    const $tabsBtnContainer = this.$tabNav.parent();
    const tl = new TimelineMax();

    TweenMax.set($hiddenBtns, { autoAlpha: 0, y: -5, height: 0 });

    $tabsBtnContainer.on('click', function () {
      const $this = $(this);

      if ($this.hasClass(css.active)) {
        const $notActiveBtns = _this.$tabNav.filter((i, el) => {
          return !$(el).hasClass(css.active);
        });

        tl
          .to($notActiveBtns, .4, { autoAlpha: 0, y: -5, height: 0 })
          .add(() => {
            $this.removeClass(css.active);
          });
      } else {
        tl
          .to(_this.$tabNav, .4, { autoAlpha: 1, y: 0, height: 40 });
      }

      $this.addClass(css.active);

    });
  }

  getActiveIndex() {
    let activeIndex = 0;

    this.$tabNav.each(function () {
      if ($(this).hasClass(css.active)) {
        activeIndex = $(this).index();
      }
    });

    return activeIndex;
  }

  changeTab(currentIndex, nextIndex) {
    const _this = this;
    const speed = 0.4;
    const $currentTabNav = this.$tabNav.eq(currentIndex);
    const $nextTabNav = this.$tabNav.eq(nextIndex);
    const $currentTab = this.$tabItem.eq(currentIndex);
    const $nextTab = this.$tabItem.eq(nextIndex);

    $currentTabNav.removeClass(css.active);
    $nextTabNav.removeClass(css.disabled).addClass(css.active);
    TweenMax.to($currentTab, speed, {
      autoAlpha: 0,
      y: 30,
      clearProps: 'transform',
      onComplete() {
        const currentHeight = _this.$tabItemContainer.outerHeight();
        TweenMax.set(_this.$tabItemContainer, {height: currentHeight});
        $(this.target).hide();
        TweenMax.set($nextTab, {autoAlpha: 1});
        $nextTab.show();

        TweenMax.staggerFromTo($nextTab.children().children(), speed, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          y: 0
        }, speed / 2);
        TweenMax.set(_this.$tabItemContainer, {height: 'auto'});
        TweenMax.from(_this.$tabItemContainer, speed, {height: currentHeight});
      }
    });
  }
}

// /** tabs init */
const $tabs = $('.c-tabs');
$tabs.each((index, el) => {
  new CTabs($(el));
});
