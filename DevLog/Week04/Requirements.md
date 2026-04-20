# Week 04 Tasks: Requirements Analysis

<br>

## Skateholders

### **1. Players**

- **pro player** 

    The people who is extremely skilled, professional, and highly experienced at playing video games.

- **New player**

    The people who is not good at playing games.

- **Potential Playerr**

    The people who care about the first impression, how easy it is to pick up, and performance.
- **normal player**
    The people who are average.

### **2. Designers**

- **lever designer**

- **ui designer**

- **art designer**

- **story designer**

### **3. Developer(Coder)** 

The people who focuses on the implementation and smooth execution of core functionalities, as well as maintainability, scalability, and debugging efficiency.

### **4. Tester**

### **5. lecturer/TA**

### **6. Competitor**

### **7. Community member**

### **8. Software Engineering Module**

### **9. Platform：p5js**

### **10. Market-Related Personnel**

* **Marketing Specialist**

  A professional who creates differentiated promotional content and activities, drives user conversion, and strengthens brand awareness.

* **Market Researcher**

  A professional who conducts user and market research, mines demand pain points, analyzes competitive patterns, and provides data support for decision-making.

* **Promotion Specialist**

  A professional who selects appropriate channels to reach target audiences, expands user coverage, and reduces customer acquisition costs through multi-dimensional promotion.


<br>

## Epics and User Stories

### **Players**
#### pro player
* **Hidden Easter Eggs & Secret Challenges** - As a hardcore player, I hope levels hide in-depth secret content (e.g., "reverse time-space" mechanics, secret passages requiring 10+ recording segments for collaboration). This lets me repeatedly explore, deconstruct rules, and unlock exclusive achievements and the "Time-Space Master" title, gaining a sense of exclusive honor.

* **Extreme Difficulty Levels & Global Leaderboards** - As a hardcore player, I crave ultra-hardcore levels (no hints, complex nested terrain, millisecond-precision action prediction) paired with real-time global leaderboards. This allows me to compete with top players worldwide in clear time and recording counts, striving for the "optimal solution" throne to showcase my dual prowess in skill and strategy.

* **Unlimited Multi-Segment Recording & Chain Collaboration** - As a hardcore player, I want the game to lift recording limits and support the coexistence of multiple "Past Selves." This way, I can design "time-space chain strategies" (e.g., three versions of myself from different timelines laying the groundwork and assisting in relay) to overcome extreme terrain and savor the thrill of meticulous planning.

* **Custom Level Editor & Community Competition** - As a hardcore player, I want a fully functional level editor (custom terrain, platforms, checkpoints) that supports uploading and sharing user-created levels. This enables me to craft ultra-difficult challenge maps, compete with fellow hardcore players in the community, and extend the game's lifespan indefinitely through shared puzzle-solving ideas.
#### New Player

- **Gradual Onboarding Tutorial** - As a new player, I want the game to provide a beginner‑friendly tutorial so that I can quickly understand the core gameplay.  
- **Clear Guidance When Lost** - As a new player, when I get lost or don’t know what to do next, I want to tap a hint button so the game can guide me to the next objective.
- **Immediate Action Feedback** - As a new player, I want the game to give me immediate feedback on my actions so that I feel encouraged and motivated to continue.  
- **Motivational Rewards After Levels** - As a new player, when I finish a level and start feeling tired or bored, I want the game to reward me with items such as skins, tools, or achievements so that I stay motivated to continue playing.
#### Potential Player

- **Visual Hook** - As a potential player looking for a new game, I want to see a vibrant and dynamic cover art, so that my curiosity is sparked and I am encouraged to click through. The color scheme of the cover art must remain consistent with the in-game UI to create a unified brand identity.
- **Catchy Title and Slogan** - As a potential player, I want to see a unique, memorable game title and a concise gameplay description, so that I can instantly understand what makes this game unique. Must include a "Hook Line" (under 20 words) that highlights the core challenge (e.g., "The ultimate one-life challenge").
- **Superior Game Performance** - As a potential player, I want the game to load quickly within the p5.js web environment, so that I don't lose interest due to long wait times. When running on mainstream browsers (Chrome/Edge), the frame rate (FPS) must remain stable at approximately 60 FPS.

#### Normal Player

* **Game Balance & Difficulty Adjustment（游戏平衡与难度调整）** - As a normal player, I want the game difficulty to increase smoothly over time (not in sudden spikes), so that the challenge feels fair and I stay motivated to continue playing.
* **Intuitive Operation & UI Design（直观操作与界面设计）** - As a normal player, I want the game’s control layout (movement, jump, record) and UI elements (recording status, hints) to be intuitive and easy to understand, so that I can master basic operations without complicated learning.
- **Technical Implementation & Stability** - As a normal player, I want the game to run smoothly without lag or unexpected crashes, so that I can focus on gameplay rather than technical issues.  
- **Game Balance & Difficulty Adjustment** - As a normal player, I want the game difficulty to increase smoothly over time (not in sudden spikes),so that the challenge feels fair and I stay motivated to continue playing.

### **Designers**
- **Core Gameplay Mechanics** - As a game designer, I want configurable max recording attempts and duration parameters so that the recording mechanic adapts to puzzle complexity across different difficulty levels and follows the "one mechanic per level" design concept.
- **Core Gameplay Mechanics** - As a UI designer, I want visual recording status controls (recording/ended/remaining attempts) for players, so that they can intuitively grasp core recording info and avoid operational mistakes.
- **Level & World Design** - As a game designer, I want to design and iterate on level mechanisms (e.g. recording & replaying, collaborative puzzle-solving, the upside down world) with clear difficulty curves and unique fun points, So that the game maintains player engagement through a smooth learning experience and innovative gameplay.
- **Enemy Design** - As an art designer, I want to design scene atmosphere effects for high-difficulty challenge levels (such as dark tones and smoke effects), so that I can create a tense challenge atmosphere and enhance the sense of immersion for players.
- **Game Balance** - As a game designer, I want to balance the correlation between the number of recording attempts and level difficulty, so that the game can avoid being overly hard due to too few recording attempts or losing puzzle-solving challenge due to an excessive number of them.

### **Developer(Coder) - Robust Game Framework & Debugging System**
- **Code Modularity** - As a coder, I want to build a class-based modular entity system, so that I can add new enemies or power-ups without breaking the existing logic. All game objects (e.g., Player, Enemy) must be encapsulated in separate .js files and invoked by the main script.
- **Real-time Debugging Tools** - As a coder, I want a toggleable "Debug Mode" that displays hitboxes, so that I can precisely fine-tune the physical collision logic. When Debug Mode is active, the console must output the player's current coordinates (x, y) in real-time.

### **Tester**
- **Debug Tools for Efficient Testing** - As a tester, I want the development team to provide essential debug tools so that I can efficiently test complex scenarios.  
- **Complete Flowcharts and User Paths** - As a tester, I want access to complete flowcharts and user paths so that I can ensure every branch and scenario is fully covered during testing.
- **Bug Reports with Reproduction Steps** - As a tester, I want every bug report to include clear reproduction steps so that I can quickly verify whether the issue exists and confirm whether it has been fixed.

### **Community member**
- **Player Feedback** - As a game community member, I want to set up a dedicated section for player experience feedback on the community, so that players can focus on posting and discussing game experience issues, and the development team can easily view and collect such feedback.
- **Level & World Design** - As a game community member，I want to share my custom level solutions, replay clips of collaborative gameplay with "past me", and participate in community-themed challenges, So that I can interact with other players, showcase my strategic thinking, and extend the game’s playability through community content.

### **platform：p5js**  
- **Technical Implementation & Stability** - As the p5.js platform, I want the game logic and rendering to be implemented efficiently within the p5.js framework, so that the game can run reliably in a web browser environment.
- **Game Balance & Difficulty Adjustment** - As the p5.js platform, I want game difficulty to be controlled through adjustable parameters (e.g., movement speed, obstacle frequency, timing limits), so that balance changes can be made without rewriting core game logic.

### **Market-Related Personnel**

#### Marketing Specialist

* **Differentiated Brand Messaging** - As a marketing specialist, I want to craft core promotional slogans and content around the "self-collaboration" mechanic, so that the game’s unique selling point is clearly communicated to target audiences and stands out from competitors.

* **Tiered Marketing Content Creation** - As a marketing specialist, I want to produce tailored content for new players (tutorial highlights, reward previews) and hardcore players (challenge clips, hidden easter eggs), so that different user groups are attracted by content that matches their interests.

* **Brand Image Consistency** - As a marketing specialist, I want all promotional materials (posters, videos, social media posts) to align with the game’s UI color scheme and "self-breakthrough" theme, so that a unified and memorable brand identity is built.

* **Conversion-Driven Campaigns** - As a marketing specialist, I want to design campaigns like "first recording challenge" or "level clearance lottery" with exclusive skins/achievements as rewards, so that potential users are motivated to try the game and convert into active players.

#### Market Researcher

* **User Demand Mining** - As a market researcher, I want to conduct targeted surveys on new players (tutorial usability, hint function satisfaction) and hardcore players (level difficulty feedback, UGC editor needs), so that user pain points are identified to guide game optimization.

* **Competitive Landscape Analysis** - As a market researcher, I want to analyze core mechanics, target audiences, and marketing strategies of competing 2D platformer games, so that the game’s unique adv

  ntages are highlighted and market positioning is refined.a

* **Market Trend Tracking** - As a market researcher, I want to monitor growth trends of web-based games and puzzle genres, so that feasible operation models (e.g., UGC ecology, cross-circle promotion) are proposed to support long-term game development.

* **User Retention Analysis** - As a market researcher, I want to track retention rates, active durations, and core function usage of different user groups, so that key factors influencing user retention are identified to inform marketing and product adjustments.

#### Promotion Specialist

* **Precise Channel Selection** - As a promotion specialist, I want to select channels like short video platforms (for casual users) and game communities (for hardcore players) based on user portraits, so that target audiences are reached efficiently with lower customer acquisition costs.

* **Lightweight Promotion Adaptation** - As a promotion specialist, I want to create 15-30 second short videos highlighting "no download, fast loading, stable 60FPS", so that potential users are encouraged to click and try the game in 信息流 (feed) ads.

* **KOL Collaboration** - As a promotion specialist, I want to partner with puzzle game KOLs and UGC creators to launch custom level contests or clearance strategy events, so that the game’s influence is expanded through influencer audiences.

* **Promotion Effect Optimization** - As a promotion specialist, I want to track click-through rates, conversion rates, and customer acquisition costs of different channels, so that high-performance channels are prioritized and promotional materials are optimized for better results.

<br>

## Reflection

As we progressed with our game, our team applied epics, user stories, and acceptance criteria to side-scrolling platformer puzzle game built on a "record and replay" mechanic, gaining a clearer understanding of them as practical requirements engineering tools rather than abstract documentation exercises.

At the epic level, we learned how to translate overarching design intentions into strategic goals that guide development decisions. It helped us set objectives such as an accessible onboarding experience, a low-frustration gameplay experience, and mechanic-driven creativity. These macro-themes ensured that individual features remained consistently aligned with the overall player experience, rather than being implemented in isolation. For instance, defining the epic "Zero Frustration, Short Cycles" ensured that even when designing complex levels like the "Upside-Down World," our development focus remained aligned with the core vision of "minimum operation with maximum ingenuity."

User stories, in turn, shifted our focus from mechanic design to experience design. By applying the "As a player, I want to..., so that..." format, we redefined technical concepts—such as recording player actions or limiting the number of replays—into player-centric motivations, such as clarity, satisfaction, and the sense of achievement in cleverly solving problems. This approach also helped us distinguish between novice players, experienced players, and assessors, allowing us to prioritize usability and the learning curve in the early stages. For example, rather than simply coding a clone feature, we defined: "As a player, I want to use my 'past self' as a stepping stone so that I can reach higher platforms." This clarified the practical gameplay value of the cloning mechanic.

Finally, acceptance criteria provided us with the necessary constraints and technical rigor, making our ideas testable and achievable. By using the Given-When-Then structure, we defined testable outcomes for clear time-loop logic. For example: "Given the recording phase has ended, when the replay phase begins, then the 'past self' entity must execute the exact same sequence as the recorded inputs." Translating abstract puzzle concepts into objective, testable requirements effectively prevented scope creep and ensured that our ideas remained technically feasible within the p5.js environment.

In conclusion, this practice demonstrated that requirements methodologies are not constraints on creativity, but rather a systematic framework that helps us transform complex game ideas into coherent, playable experiences with genuine user value.
