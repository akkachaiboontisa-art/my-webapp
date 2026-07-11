# MathQuest — Agent Guide

## Project

Static HTML/CSS/JS math learning game. No build step, no package manager, no tests.
Deployed to GitHub Pages from `main` branch.

**Files:** `index.html` (markup + inline screen templates), `style.css` (~1180 lines), `script.js` (~1740 lines).
All game logic is in `script.js`. HTML defines screen shells; JS renders content dynamically.
External dependency: MathJax 3 loaded from CDN for rendering math notation in problems.

## Key Architecture

- **Screen router**: `showScreen(id)` hides all `.screen` elements, shows the target, then calls the matching render function (`renderGrades`, `renderTopics`, `renderCards`, `renderProgress`, `refreshHome`).
- **`openGrade(grade)`** sets `currentGrade`, calls `renderTopics()`, then `showScreen("screen-topics")` which calls `renderTopics()` again — this is intentional and harmless. Do NOT remove either call.
- **Card picker flow**: `openCardPicker()` → user picks card → `pickCard()` → `showExplanation()` → answer input or `nextStep()` → `submitAnswer()`.
- **Multi-step explanations**: `appendExplanation()` appends each step's explanation to the `#explanation-steps` container inside `#explanation-box`. Steps accumulate — step 1 stays visible when step 2 is shown. `nextStep()` does NOT hide the explanation box.
- **`currentGrade`**: global var set by `openGrade()`, used by `renderTopics()`. Set it before calling `showScreen("screen-topics")` or `renderTopics()` returns early.
- **`currentProblem`**: global var set by `nextProblem()` via `currentTopic.generate()`. Contains `text` (rendered via `innerHTML` for MathJax), `answer`, and `steps` array.
- **Problem text rendering**: `nextProblem()` sets `problem-text` via `innerHTML` (not `textContent`) and calls `MathJax.typesetPromise()` to render math. Topic problem text can use `$...$` or `\(...\)` for inline math.

## Gotchas

- **Browser caching**: When changing JS/HTML, bump the `?v=N` query on the `<script src="script.js?v=N">` tag in `index.html` to bust cache. Users on GitHub Pages won't see changes without this.
- **No recursion bug**: `showScreen("screen-topics")` must call `renderTopics()`, NOT `openGrade()`. The old version called `openGrade()` from `showScreen()` → `openGrade()` called `showScreen()` → infinite stack overflow.
- **Explanation text**: Never reveal the final answer in explanations. End with a question like "What is the total?" instead of "= 15".
- **Starter cards**: `counting`, `number-recognition`, `comparing` — all users have these. Do not show "You earned a new card!" when completing a starter topic.
- **`gotNewCard` flag**: Use this in `completeTopic()` to avoid showing card-reward for starter topics. Only show when `isNew && !hasCard(currentTopic.cardId)`.
- **Missing card gate**: When user doesn't have the required card for a step, `openCardPicker()` must NEVER show the answer input or "Next Step" button. Only show the explanation + "Earn this card first!" message. Otherwise user can answer without having the card.
- **Own-reward exception**: Almost every topic's steps require the topic's own reward card (e.g. `k-addition` awards "addition" but step requires "addition"). When `step.requiredCard === currentTopic.cardId`, the user must still be able to answer — show the explanation as a hint + answer input, NOT the "Earn this card first!" block.
- **Max attempts**: `nextProblem()` caps at 10 wrong attempts (`problemsAttempted >= 10`) before calling `completeTopic()`. Without this, a user who keeps getting wrong answers would loop forever.

## Deploy

Push to `main` → GitHub Pages auto-deploys. No CI, no build, no preview environments.

## Git

```
git add -A && git commit -m "message" && git push
```
