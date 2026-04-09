class GamePageLevel1 extends PageBase {
  constructor(switcher) {
    super(switcher);

    const backBtn = new ButtonBase('◀', 0.02 * width, 0.03 * height, () => {
      console.log('返回按钮手动点击');
      this.switcher.main.staticSwitcher.showMainMenu();
    }, 'back-button');
    backBtn.btn.style('width', 0.030 * width + 'px');
    backBtn.btn.style('height', 0.055 * height + 'px');
    this.addElement(backBtn);
  }

  update() {
    this.switcher.levelManager.update();
  }

  draw() {
    this.switcher.levelManager.draw();
  }

  exit() {
    console.log('GamePageLevel1 exit');
    this.switcher.levelManager.clearLevel();
    super.exit();
  }
}