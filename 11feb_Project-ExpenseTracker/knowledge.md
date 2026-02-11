# Project knowledge

This file gives Codebuff context about your project: goals, commands, conventions, and gotchas.

## Overview
AI-powered Expense Tracker built with Express.js, PostgreSQL (Sequelize), and Google Gemini AI for natural language expense classification.

## Quickstart
- Setup: `npm install`
- Dev: `node app.js` (runs on PORT env var or 3000)
- Test: No tests configured yet

## Environment Variables (required in `.env`)
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` - PostgreSQL connection
- `GEMINI_API_KEY` - Google Generative AI
- `OPENROUTER_API_KEY` - OpenRouter API

## Architecture
- Key directories:
  - `src/controllers/` - Route handlers (expenseController.js)
  - `src/models/` - Sequelize models (expense.js, prompts.js)
  - `src/routes/` - Express routes (expenseRoutes.js)
  - `src/views/` - HTML templates
  - `src/public/css/` - Stylesheets
  - `src/util/database.js` - Sequelize instance
- Data flow: Routes → Controllers → Models (Sequelize) → PostgreSQL

## Conventions
- ES Modules (`"type": "module"` in package.json)
- Express 5.x with async error handling
- Sequelize 6.x for ORM

## Gotchas
- `sequelize.sync({force:true})` in app.js drops all tables on restart - change to `sync()` or `sync({alter:true})` for production
- Some routes in expenseRoutes.js are commented out
- `get404` function is imported but not defined in the current expenseController.js export
