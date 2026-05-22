# EndPointGen VS Code Extension

## Overview

**EndPointGen** is a Visual Studio Code extension developed by **KeshavSoft** focused on **AI-assisted server-side development using Node.js and Express**.  
It helps developers quickly generate endpoints, sub-routes, and API structure directly from the Explorer context menu.

---

## Demo

![Demo](Docs/Information/demo.gif)

---

## Installation

1. Open VS Code  
2. Go to Extensions  
3. Search: **EndPointGen**  
4. Click Install  

---

## Features

- Generate Express.js API structure instantly  
- Create endpoints in `app.js` with minimal effort  
- Add modular sub-routes in `routes.js`  
- Inject endpoint logic into `.js` files  
- Context-aware right-click actions in Explorer  
- Modular orchestration-based architecture  

---

## Commands

| Command                  | Title             | Description                                               |
|--------------------------|-------------------|-----------------------------------------------------------|
| extension.initJs         | Initiate Node API | Initializes base Express server structure                |
| extension.createEndpoint | CreateEndpoint    | Creates a new route entry in `app.js`                    |
| extension.addSubRoute    | AddSubRoute       | Registers sub-route modules in `routes.js`               |
| extension.addEndPoint    | AddEndPoint       | Injects endpoint logic into selected `.js` file          |

---

## Usage

- Open your Node.js project in VS Code  
- Right-click on a file or folder  
- Select a command from the context menu  
- Extension generates/updates files automatically  

---

## Example

**Before**
```js
// No routes