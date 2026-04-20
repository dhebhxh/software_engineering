### Design



---

#### 2. Module Overview

**2.1 Game Entity Model⭐**  
The Game Entity Model defines all in‑game entities, providing unified data structures, shared behaviors, and consistent interfaces for characters, platforms, interactive elements, and more.

**2.2 Switchers⭐**  
The Switcher is a global page‑level state controller that switches between static UI pages and in‑game level pages, forwarding update and draw calls to the currently active page.

**2.3 Level Design⭐**  
The Level Design module defines each level’s structure and runtime behavior through BaseLevel, while the LevelManager handles level loading, unloading, updating, transitions, camera control, and checkpoint‑based respawn.

**2.4 Event System⭐**  
A decoupled messaging layer that allows modules to publish and subscribe to events without direct dependencies.

**2.5 Collision System⭐**  
The Collision System performs collision detection, resolution, and response between entities to ensure correct physical interactions and gameplay behavior.

**2.6 Character Control System⭐**  
The Character Control System processes native browser keyboard events, interprets player intent, validates whether that intent can become an executable action, and converts approved actions into velocity and acceleration updates.

**2.7 Physics System⭐**  
The Physics System updates entity motion by applying velocity and acceleration to produce consistent frame‑based movement.

**2.8 Mechanism System**  
The Mechanism System manages reusable level mechanisms, including circuit‑based linkage that unlocks doors and controllable moving platforms.

**2.9 Record System⭐**  
The Record System is the core gameplay mechanic, responsible for managing recording states, capturing player inputs, and replaying the recorded actions.

**2.10 UI**  
The UI Module manages all interface rendering and interaction logic in the game, including static pages, level pages, UI components, and transition effects. It provides an interface layer independent of game logic, enabling modular organization of page switching, information display, and user interaction.

---

#### 3. System Workflow

**3.1 Startup Sequence**  
The startup sequence begins in `setup()`, where modules initialize their data, register events, and load level definitions.  

**3.2 Frame Update Sequence**  
Each frame is driven by `draw()`, where the Level Manager updates the active level and invokes physics, collision, control, mechanisms, and UI modules.  
