# Test Kitchen

Describe any dish and Claude develops a full recipe: weighed ingredients, doneness cues, chef's notes, swaps and a rough nutrition estimate.

**Athlete diet mode:** enter your sport, position, age, weight, training load and season, and Claude builds a daily fueling plan. You get calorie and macro targets, what to eat before, during and after training, sample meals for training, game and rest days, hydration tips and a grocery list. Any meal turns into a full recipe with one tap. Plans for athletes under 18 never include calorie cutting or supplements. Change the servings and every quantity rescales. You can switch between US and metric units, run timers on the steps, and ask for changes in plain words ("make it vegetarian").

Live version (full AI features): https://claude.ai/artifact/ES56QVvN9pjXCN2agBTytx

Demo on GitHub Pages: https://ewantait813-svg.github.io/recipie-generator/

**Settings:** the gear button opens a settings panel. It has light, dark and system themes, six accent colors, text size, units, timer sound, a compact layout, reduced motion, which mode the page opens to, and buttons to reset settings or clear the recipe box.

## How it works

`index.html` is a single self-contained page. It asks Claude for recipes through the claude.ai Artifact runtime (`window.claude.use("sample")`). The AI features only work when the page is opened as a claude.ai artifact. Opened anywhere else, such as GitHub Pages or a local file, the page shows the example recipe and the cooking tools, plus a note linking to the claude.ai version, but it can't develop new recipes.

Every recipe and plan has **Print** (a clean, ink-friendly layout) and, in browsers that support it, **Keep screen on** so your phone doesn't lock mid-recipe.

Saved recipes are kept in your browser's local storage.
