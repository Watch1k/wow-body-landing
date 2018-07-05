import 'slick-carousel';

class Sliders {
	constructor() {
		this.$teamSlider = $('.team__squad-list');
		this.$articleSlider = $('.article__slider');

		const arrL = `<svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g transform="translate(-121.000000, -4565.000000)" id="team">
						<g transform="translate(-14.000000, 3611.000000)">
								<g transform="translate(135.000000, 954.000000)">
										<g>
												<polyline stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(24.000000, 25.000000) rotate(90.000000) translate(-24.000000, -25.000000) " points="20 23 24 27 28 23"></polyline>
										</g>
								</g>
						</g>
				</g>
		</g>
</svg>`;
		const arrR = `<svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1271.000000, -4565.000000)" id="team">
            <g transform="translate(-14.000000, 3611.000000)">
                <g transform="translate(1285.000000, 954.000000)">
                    <g>
                        <polyline stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(25.000000, 25.000000) scale(-1, 1) rotate(90.000000) translate(-25.000000, -25.000000) " points="21 23 25 27 29 23"></polyline>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`;

		this.defaultOptions = {
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
      infinite: false,
			speed: 800,
			cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
			useTransform: true,
			adaptiveHeight: true,
			accessibility: false,
			swipe: true,
      arrows: true,
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${arrL}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${arrR}</button>`,
			rows: 0
		};

		this.init();
	}

	init() {
		if (this.$teamSlider.length) this.teamSlider();
		if (this.$articleSlider.length) this.articleSlider();
	}

	teamSlider() {
		this.$teamSlider.slick($.extend({}, this.defaultOptions, {
			slidesToShow: 4,
			slidesToScroll: 2,
			responsive: [
				{
					breakpoint: 1199,
					settings: {
						slidesToShow: 3.2
					}
				}, {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2.45
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
	          dots: true
          }
        }
			]
		}));
	}

  articleSlider() {
    this.$articleSlider.slick($.extend({}, this.defaultOptions, {
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: true
          }
        }
      ]
    }));
  }
}

export default new Sliders();
