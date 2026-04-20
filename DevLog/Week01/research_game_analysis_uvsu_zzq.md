# UVSU – Research Game Analysis

**Tagline**  
*Outsmart your past self in a battle of cause and effect.*  
Explore an interconnected clay world, uncover its hidden rules, and reveal the secrets it would rather keep buried.

---

## 1. Core Player Mechanics

### 1.1 Movement (2D Side-Scrolling, Gravity-Based)
- **Horizontal movement:** A/D or ←/→  
  Fixed speed (no walk/run states).
- **Acceleration / deceleration:** None.
- **Movement constraints:**
  - Terrain collision (walls, obstacles)
  - Screen-edge wrap (player can exit the screen horizontally)

### 1.2 Jumping (Platforming Core)
- **Input:** Space or Z
- **Variable jump height:**
  - Short press → low jump
  - Long press → high jump
- **Physics:**
  - Gravity affects player continuously
  - Falling speed > rising speed (accelerated fall)
- **Restrictions:**
  - No infinite jumps (no double-jump)

---

## 2. Interaction Systems

### 2.1 Environmental Interaction
- **Switches:**
  - Triggered by stepping on or shooting
  - Affect the environment (doors, platforms, hidden paths)
- **Doors:**
  - Opened by pressing **A** after required items are collected

### 2.2 Combat Interaction
- **Basic attack:**
  - Press **X** to fire an arrow
  - Arrow travels in the facing direction
  - Arrow persists until reaching map boundary
  - Can activate off-screen mechanisms

### 2.3 Death & Respawn
- **Death trigger:** Contact with traps (instant death)
- **Feedback:** Death animation (collapse, flicker)
- **Respawn:** Automatic respawn at the nearest checkpoint

---

## 3. Resources & Economy (Single-Player, p5.js Variable/Array Driven)

### 3.1 Resource Types

#### Basic Resources
- **Health (HP):**
  - One-hit death upon trap contact
  - Immediate respawn nearby
- **Keys / Items:**
  - Used for unlocking doors, chests, or progression
  - One-time use
  - Visually orbit around the player after pickup

#### Special Resources
- **Map knowledge:**
  - Press **Tab** to view explored areas
  - Unexplored regions remain hidden (black)

### 3.2 Resource Acquisition
- **Combat:**
  - Killing enemies (past versions of the player) grants keys
- **Exploration:**
  - Chests (require keys)
  - Hidden areas
  - Breakable objects (crates, jars)
- **Puzzle interaction:**
  - Certain keys are only obtained by shooting mechanisms

---

## 4. Progression & Pacing

### 4.1 Character Progression
- **No stat upgrades or abilities**
- Progression is knowledge- and puzzle-based

### 4.2 Content Progression
- **World structure:**
  - Semi-linear open world
  - Areas initially locked, unlocked via keys
  - Frequent backtracking encouraged
- **Difficulty curve:**
  - Early game: simple traps, single-step mechanisms
  - Mid game: layered puzzles
  - Late game: complex cause–effect chains involving past selves

---

## 5. Level & Environment Design

### 5.1 Terrain & Platforms
- Static platforms
- Disappearing / appearing platforms triggered by switches
- Instant-death hazards

### 5.2 Visual & Environmental Effects
- **Parallax backgrounds:** 2–3 scrolling layers
- **Ambient interactions:**
  - Background eyes track the player
  - Grass and plants animate when passed

---

## 6. Enemies & AI

### 6.1 Enemy Concept
- **Primary enemy:** Past versions of the player character

### 6.2 AI Logic
- No traditional AI
- Enemy behavior is a replay of the player’s previous actions
- Creates a deterministic cause–effect challenge rather than reactive combat

---

## 7. Randomness & Probability
- **None**
- All systems are deterministic to reinforce cause-and-effect gameplay

---

## 8. Core Gameplay Loop

**Move / Jump → Avoid traps → Trigger mechanisms → Confront past self → Obtain keys → Unlock new areas → Encounter more complex puzzles**

---

## 9. Player Experience Design

### 9.1 Flow Control
- Gradual introduction of mechanics
- Clear escalation in puzzle complexity

### 9.2 Feedback Systems
- **Visual:**
  - Rotating animation when killing a past self
  - Key unlock animations
- **Audio:**
  - Jump, attack, death, and item pickup sound effects

### 9.3 Forgiveness & Accessibility
- Instant respawn
- Minimal punishment for failure
- Encourages experimentation and learning through repetition

---

## 10. Why UVSU Is Inspiring
- Innovative use of **self-as-enemy** instead of traditional AI
- Strong emphasis on **deterministic systems and causality**
- Combines platforming, puzzles, and narrative through mechanics rather than dialogue
- Well-suited as a reference for time-based or replay-driven game design

