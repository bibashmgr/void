import { EventEmitter } from 'events';

export default class Mouse extends EventEmitter {
  constructor() {
    super();

    window.addEventListener('wheel', (e) => {
      this.scrollStrength = e.deltaY;
      this.scrollDirection = 'down';

      if (Math.sign(this.scrollStrength) === -1) {
        this.scrollStrength *= -1;
        this.scrollDirection = 'up';
      }

      this.emit('wheel');
    });
  }
}
