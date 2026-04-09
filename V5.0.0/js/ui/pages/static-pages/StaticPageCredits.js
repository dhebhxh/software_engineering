// pages/StaticPageCredits.js
class StaticPageCredits extends StaticPageBase {
  constructor(switcher) {
    super(switcher);

    // 创建返回按钮
    const backBtn = new ButtonBase('◀', 0.02 * width, 0.03 * height, () => {
      this.switcher.main.staticSwitcher.showMainMenu();
    }, 'back-button');
    backBtn.btn.style('width', 0.030 * width + 'px');
    backBtn.btn.style('height', 0.055 * height + 'px');
    this.addElement(backBtn);
  }

  draw() {
    if (bgImageCredits) {
      image(bgImageCredits, 0, 0, width, height);
    } else {
      background(200, 255, 200);
    }
  }
}