import { TimelineMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from '../components/Preloader';
import { Resp } from '../modules/dev/_helpers';

class Team {
  constructor() {
    this.block = document.querySelector('.team');

    if (!this.block) return;

    this.persons = this.block.querySelectorAll('.team__person');
    this.personLeft = this.block.querySelector('.team__person_left');
    this.personRight = this.block.querySelector('.team__person_right');
    this.tl = new TimelineMax();

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.handleScrollAnim();
  }

  handleScrollAnim() {
    const _this = this;

    for (const person of this.persons) {
      new ScrollAnim({
        el: person,
        onEnter() {
          _this.scrollAnim(person);
        }
      });
    }
  }

  scrollAnim(person) {
    if (!Resp.isMobile) {
      this.tl
        .to(this.personLeft, 1, { autoAlpha: 1, x: 0 }, 'persons')
        .to(this.personRight, 1, { autoAlpha: 1, x: 0 }, 'persons');
    } else {
      this.tl
        .to(person, .4, { autoAlpha: 1, y: 0 })
        .to(person, .4, { autoAlpha: 1, y: 0 });
    }

  }
}

export default new Team();
