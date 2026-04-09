class Level1 {
  constructor(gameSwitcher) {
    this.gameSwitcher = gameSwitcher;
  }

  init() {}

  update() {}

  draw() {
    if (typeof bgLevel1 !== 'undefined' && bgLevel1) {
      image(bgLevel1, 0, 0, width, height);
    } else {
      background(200, 220, 255);
    }
  }

  destroy() {}
}