let mainSwitcher;
let bgLevel1;

function preload() {
  // 请确保图片路径正确，根据实际位置调整
  bgLevel1 = loadImage('assets/images/bg/level/level1.png');
}

function setup() {
  createCanvas(1280, 720);
  mainSwitcher = new SwitcherMain();
  mainSwitcher.staticSwitcher.showMainMenu();
}

function draw() {
  mainSwitcher.update();
  mainSwitcher.draw();
}