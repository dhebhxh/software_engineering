# Game Idea 02: Kitten Run!

## Screenshots
*Early prototype sketch showing the core obstacle layout and player character.*
<p align="center">
  <img src="cat.png" alt="Kitten Run prototype screenshot" width="500">
</p>

## Core Concept
**Kitten Run!** is a 2D side-scrolling mini-game inspired by the mechanics of *Flappy Bird*. Players take control of a kitten protagonist, navigating through a hazardous environment to collect rewards while avoiding deadly obstacles.

## Genre
**2D Side-scroller / Casual Action**

## Core Mechanics
* **Automatic Progression**: The map progresses automatically, forcing the player to stay in motion and react quickly.
* **Input-Based Flight**: Players click or tap to control the kitten's vertical movement, mimicking a "flap" to stay airborne against gravity.
- Collection Objective**: The primary goal is to collect small fish scattered throughout the level to increase the score.
* **Obstacle Avoidance**: Players must navigate carefully to avoid touching spikes placed along the top, bottom, and middle of the path.
* **Victory Condition**: Reaching the end of the level triggers a fish flag to rise, signaling a successful mission.

## Player Experience
* **Addictive Loop**: The simple "one-button" control scheme combined with challenging obstacle placement encourages a "just one more try" mentality.
* **Cute Aesthetic**: The contrast between the adorable kitten and the dangerous environment creates a high-stakes but charming atmosphere.
* **Progressive Satisfaction**: Successfully weaving through narrow gaps and seeing the victory flag provides a clear and rewarding sense of achievement.

## Notes / Risks
* **Hitbox Precision**: If the kitten's collision box is too large, players will feel the game is unfair. It is often better to make the hitbox slightly smaller than the actual sprite.
* **Gravity Balancing**: The physics of the "jump" and the speed of the fall are critical. This will require significant "play-testing" to ensure the movement feels responsive.
* **Level Design**: As the game progresses, the spacing between spikes needs to be carefully designed to ensure the level remains beatable while increasing in difficulty.