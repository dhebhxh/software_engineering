// switchers/SwitcherMain.js
class SwitcherMain {
  constructor() {
    this.staticSwitcher = new SwitcherStaticPage(this);
    this.gameSwitcher = new SwitcherGamePage(this);
    this.activeSwitcher = this.staticSwitcher;
  }

  // 切换到静态页面
  switchToStatic(page) {
    // 如果当前活跃的不是静态切换器，则清理游戏切换器的当前页面
    if (this.activeSwitcher !== this.staticSwitcher) {
      if (this.gameSwitcher.currentPage) {
        this.gameSwitcher.currentPage.exit(); // 调用游戏页面的 exit，清理其 DOM 元素
        this.gameSwitcher.currentPage = null;
      }
    }
    this.activeSwitcher = this.staticSwitcher;
    this.staticSwitcher.switchTo(page);
  }

  // 切换到游戏页面
  switchToGame(page) {
    // 如果当前活跃的不是游戏切换器，则清理静态切换器的当前页面
    if (this.activeSwitcher !== this.gameSwitcher) {
      if (this.staticSwitcher.currentPage) {
        this.staticSwitcher.currentPage.exit(); // 调用静态页面的 exit，清理其 DOM 元素
        this.staticSwitcher.currentPage = null;
      }
    }
    this.activeSwitcher = this.gameSwitcher;
    this.gameSwitcher.switchTo(page);
  }

  update() {
    if (this.activeSwitcher) {
      this.activeSwitcher.update();
    }
  }

  draw() {
    if (this.activeSwitcher) {
      this.activeSwitcher.draw();
    }
  }

  getActiveSwitcher() {
    return this.activeSwitcher;
  }
}