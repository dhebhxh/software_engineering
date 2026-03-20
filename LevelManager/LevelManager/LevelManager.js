// LevelManager/LevelManager.js

class LevelManager {
    /**
     * @param {Array} levels - 所有关卡类的数组，例如 [Level1, Level2]
     * @param {Object} uiManager - UI管理器的实例
     * @param {Object} gameController - 游戏核心逻辑/物理引擎的实例
     */
    constructor(levels, uiManager, gameController) {
        //this.currentState = GameState.MAIN_MENU; 
        
        this.levels = {
            1: Level1,
            2: Level2,

        };             // 关卡图纸库
        this.currentLevelIndex = 0;       // 当前关卡索引
        this.currentLevelInstance = null; // 当前正在运行的关卡实体

        // 记录外部模块的联系方式，方便发号施令
        this.uiManager = uiManager;
        //this.gameController = gameController;
        
        // 记录进入设置页面前的状态（方便关掉设置后退回原来的状态）
        //this.previousState = null; 
    }
    //index: number -> return: void
    loadLevel(index) {
        // 1. 清理内存
        if (this.currentLevelInstance) {
            if (typeof this.currentLevelInstance.destroy === 'function') {
                this.currentLevelInstance.destroy(); 
            }
            this.currentLevelInstance = null;
        }

        // 2. 准备新图纸
        this.currentLevelIndex = index;

        // 3. 实例化
        const LevelClass = this.levels[this.currentLevelIndex];
        if (LevelClass) {
            this.currentLevelInstance = new LevelClass();
            // console.log(`[LevelManager] 关卡 ${index + 1} 实例化成功！`);
        } else {
            console.error(`[LevelManager] 找不到索引为 ${index} 的关卡图纸！`);
        }
    }

    // resultMsg: string -> 
    gameEnd(resultMsg) {
        this.uiManager.changeUI(resultMsg);
    }
    // ==========================================
    // 1. 核心状态流转
    // ==========================================
    
    // p5.js 的 draw() 每帧都会调用这个方法
    update() {
        this.currentLevelIndex.updatePhysics();
        this.currentLevelIndex.updateCollision();
        this.currentLevelIndex.updateDraw();
    }
}
    // 内部方法：安全地切换状态
    // changeState(newState) {
    //     this.currentState = newState;
    //     console.log(`[LevelManager] 状态已切换为 -> ${newState}`);
    // }

    // ==========================================
    // 2. 游戏中途调度 (供全局或UI调用)
    // ==========================================

    // 处理 Esc 键按下
    // togglePause() {
    //     if (this.currentState === GameState.PLAYING) {
    //         this.changeState(GameState.PAUSED);
    //         this.uiManager.showPauseMenu(); // 命令 UI 弹菜单
    //     } else if (this.currentState === GameState.PAUSED) {
    //         this.resumeGame();
    //     }
    // }

    // // 继续游戏 (UI 点击继续时调用)
    // resumeGame() {
    //     this.changeState(GameState.PLAYING);
    //     this.uiManager.hideMenus(); // 命令 UI 收起菜单
    // }

    // 打开设置
    // openSettings() {
    //     this.previousState = this.currentState; // 记住是从哪里进来的
    //     this.changeState(GameState.SETTINGS);
    //     this.uiManager.showSettingsMenu();
    // }

    // // 关闭设置
    // closeSettings() {
    //     this.changeState(this.previousState); // 退回之前的状态
    //     // UI 逻辑：如果退回的是 PAUSED，就让 UI 显示暂停菜单；如果是主菜单，就显示主菜单
    //     if (this.currentState === GameState.PAUSED) {
    //         this.uiManager.showPauseMenu();
    //     } else if (this.currentState === GameState.MAIN_MENU) {
    //         this.uiManager.showMainMenu();
    //     }
    // }

    // ==========================================
    // 3. 关卡与生命周期调度
    // ==========================================

    // 接收游戏胜负结果


    // 核心载入逻辑 

    // 下一关
    // nextLevel() {
    //     if (this.currentLevelIndex < this.levels.length - 1) {
    //         this.loadLevel(this.currentLevelIndex + 1);
    //         this.changeState(GameState.PLAYING);
    //         this.uiManager.hideMenus();
    //     } else {
    //         console.log("[LevelManager] 已经是最后一关了，游戏通关！");
    //         // 这里可以调用 uiManager 显示总通关画面
    //     }
    // }

    // 重新开始当前关卡
    // restartLevel() {
    //     this.loadLevel(this.currentLevelIndex); // 原地重新加载
    //     this.changeState(GameState.PLAYING);
    //     this.uiManager.hideMenus();
    // }

    // 退出到主菜单
    // quitToMainMenu() {
    //     // 清理当前关卡
    //     if (this.currentLevelInstance && typeof this.currentLevelInstance.destroy === 'function') {
    //         this.currentLevelInstance.destroy();
    //     }
    //     this.currentLevelInstance = null;
        
    //     this.changeState(GameState.MAIN_MENU);
    //     this.uiManager.showMainMenu();
    // }


    //------------
import { Level1, Level2 } from "./Level.js";

export class LevelManager {
    constructor() {
        //用于获取创建某一个关卡所需的类
        this.levelMap = {
            1: Level1,
            2: Level2,
        }
        this.currentLevelIndex = -1;
        this.currentLevel = null;
    }

    loadLevel(index) {
        
        this.currentLevelIndex = index;

        const LevelClass = this.levelMap[this.currentLevelIndex];
        
        if(LevelClass) {
            this.currentLevel = new LevelClass();
        }
    }

    unloadLevel() {
        if(this.currentLevel) {
            if (typeof this.currentLevel.destroy === 'function') {
                this.currentLevel.destroy(); 
            }
            this.currentLevelIndex = -1;
            this.currentLevelInstance = null;
        }
    }

    onLevelFinish(result) {
        this.unloadLevel();
        
        
    }

    //每秒60次
    update() {
        if(this.currentLevel) {
            // this.flipY();// every frame flip y axis
            // this.currentLevel.clearCanvas();
            this.currentLevel.updatePhysics();
            this.currentLevel.updateCollision();
            this.currentLevel.draw();
        }
    }
}