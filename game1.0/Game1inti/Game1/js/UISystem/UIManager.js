import { UIPanel } from "./UIPanel.js";

const panelMap = {
    //main panel
    "min-btn-start": "#level-select-panel-template",
    "min-btn-setting": "#setting-panel-template",
    "min-btn-credits": "#credits-panel-template",

    //setting panel
    "setting-btn-back": "#main-panel-template",

    //credits panel
    "credits-btn-back": "#main-panel-template",

    //level select panel
    "level-select-btn-back": "#main-panel-template",
    "level-select-btn-level1": "#game-area-template",
    "level-select-btn-level2": "#game-area-template",

    //game panel
    "game-btn-back": "#level-select-panel-template",
}

export class UIManager {//改成pages
    constructor() {
        this.currentUI = new UIPanel("#main-panel-template");
        this.currentUI.mount();
        this.levelManager = null;
    }

    switchUIPanel(btnId) {
        if(this.currentUI) {
            this.currentUI.unmount();
            this.currentUI = null;
        }
        
        //switch panel
        this.currentUI = new UIPanel(panelMap[btnId]);
        this.currentUI.mount();

        //if game panel, load game
        if (btnId.startsWith("level-select-btn-level")) {
            const levelNum = parseInt(btnId.replace("level-select-btn-level", ""), 10);
            eventBus.publish("startLevel", levelNum);
        }
    }
}