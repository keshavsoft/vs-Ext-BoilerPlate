# VS Code Extension – Quick Start

## What this extension does

Helps you quickly **scaffold and organize Node.js + Express server-side endpoints** directly from your project files using AI-assisted commands.

## How to use

1. Open your Node.js project in VS Code  
2. Right-click on a file or folder  
3. Select required action (e.g., **Initiate Node API**, **CreateEndpoint**)  
4. Endpoints, routes, and logic will be auto-created and linked  

## Available Commands

* Initiate Node API → Creates base Express server setup  
* CreateEndpoint → Adds route in `app.js`  
* AddSubRoute → Registers sub-routes in `routes.js`  
* AddEndPoint → Injects endpoint logic into `.js` file  

## Output

* Creates structured API flow (e.g., routes, endpoints)  
* Updates `app.js` and `routes.js` automatically  
* Injects handler logic into target `.js` files  
* Maintains modular Express architecture  

## Fix App.js (Right Click Command) ⭐ NEW

Ensures app.js contains required Express configuration and route registrations.

Useful when:

app.js missing middleware
routes not connected
structure broken
project imported from another source

## How to use

Right-click on app.js
Select:
Fix App.js
## What it updates automatically
* Ensures Express import exists
* Ensures body-parser / json middleware added
* Ensures routes imported correctly