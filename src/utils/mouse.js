import { EventEmitter } from 'events';
import gsap from 'gsap';

import Experience from '../Experience';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    this.scrollY = -window.scrollY;
    this.position = {
      x: 0,
      y: 0,
    };

    window.addEventListener('scroll', () => {
      this.scrollY = -window.scrollY;
    });

    window.addEventListener('mousemove', (event) => {
      this.position.x = event.clientX / this.sizes.width;
      this.position.y = -event.clientY / this.sizes.height;
    });
  }
}
