import { EventEmitter } from 'events';
import gsap from 'gsap';

import Experience from '../Experience';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    this.isScrolling = false;
    this.scrollPosition = {
      x: 0,
      y: 0,
    };
    this.cursorPosition = {
      x: 0,
      y: 0,
    };

    window.addEventListener('wheel', (event) => {
      let scrollY = this.scrollPosition.y;
      if (!gsap.isTweening('#app')) {
        if (event.deltaY > 0) {
          scrollY += this.sizes.height;
          if (this.scrollPosition.y < 4 * this.sizes.height) {
            this.scrollPosition.y = scrollY;
            gsap.to('#app', {
              y: -this.scrollPosition.y,
            });
          }
        } else {
          scrollY -= this.sizes.height;
          if (this.scrollPosition.y > 0) {
            this.scrollPosition.y = scrollY;
            gsap.to('#app', {
              y: -this.scrollPosition.y,
            });
          }
        }
      }
    });

    window.addEventListener('mousemove', (event) => {
      this.cursorPosition.x = event.clientX / this.sizes.width;
      this.cursorPosition.y = -event.clientY / this.sizes.height;
    });
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }
}
