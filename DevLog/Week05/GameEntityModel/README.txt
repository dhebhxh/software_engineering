GameModelEntity 部分的主要可调用接口：

1. Player.setController(controller)
    给玩家绑定controller对象，初始化玩家时可调用

2. Player.updateControl()
    从controller读取输入，把输入转换为玩家的运动状态
    会读 left/right/jumpRequested/accelerationX/accelerationY，并直接修改 vx、facing、跳跃状态等

3. Player.interact(target)
    玩家与某个目标交互，target中需要有interact方法

4. Player.startRecord() / Player.stopRecord()
    切换玩家录制状态


5. Clone.setRecordingData(frames)
    给分身设置回放数据，再录制结束后，分身生成前调用
    保存帧数组，重置播放索引

6. Clone.startReplay()
    开始回放分身的行为，录制结束，分身行动开始时调用
    会把分身设置到录制起点，开起isReplaying

7. Clone.stopReplay()
    停止回放


8. Enemy.updateAI(targets)
    敌人自动执行探测目标，追击，巡逻
    targets是可被敌人锁定的一组对象，比如 player 和 clone

9. Enemy.attack(target)
    攻击目标并造成伤害


10. InteractiveObject.interact(actor)
    让某个交互物体被角色触发
    内部会自动检查距离、激活状态、一次性限制等，然后触发 onTrigger(actor)

11. InteractiveObject.activate() / deactivate()
    启用或禁用交互
    满足条件后开放交互或暂时封锁交互


12. PhysicsSystem.apply(entity, dt)
    对实体执行完整的物理更新
    会更新速度、应用重力与摩擦、限制速度，并把速度反映到位置上




    建议：自动拾取道具：碰撞检测
          门，宝箱等需要按键才能互动的：范围检测