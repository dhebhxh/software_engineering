let scene;

function setup() {
    createCanvas(800, 600);
    background(220);
    home = new Home(700, 80, 50, 70);
    ground1 = new Ground(0, 0, 300, 80);
    ground2 = new Ground(600, 0, 200, 80);
    character = new Character(10, 80, 40, 40);
    platform = new Ground(300, 200, 100, 20);
    cliff = new Cliff(300, 0, 300, 5);
    
    scene = new Scene(character, home, ground1, ground2, platform, cliff);
}

function draw() {
    background(220);

    scene.character.update();
    if(scene.replayer) {
        scene.replayer.update();
    }
    
    scene.collideUpdate();

    scene.draw();
}

