class LevelManager {
  constructor(gameSwitcher) {
    this.gameSwitcher = gameSwitcher;
    this.currentLevel = null;
  }

  setCurrentLevel(levelInstance) {
    if (this.currentLevel) {
      this.currentLevel.destroy();
    }
    this.currentLevel = levelInstance;
    if (this.currentLevel && typeof this.currentLevel.init === 'function') {
      this.currentLevel.init();
    }
  }

  update() {
    if (this.currentLevel && typeof this.currentLevel.update === 'function') {
      this.currentLevel.update();
    }
  }

  draw() {
    if (this.currentLevel && typeof this.currentLevel.draw === 'function') {
      this.currentLevel.draw();
    }
  }

  clearLevel() {
    if (this.currentLevel && typeof this.currentLevel.destroy === 'function') {
      this.currentLevel.destroy();
    }
    this.currentLevel = null;
  }

  getCurrentLevel() {
    return this.currentLevel;
  }
}