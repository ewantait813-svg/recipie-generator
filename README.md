# Test Kitchen

Describe any dish and Claude develops a full recipe: weighed ingredients, doneness cues, chef's notes, swaps and a rough nutrition estimate.

**Athlete diet mode:** enter your sport, position, age, weight, training load and season, and Claude builds a daily fueling plan. You get calorie and macro targets, what to eat before, during and after training, sample meals for training, game and rest days, hydration tips and a grocery list. Any meal turns into a full recipe with one tap. Plans for athletes under 18 never include calorie cutting or supplements. Change the servings and every quantity rescales. You can switch between US and metric units, run timers on the steps, and ask for changes in plain words ("make it vegetarian").

Live version: https://claude.ai/artifact/ES56QVvN9pjXCN2agBTytx

## How it works

`index.html` is a single self-contained page. It asks Claude for recipes through the claude.ai Artifact runtime (`window.claude.use("sample")`). The AI features only work when the page is opened as a claude.ai artifact. Opened anywhere else, such as GitHub Pages or a local file, the page shows the example recipe and the cooking tools, but it can't develop new recipes.

Saved recipes are kept in your browser's local storage.
