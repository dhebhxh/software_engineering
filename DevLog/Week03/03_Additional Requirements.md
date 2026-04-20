# 🤝 *U help U* — Additional Requirements from Paper Prototype

## 1. High Precision Required for Recorded Actions
During paper‑prototype testing, players quickly discover:

- If the “past self” stands even **one tile off**, the entire solution fails.
- Recorded actions must be **extremely precise**, or the player cannot step, push, or activate objects correctly.

### Additional Requirements:

- **Fast re‑recording** is essential to avoid frustration.
- An **auto‑snap / tolerance system** is needed.

---

## 2. Players Frequently Forget What Their Past Selves Will Do
During testing, players repeatedly ask:

- “What did I record earlier?”
- “When will my past self jump?”
- “Will they block my path?”

### Additional Requirements:

- A **ghost preview** is needed to show upcoming movements.

---

## 3. Complexity Increases Sharply with Multiple Past Selves
When 2–3 clones are involved, players experience:

- Characters blocking each other

### Additional Requirements:

- Levels must **strictly control complexity**.
---

## 4. High Level‑Design Cost
Each level requires:

- Designing action sequences
- Designing cooperative logic
- Designing timing relationships
- Designing tolerance and fail‑safe conditions

### Additional Requirements:
- A **robust internal level editor** is strongly recommended.
- **Automated testing tools** are needed to detect unintended solutions.

---

# 😺 *Kitten Run!* — Additional Requirements from Paper Prototype

## 1. Players Understand the Gameplay Quickly but Also Get Bored Quickly

- The core mechanic is learned in seconds.
- After a few minutes, players feel the experience becomes repetitive.

### Additional Requirements:
- Add **rhythm variations** (speed‑ups, slow‑downs, wind, moving obstacles).
- Add **reward systems** (combo, streak bonuses).
- Add **visual variety** (themes, backgrounds).

---

## 2. Difficulty Tuning Is Hard to Simulate on Paper
Players ask:

- “Is this gap even passable?”
- “How big is the cat’s hitbox?”
- “Is the jump height enough?”

### Additional Requirements:

- Very precise **hitbox design**.

---

## 4. Art Quality Becomes the Core Selling Point
Players say:

- “I’ll play longer if the cat is cute.”
- “If the art is average, the game won’t stand out.”

### Additional Requirements:
- High‑quality, charming art
- Smooth animations
- Cute, responsive sound effects
