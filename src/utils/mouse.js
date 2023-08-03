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

    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        this.scrollPosition.y = window.scrollY;
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
