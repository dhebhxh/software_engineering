//输入层，意图层，动作层，物理层
class ControlMode {//接口
    eventHandler(event) {//输入层
        //回调方法，接收到浏览器原始事件，返回按下和抬起两个事件
    }

    eventToIntent(processedEvent) {//意图层
        //处理意图冲突比如左右同时按下，返回意图
    }

    intentToAction(intent) {//动作层
        //意图是否能变成真正的动作，比如跳跃受到isOnGround限制
    }

    actionToPhysics(action) {//物理层

    }
}

class BasicControlMode extends ControlMode {//基础控制模式（地面，无惯性），只有具体方法，没有属性
    
    @override
    eventHandler(event) {//输入层
        //回调方法，接收到浏览器原始事件，返回按下和抬起两个事件
    }

    @override
    eventToIntent(processedEvent) {//意图层
        //处理意图冲突比如左右同时按下，返回意图
    }

    @override
    intentToAction(intent) {//动作层
        //意图是否能变成真正的动作，比如跳跃受到isOnGround限制
    }

    @override
    actionToPhysics(action) {//物理层

    }
}

class SwimControlMode extends ControlMode {//游泳控制模式
    
    @override
    eventHandler(event) {//输入层
        //回调方法，接收到浏览器原始事件，返回按下和抬起两个事件
    }

    @override
    eventToIntent(processedEvent) {//意图层
        //处理意图冲突比如左右同时按下，返回意图
    }

    @override
    intentToAction(intent) {//动作层
        //意图是否能变成真正的动作，比如跳跃受到isOnGround限制
    }
    
    @override
    actionToPhysics(action) {//物理层

    }
}