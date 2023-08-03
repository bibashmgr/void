import { EventEmitter } from 'events';

import Experience from '../Experience';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.sizes = this.experience.sizes;

    this.scrollPosition = {
      x: 0,
      y: window.scrollY,
    };
    this.cursorPosition = {
      x: 0,
      y: 0,
    };

    window.addEventListener('scroll', (event) => {
      this.scrollPosition.y = window.scrollY;
      console.log(this.scrollPosition.y);
    });

    window.addEventListener('mousemove', (event) => {
      this.cursorPosition.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.cursorPosition.y = (-event.clientY / this.sizes.height) * 2 + 1;
    });
  }
}
