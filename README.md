# Test Kitchen

Search for any dish and get a real recipe from the web, with photos, the original source and video links, step timers, unit conversion and a recipe box. Recipes come from [TheMealDB](https://www.themealdb.com), a free recipe library. Search by dish name or by an ingredient you have, and filter for vegetarian or vegan.

**Athlete diet mode:** enter your sport, position, age, weight, training load and season, and Claude builds a daily fueling plan. You get calorie and macro targets, what to eat before, during and after training, sample meals for training, game and rest days, hydration tips and a grocery list. Any meal turns into a full recipe with one tap. Plans for athletes under 18 never include calorie cutting or supplements. Change the servings and every quantity rescales. You can switch between US and metric units, run timers on the steps, and ask for changes in plain words ("make it vegetarian").

Live version (full AI features): https://claude.ai/artifact/ES56QVvN9pjXCN2agBTytx

Demo on GitHub Pages: https://ewantait813-svg.github.io/recipie-generator/

**Settings:** the gear button opens a settings panel. It has light, dark and system themes, six accent colors, text size, units, timer sound, a compact layout, reduced motion, which mode the page opens to, and buttons to reset settings or clear the recipe box.

## How it works

`index.html` is a single self-contained page. Recipe search calls TheMealDB's free public API straight from the browser, so it works anywhere, including GitHub Pages. Athlete diet plans and "Adjust this recipe" ask Claude through the claude.ai Artifact runtime (`window.claude.use("sample")`), so they only work when the page is opened as a claude.ai artifact. There, if the recipe library can't be reached, Claude develops the recipe instead. Opened anywhere else, such as GitHub Pages or a local file, a note links to the claude.ai version for those features.

Every recipe and plan has **Print** (a clean, ink-friendly layout) and, in browsers that support it, **Keep screen on** so your phone doesn't lock mid-recipe.

Saved recipes are kept in your browser's local storage.
