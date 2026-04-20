# Minimal Usage Example (How External Systems Use RecordSystem)

`RecordSystem` module is solely responsible for the **recording and replay logic**，  
while when to trigger a replay and how to apply replay frames to the character are handled by external systems (such as keyboard input, UI controls, or game flow management).

This is the simplest integration example.

---

## Calling Replay in the Main Game Loop

In the main game loop (for example, `update()` or `draw()`), check whether a replay is currently in progress every frame and retrieve the current replay frame.

```javascript
// 示例：在游戏主循环中处理 replay

function updateGame() {

    // 判断当前是否处于回放状态
    if (recordSystem.isReplaying()) {

        // 获取当前回放帧
        const frame = recordSystem.updateReplay();

        // 如果回放尚未结束，则将这一帧应用到角色控制系统
        if (frame !== null) {
            characterController.applyInputFrame(frame, controlledEntity);
        }

    }
}
```

## Triggering Replay via External Input

### Replays are typically triggered by keyboard input, UI buttons, or game flow controls, for example:
```
function keyPressed() {

    // Press P to playback
    if (key === 'P') {
        recordSystem.startReplay();
    }

    // Press R to stop playback early
    if (key === 'R') {
        recordSystem.stopReplay();
    }

}
```

## Design Principles

The RecordSystem module is strictly responsible for:
- recording player input frame-by-frame
- saving recorded clips (RecordClip)
- replaying InputFrames in sequence. 

It does not directly control character movement, physics, or collision systems. These behaviors are the responsibility of external modules (such as CharacterController, Physics, Collision, etc.). 

Thereby ensuring low coupling between modules and keeping the recording and replay system independent and reusable.
