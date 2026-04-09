class StaticPageMenu extends PageBase {
  constructor(switcher) {
    super(switcher);

    const playBtn = new ButtonBase('开始游戏', width/2 - 60, height/2, () => {
      console.log('开始游戏按钮点击');
      this.switcher.main.gameSwitcher.loadLevel(1);
    }, 'play-button');
    playBtn.btn.style('font-size', '24px');
    this.addElement(playBtn);
  }

  draw() {
    background(100, 150, 200);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('我的游戏', width/2, height/4);
  }
}