// whole file is only for Draft 草稿 !!!!!!

// LM调用UI逻辑
gameEnd(resultMsg) {
    this.uiManager.showResult(resultMsg);
}

gameEnd(resultMsg) {
    if (resultMsg === 'win') {
        this.uiManager.changeUI('victory');
    } 
    else if (resultMsg === 'lose') {
        this.uiManager.changeUI('defeat');
    }
}


// LM根据碰撞系统传递的信息改变状态，调用UI
gameEnd (result) {
    if (result === 'win') {
        this.changeState(GameState.LEVEL_COMPLETED);
        this.uiManager.showVictoryMenu();
    } 
    else if (result === 'lose') {
        this.changeState(GameState.GAME_OVER);
        this.uiManager.showDefeatMenu();
    }
}

// 碰撞逻辑传递信息
// 输赢判断：人和地刺碰撞lose、人和门碰撞win分开告诉LM
if (is_collide = true) {
    levelManager.gameEnd('win'); // 告诉你是输了
} else if {
    levelManager.gameEnd('lose');  // 告诉你是赢了
}