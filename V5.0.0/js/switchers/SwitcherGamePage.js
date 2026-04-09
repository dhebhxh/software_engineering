class SwitcherGamePage extends SwitcherBase {
  constructor(mainSwitcher) {
    super(mainSwitcher);
    this.levelManager = new LevelManager(this);
  }

  loadLevel(levelNumber) {
    const levelLogic = this.createLevelLogic(levelNumber);
    this.levelManager.setCurrentLevel(levelLogic);

    const levelPage = this.createLevelPage(levelNumber);
    this.main.switchToGame(levelPage);
  }

  createLevelLogic(levelNumber) {
    switch(levelNumber) {
      case 1: return new Level1(this);
      default: throw new Error(`Unknown level: ${levelNumber}`);
    }
  }

  createLevelPage(levelNumber) {
    switch(levelNumber) {
      case 1: return new GamePageLevel1(this);
      default: throw new Error(`Unknown level page: ${levelNumber}`);
    }
  }
}