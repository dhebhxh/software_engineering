class SwitcherBase {
  constructor(mainSwitcher) {
    this.main = mainSwitcher;
    this.currentPage = null;
  }

  switchTo(page) {
    if (this.currentPage) {
      this.currentPage.exit();
    }
    this.currentPage = page;
    if (this.currentPage) {
      this.currentPage.enter();
    }
  }

  update() {
    if (this.currentPage && typeof this.currentPage.update === 'function') {
      this.currentPage.update();
    }
  }

  draw() {
    if (this.currentPage) {
      this.currentPage.draw();
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }
}