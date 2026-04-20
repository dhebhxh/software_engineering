# RecordSystem Module Design Specification

## Module Overview
The `RecordSystem` module is used to implement the Record & Replay mechanism in this project. In the game, players can record a sequence of their own operations, and then generate a "clone" to replay them in the exact same sequence. This mechanism is a crucial core gameplay element of the game's level design.

### 1. Core Gameplay Examples
* **Path Recording**: The player records a movement route.
* **Clone Generation**: A clone is generated during replay to repeat these actions.
* **Cooperative Challenges**: The player character and the clone cooperate to complete mechanism, platforming, or time-based challenges.

### 2. Main Module Functions
1.  **Recording**: Captures the player's control intentions frame by frame.
2.  **Storage**: Saves the operations as a complete `RecordClip` fragment.
3.  **Replay**: Outputs the control intentions in sequence to drive the clone during the replay phase.

---

## Design Goals
* **Frame-by-Frame Recording**: Records operations such as horizontal movement, jumping, facing direction, and interactions at a frame granularity to ensure smooth replay.
* **Fragmented Management**: Each recording is encapsulated as a `RecordClip` object, which includes the starting position, duration, and data array.
* **Sequential Drive**: Strictly outputs `InputFrame data in order during the replay phase.
* **High Cohesion and Low Coupling**: The module is independently responsible for logic and does not involve physics, collision, or rendering.

---

## Core Class Specifications

It is accomplished through the collaboration of four core components, which are responsible for state management, single-frame data, clip storage, and global control respectively.

---

### 1. RecordMode
`RecordMode` is a static enumeration object used to define the operating state of the recording system. It ensures that the system has clear boundaries between recording, replaying, and idle states.

### 2. InputFrame
`InputFrame` is the smallest data unit of the recording system, carrying the character's control intentions at a specific frame; it records "behaviors" rather than "keystrokes".

### 3. RecordClip
`RecordClip` is a data collection container representing a complete process from "pressing record" to "stopping record".
- Data Structure: Internally maintains a frames[] array.
- Spatial Coordinates: Stores startX and startY to ensure that the clone starts replaying from the player's exact starting point at that time, avoiding displacement deviations.

### 4. RecordSystem
`RecordSystem` is the core controller of the entire module (typically used as a singleton in the game), responsible for dispatching all the aforementioned classes.
<br>
Note: RecordSystem also provides stopReplay(), for external systems to terminate the replay prematurely when needed.

- Progress Management: Maintains the replayIndex pointer to control the replay flow.
- Duration Control: Monitors maxDurationMs to prevent the recording data from becoming too large and causing memory overflow.
- Interface Provision: Provides simple start/stop interfaces for the external CharacterController.

## RecordSystem Architecture

### Recording and Replay Pipeline (Overall recording and playback process)

```
Recording Pipeline:

Keyboard / Input Layer
        ↓
Collect player input every frame
        ↓
Generate InputFrame
        ↓
RecordSystem.captureFrame(frame)
        ↓
RecordClip stores frame history


Replay Pipeline:

Keyboard / UI / Game Flow
        ↓
External trigger → RecordSystem.startReplay()
        ↓
(Main loop calls every frame)
RecordSystem.updateReplay()
        ↓
Return InputFrame
        ↓
CharacterController.applyInputFrame(frame, controlledEntity)
        ↓
Physics / Collision / Animation
```
