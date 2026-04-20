每个weekXX的文件夹的README.md是这周具体干了什么  
READ.md需要用到的文件在对应的weekXX中创建对应文件夹  
（例如在第一周README.md中增加图片，则在week01中创建文件夹命名为img）

# "U Help U" System Function Black-Box Testing Report

[Just a demonstration draft, not the final version]
(Black-Box Testing Report)

**Testing Objectives & Methodology**
This test aims to verify the stability and logical correctness of the core mechanisms of "U Help U". The test employs a purely manual black-box testing approach and does not involve underlying code logic. The design of the test cases is primarily based on the following two standard software testing techniques:
* **Equivalence Partitioning:** Divides infinite player operations into several valid and invalid categories to cover the core logic with the minimum number of test cases.
* **Boundary Value Analysis:** Conducts testing against the extreme values set by the system (e.g., the 10-second recording limit, spatial edges), as defects typically occur at these boundaries.

<br>

# Manual Black-Box Test Cases
**Test Case Specifications**

**1. Recording Duration & State Switching Test**
According to the documentation, the maximum recording duration is 10 seconds, and pressing the R key can start, end, or interrupt the recording.
*[Recording & Replay State Machine Test. This module tests the reliability of the core "Explore - Record - Replay" loop.]*

| Test Case ID | Test Scenario Description | Equivalence Class / Boundary Type | Execution Steps (Action/Input) | Expected Output | Actual Result & Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-1.1 | Standard Action Recording & Replay | Valid Equivalence Class | 1. Press R to start recording.<br>2. Control "Present Self" to move and jump for 5 seconds.<br>3. Press R to end recording. | Generates "Past Self" to accurately reproduce the movement and jumping actions within these 5 seconds, and automatically disappears after the replay ends. | "[To be filled] - Pass/Fail" |
| TC-1.2 | Trigger Maximum Recording Duration | Upper Boundary Value | 1. Press R to start recording.<br>2. Continuously operate or idle for more than 10 seconds without pressing any function keys during this period. | Upon reaching the 10-second threshold, the recording system automatically forces an end and immediately switches seamlessly to replay mode. [It can also be considered later whether it is necessary to add features such as allowing the player to decide when to start recording] | "[To be filled] - Pass/Fail" |
| TC-1.3 | Asynchronous Replay Interruption | Valid Equivalence Class | 1. Generate "Past Self" and be in replay state.<br>2. Press the R key before the replay action is completed. | The replay is immediately and forcibly interrupted, the "Past Self" is destroyed, and the system resets to explore mode. | "[To be filled] - Pass/Fail" |
| TC-1.4 | Extreme Frequency State Switching | Stress Boundary Test | 1. Rapidly and continuously double-click or repeatedly tap the R key. | The system can correctly handle high-frequency inputs without causing multiple "Past Self" overlapping generations, and the game screen has no freezing or severe frame rate drops. | "[To be filled] - Pass/Fail" |

**2. Physical Interaction & Collision Test**
This is the core selling point of your game: the two-way mutual stepping and impenetrability of "solid cooperative units".
*[Physics Engine & Collision Detection Test. This module verifies the physical stability of the core differentiating setting of "two-way mutual stepping".]*

| Test Case ID | Test Scenario Description | Equivalence Class / Boundary Type | Execution Steps (Action/Input) | Expected Output | Actual Result & Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-2.1 | Vertical Forward Physical Superposition | Valid Equivalence Class | 1. Record "Past Self" standing still in place.<br>2. During replay, "Present Self" jumps directly above it. | "Present Self" stands firmly on top of "Past Self", the velocity vector is cleared to zero, and there is no vertical clipping or continuous sliding. | "[To be filled] - Pass/Fail" |
| TC-2.2 | Vertical Reverse Physical Superposition | Valid Equivalence Class | 1. Record "Past Self" jumping down from a high platform.<br>2. During replay, "Present Self" stands still directly below its landing point. | "Past Self" falls under the influence of gravity, stands firmly on top of "Present Self", and no clipping occurs for either party. | "[To be filled] - Pass/Fail" |
| TC-2.3 | Horizontal Dynamic Collision Repulsion | Valid Equivalence Class | 1. Record "Past Self" continuously moving to the right.<br>2. During replay, "Present Self" collides head-on from right to left. | When horizontal contact occurs, the collision volumes push each other away (squeeze apart), and overlapping in the horizontal direction is strictly prohibited. | "[To be filled] - Pass/Fail" |
| TC-2.4 | Mid-air Dynamic Collision | Complex Boundary Combination | 1. Record "Past Self" performing a jump in mid-air.<br>2. During replay, "Present Self" simultaneously jumps and physically collides with it in mid-air. | Based on momentum and gravity rules, both parties experience correct physical bouncing or blocking in mid-air, and the falling trajectory is reasonable. | "[To be filled] - Pass/Fail" |

**3. Mid-air Judgment & Gravity Test**
Because the game supports mid-air double jumps? And there are no fixed script positions, it is necessary to verify the accuracy of the physics calculations.
*[Dynamic Environment & Level Objectives Test. This module tests the interaction logic of game elements, especially the interaction with "Time Fragments" and the level endpoints.]*

| Test Case ID | Test Scenario Description | Equivalence Class / Boundary Type | Execution Steps (Action/Input) | Expected Output | Actual Result & Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-3.1 | Loss of Dynamic Terrain Support | Logical Boundary Test | 1. Record "Past Self" jumping onto a certain floating platform.<br>2. During replay, "Present Self" moves or destroys the platform in advance. | "Past Self" cannot step out of thin air on the absolute coordinates at the time of recording, and must naturally fall following real-time physics rules. | "[To be filled] - Pass/Fail" |
| TC-3.2 | Collectible Entity Judgment | Logical Constraint Verification | 1. Control "Present Self" to touch a "Time Fragment".<br>2. Restart, record "Past Self" touching the "Time Fragment". | "Present Self" touching it can successfully collect it and increase the count; when "Past Self" touches it, the fragment should not be collected (or according to your design, both selves can collect it, requiring verification of logical consistency). | "[To be filled] - Pass/Fail" |
| TC-3.3 | Level Endpoint Trigger Judgment | Valid Equivalence Class | 1. Control "Present Self" to reach the green flag/portal position. | Successfully triggers the level settlement screen, records the number of recordings, and unlocks the permission to enter the next level. | "[To be filled] - Pass/Fail" |