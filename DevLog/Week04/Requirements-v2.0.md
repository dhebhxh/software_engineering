# User stories for our games:
## Player side:
### 1. Basic game controls:<br>
As a player, I want to move left and right so that I can progress through the level, avoid obstacles, and explore different areas.

As a player, I want to jump so that I can cross gaps, reach higher platforms, and continue through the level.

As a player, I want to explore different platforms and paths so that I can find the correct route and better understand the game environment.

As a player, I want the character to respond smoothly when moving and jumping between platforms so that I can complete exploration and challenges more accurately.

As a player, I want to know immediately when I fail, such as by falling, so that I can quickly learn and improve my next attempt.

As a player, I want to pause or restart the game when needed so that I can adjust my pace, retry the challenge, and have a smoother gameplay experience.

As a player, I want to respawn from a reasonable point after failure so that I do not have to restart everything and can maintain the flow of the game.

As a player, I want clear control instructions at the beginning of the game so that I can quickly understand how to move, jump, and perform basic actions.

As a player, I want to adjust some control keys based on my own preferences so that I can play the game more comfortably.

### 2. Core game mechanics:
As a player, I want to record my movements and actions in a limited time window so that I can consciously create a useful "past self" that will later replay the same input sequence, helping me prepare routes, trigger mechanisms, or provide physical assistance during solving a level. Meanwhile, it also ensures that there are real-time save points, and that you can quickly and easily restart the game if you fail.

As a player, I want the replayed clone to reproduce my recorded input in a stable and predictable way under the same physics rules as the current character. This would allow me to trust my previous recordings and use them as a reliable part of my puzzle-solving strategy, rather than feeling that success depends on randomness or inconsistent system behavior.

As a player, I want to be able to use my clone as a real entity to collaborate with, allowing it to stand on platforms, occupy space, and act as a steppingstone. Therefore, I can combine my past actions with my present movement to overcome obstacles, using game features like gravity full, enemy bounces, etc., to reach otherwise inaccessible areas, and solve time-based puzzles in a creative and satisfying way.

### 3. System-level UI
As a player, I want a clear main menu when I launch the game so that I can easily start a new game, access settings, or view my achievements. 

As a player, I want to access a pause menu during gameplay so that I can take a break or return to the main menu without losing my current game progress. 

As a player, I want a settings menu to adjust audio volume and switch between different languages (e.g., Chinese and English) so that I can customize the game experience to my preference. 

As a player, I want an intuitive navigation system (supporting both mouse and keyboard) so that I can quickly and accurately switch between different UI pages like the "World Selection" or "Settings." 

As a player, I want a dedicated achievement page so that I can track my collection progress and see which special milestones I have completed in the game. 

As a player, I want to choose between "Easy" and "Hard" modes on the world selection screen so that I can adjust the game's challenge to match my current skill level. 

As a player, I want a visible "Back" button on every sub-menu (like Settings or Achievements) so that I can easily return to the previous screen without having to restart the application. 

As a player, I want the UI buttons to change their appearance (like a hover effect) when I move my mouse over them or navigate with a keyboard so that I can clearly see which option I am about to select. 

## Designer side:
As a level designer, I want level layouts and puzzle elements to be easy to modify, so that I can quickly adjust mechanism placement, puzzle flow, and difficulty balance.

As a visual designer, I want interactive mechanisms to have distinct and customisable visual representations, so that players can understand their functions more intuitively.

As a systems designer, I want achievement conditions to be easy to configure, so that new goals and rewards can be added or adjusted efficiently.

As a content designer, I want in-game text and interface text to support simple localisation, so that the game can be adapted for players using different languages.

As a gameplay designer, I want the style and difficulty progression of levels to follow a consistent standard, so that players experience a coherent learning curve throughout the game.

As a UI designer, I want important interactions and mechanism changes to have clear visual feedback, so that players can recognise state changes immediately without relying on explicit tutorials.

## Designer side:
As a developer, I want level-specific logic to remain separate from the core gameplay systems, so that new levels can be introduced without affecting existing mechanics.

As a developer, I want the recording and clone systems to be organised as independent modules, so that the game’s central mechanic can be maintained, reused, and extended more easily.

As a developer, I want reusable game-object structures, so that new entities and mechanics can be added with minimal disruption to the existing codebase.

As a developer, I want physics and collision behaviour to be handled in a clear and modular way, so that related issues can be identified and fixed more efficiently.

As a developer, I want interface logic to remain separated from gameplay logic, so that UI changes do not unintentionally affect the game systems.

As a developer, I want core systems to support structured testing and debugging, so that problems can be discovered earlier and resolved more reliably during development.

As a developer, I want the project to follow a consistent code structure and organisational standard, so that team collaboration and long-term maintenance remain manageable.

# Early-stage epics and user stories and their completion status:
## Players:
### Pro players:
1. *Hidden Easter Eggs & Secret Challenges*: As a hardcore player, I hope levels hide in-depth secret content (e.g., "reverse time-space" mechanics, secret passages requiring 10+ recording segments for collaboration). This lets me repeatedly explore, deconstruct rules, and unlock exclusive achievements and the "Time-Space Master" title, gaining a sense of exclusive honor. <br>**(Partially Completed: Hidden passages are not yet implemented, but the achievement system is in place.)**

2. *Extreme Difficulty Levels & Global Leaderboards*: As a hardcore player, I crave ultra-hardcore levels (no hints, complex nested terrain, millisecond-precision action prediction) paired with real-time global leaderboards. This allows me to compete with top players worldwide in clear time and recording counts, striving for the "optimal solution" throne to showcase my dual prowess in skill and strategy.<br> **(Completed: High difficulty levels and leaderboard features have been implemented.)**

3. *Unlimited Multi-Segment Recording & Chain Collaboration*: As a pro player, I’d like to be able to freely choose the starting position of my ‘past self’ when I begin recording, so that I can flexibly plan the starting point of my clones according to the level’s requirements and design more challenging time-space routes. <br>**(Revised & Completed:The feature allowing players to choose the starting position of their past self has been implemented.)**

4. *Custom Level Editor & Community Competition*: As a hardcore player, I want a fully functional level editor (custom terrain, platforms, checkpoints) that supports uploading and sharing user-created levels. This enables me to craft ultra-difficult challenge maps, compete with fellow hardcore players in the community, and extend the game's lifespan indefinitely through shared puzzle-solving ideas.<br>**(Completed: A functional level editor has been provided.)**

### New Player:
1. *Gradual Onboarding Tutorial*: As a new player, I want the game to provide a beginner‑friendly tutorial so that I can quickly understand the core gameplay.<br>**(Completed: The full onboarding tutorial has been implemented.)**

2. *Clear Guidance When Lost*: As a new player, when I get lost or don’t know what to do next, I want to tap a hint button so the game can guide me to the next objective.<br>**(Completed: Hint button and navigation features are available.)**

3. *Immediate Action Feedback*: As a new player, I want the game to give me immediate feedback on my actions so that I feel encouraged and motivated to continue.<br>**(Completed: Immediate feedback mechanisms (e.g., sound, animation) have been implemented.)**

4. *Motivational Rewards After Levels*: As a new player, when I finish a level and start feeling tired or bored, I want the game to reward me with items such as skins, tools, or achievements so that I stay motivated to continue playing.<br>**(Partially Completed: The achievement system has been added.)**

### Potential Player
1. *Visual Hook*: As a potential player looking for a new game, I want to see a vibrant and dynamic cover art, so that my curiosity is sparked and I am encouraged to click through. The color scheme of the cover art must remain consistent with the in-game UI to create a unified brand identity.<br>**(Completed: Unified cover art and UI visuals have been designed.)**

2. *Catchy Title and Slogan*: As a potential player, I want to see a unique, memorable game title and a concise gameplay description, so that I can instantly understand what makes this game unique. Must include a "Hook Line" (under 20 words) that highlights the core challenge (e.g., "The ultimate one-life challenge"). <br>**(Completed: Level titles have been fully designed.)**

3. *Superior Game Performance*: As a potential player, I want the game to load quickly within the p5.js web environment, so that I don't lose interest due to long wait times. When running on mainstream browsers (Chrome/Edge), the frame rate (FPS) must remain stable at approximately 60 FPS. <br>**(Completed: Loading speed and frame rate performance have been optimized.)**


### Normal Player
1. *Game Balance & Difficulty Adjustment*: As a normal player, I want the game difficulty to increase smoothly over time (not in sudden spikes), so that the challenge feels fair and I stay motivated to continue playing. <br>**(Completed: A smooth difficulty curve has been implemented.)**


2. *Intuitive Operation & UI Design*: As a normal player, I want the game’s control layout (movement, jump, record) and UI elements (recording status, hints) to be intuitive and easy to understand, so that I can master basic operations without complicated learning.<br>**(Completed: Control layout and UI optimizations are complete.)**

3. *Technical Implementation & Stability*: As a normal player, I want the game to run smoothly without lag or unexpected crashes, so that I can focus on gameplay rather than technical issues.<br>**(Completed: Stability and performance have been ensured.)**

## Designer
1. *Core Gameplay Mechanics*: As a game designer, I want configurable max recording attempts and duration parameters so that the recording mechanic adapts to puzzle complexity across different difficulty levels and follows the "one mechanic per level" design concept.<br>**(Completed: Recording parameters are now configurable.)**

2. *Core Gameplay Mechanics*: As a UI designer, I want visual recording status controls (recording/ended/remaining attempts) for players, so that they can intuitively grasp core recording info and avoid operational mistakes.<br>**(Completed: A recording status bar has been implemented to clearly display the current recording state.)**

3. *Level & World Design*: As a game designer, I want to design and iterate on level mechanisms (e.g. recording & replaying, collaborative puzzle-solving, the upside down world) with clear difficulty curves and unique fun points, So that the game maintains player engagement through a smooth learning experience and innovative gameplay.<br>**(Completed: New mechanisms such as circuit triggered doors and switchable traps have been implemented.)**
4. *Enemy Design*: As an art designer, I want to design scene atmosphere effects for high-difficulty challenge levels (such as dark tones and smoke effects), so that I can create a tense challenge atmosphere and enhance the sense of immersion for players. <br>**(Not Completed: Atmosphere and enemy designs for high difficulty levels are still in development.)**

5. *Game Balance*: As a game designer, I want to balance the correlation between the number of recording attempts and level difficulty, so that the game can avoid being overly hard due to too few recording attempts or losing puzzle-solving challenge due to an excessive number of them.<br>**(Completed: Balance adjustments between recording count and difficulty have been completed.)**

## Developer/Coder:
1. *Code Modularity*: As a coder, I want to build a class-based modular entity system, so that I can add new enemies or power-ups without breaking the existing logic. All game objects (e.g., Player, Enemy) must be encapsulated in separate .js files and invoked by the main script.<br>**(Completed: Modular code structure has been implemented.)**
2. *Real-time Debugging Tools*: As a coder, I want a toggleable "Debug Mode" that displays hitboxes, so that I can precisely fine-tune the physical collision logic. When Debug Mode is active, the console must output the player's current coordinates (x, y) in real-time.<br>**(Not Completed: Debug mode and hitbox visualization are still under development.)**

## Tester:
1. *Debug Tools for Efficient Testing*: As a tester, I want the development team to provide essential debug tools so that I can efficiently test complex scenarios.<br>**(Not Completed: Essential debugging tools have not yet been provided.)**

2. *Complete Flowcharts and User Paths*: As a tester, I want access to complete flowcharts and user paths so that I can ensure every branch and scenario is fully covered during testing. <br>**(Completed: Full flowcharts and user paths have been provided.)**

3. *Bug Reports with Reproduction Steps*: As a tester, I want every bug report to include clear reproduction steps so that I can quickly verify whether the issue exists and confirm whether it has been fixed. <br>**(Partially Completed: Bug reports are not yet documented and are currently communicated verbally.)**

## Community Member:
1. *Player Feedback*: As a game community member, I want to set up a dedicated section for player experience feedback on the community, so that players can focus on posting and discussing game experience issues, and the development team can easily view and collect such feedback. <br>**(Not Completed: Community feedback system has not been set up.)**

2. *Level & World Design*: As a game community member，I want to share my custom level solutions, replay clips of collaborative gameplay with "past me", and participate in community-themed challenges, So that I can interact with other players, showcase my strategic thinking, and extend the game’s playability through. <br>**(Not Completed: Community sharing and challenge features are not yet online.)**

## Platform: p5js
1. *Technical Implementation & Stability*: As the p5.js platform, I want the game logic and rendering to be implemented efficiently within the p5.js framework, so that the game can run reliably in a web browser environment. <br>**(Completed: Stable operation within the p5.js environment has been ensured.)**

2. *Game Balance & Difficulty Adjustment*: As the p5.js platform, I want game difficulty to be controlled through adjustable parameters (e.g., movement speed, obstacle frequency, timing limits), so that balance changes can be made without rewriting core game logic.<br> **(Completed: Difficulty can be adjusted through parameters.)**

## Market-Related Personnel

### Marketing Specialist:

1. *Differentiated Brand Messaging*: As a marketing specialist, I want to craft core promotional slogans and content around the "self-collaboration" mechanic, so that the game’s unique selling point is clearly communicated to target audiences and stands out from competitors.<br>**(Completed: Core mechanic focused brand messaging has been established.)**

2. *Tiered Marketing Content Creation*: As a marketing specialist, I want to produce tailored content for new players (tutorial highlights, reward previews) and hardcore players (challenge clips, hidden easter eggs), so that different user groups are attracted by content that matches their interests. <br>**(Completed: Content tailored to different player groups has been produced.)**

3. *Brand Image Consistency*: As a marketing specialist, I want all promotional materials (posters, videos, social media posts) to align with the game’s UI color scheme and "self-breakthrough" theme, so that a unified and memorable brand identity is built.<br>**(Not Completed: Unified visual style for promotional materials is still in production.)**

4. *Conversion-Driven Campaigns*: As a marketing specialist, I want to design campaigns like "first recording challenge" or "level clearance lottery" with exclusive skins/achievements as rewards, so that potential users are motivated to try the game and convert into active players.<br>**(Not Completed: Conversion driven events have not been designed or launched.)**

### Market Researcher:

1. *User Demand Mining*: As a market researcher, I want to conduct targeted surveys on new players (tutorial usability, hint function satisfaction) and hardcore players (level difficulty feedback, UGC editor needs), so that user pain points are identified to guide game optimization. <br>**(Completed: Research on different player groups has been completed.)**

2. *Competitive Landscape Analysis*: As a market researcher, I want to analyze core mechanics, target audiences, and marketing strategies of competing 2D platformer games, so that the game’s unique advantages are highlighted and market positioning is refined. <br>**(Completed: Competitive analysis has been completed.)**

3. *Market Trend Tracking*: As a market researcher, I want to monitor growth trends of web-based games and puzzle genres, so that feasible operation models (e.g., UGC ecology, cross-circle promotion) are proposed to support long-term game development. <br>**(Not Completed: Market trend monitoring mechanisms have not been established.)**

4. *User Retention Analysis*: As a market researcher, I want to track retention rates, active durations, and core function usage of different user groups, so that key factors influencing user retention are identified to inform marketing and product adjustments. <br>**(Not Completed: Retention data tracking and analysis have not yet begun.)**

### Promotion Specialist:

1. *Precise Channel Selection*: As a promotion specialist, I want to select channels like short video platforms (for casual users) and game communities (for hardcore players) based on user portraits, so that target audiences are reached efficiently with lower customer acquisition costs.<br>**(Not Completed: Promotion strategy has not yet been finalized.)**

2. *Lightweight Promotion Adaptation*: As a promotion specialist, I want to create 15-30 second short videos highlighting "no download, fast loading, stable 60FPS", so that potential users are encouraged to click and try the game in feed ads. <br>**(Not Completed: Short promotional videos have not been produced.)**

3. *KOL Collaboration*: As a promotion specialist, I want to partner with puzzle game KOLs and UGC creators to launch custom level contests or clearance strategy events, so that the game’s influence is expanded through influencer audiences.<br> **(Not Completed: No collaborations with KOLs or UGC creators have been established.)**

4. *Promotion Effect Optimization*: As a promotion specialist, I want to track click-through rates, conversion rates, and customer acquisition costs of different channels, so that high-performance channels are prioritized and promotional materials are optimized for better results. <br>**(Not Completed: Tracking and optimization mechanisms for promotional performance have not been established.)**

<br>

**Notice**: With the development of our game, the early-stage user stories may not have been fully completed. However, this does not affect the overall quality of the game
