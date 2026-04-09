class SwitcherStaticPage extends SwitcherBase {
  constructor(mainSwitcher) {
    super(mainSwitcher);
  }

  showMainMenu() {
    const mainMenu = new StaticPageMenu(this);
    this.main.switchToStatic(mainMenu);
  }

  // 可根据需要添加 showSettings, showCredits 等
}