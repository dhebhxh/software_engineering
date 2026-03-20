import { UIManager } from "./js/UISystem/UIManager.js";
import { EventBus } from "./js/EventSystem/EventBus.js";
import { LevelManager } from "./js/LevelManager/LevelManager.js";

new p5((sketch) => {
  window.sketch = sketch;
  sketch.setup = () => {
    window.UI = new UIManager();
    window.eventBus = new EventBus();
    window.levelManager = new LevelManager();

    //subscribe event
    window.eventBus.subscribe("startLevel", (levelIndex) => window.levelManager.levelEntry(levelIndex));

  };
  
  sketch.draw = () => {
      window.levelManager.update();
  }
});
