import * as vscode from 'vscode';

// import { createEndpointCommand } from '../CommonCommands/CreateEndpoint/start.js';
import { appJsIfEmptyCommand } from '../CommonCommands/ForAppJsFile/IfEmpty/V1/start.js';
import { appJsFileCommand } from '../CommonCommands/ForAppJsFile/FixFromRules/V1/start.js';

import { registerAllCommands as endpointCommands } from "./endpointCommands.js";
import { registerAllCommands as routesFileCommands } from "./routesFileCommands.js";
import { registerAllCommands as appJsFileCommands } from "./appJsFileCommands.js";

export function registerAllCommands(context) {
    // const CreateEndpoint = vscode.commands.registerCommand('extension.editor.title.createEndpoint', createEndpointCommand(context));
    const fixAppJs = vscode.commands.registerCommand('extension.fixAppJs', appJsFileCommand(context));
    const appJsIfEmpty = vscode.commands.registerCommand('extension.ifEmptyAppJs', appJsIfEmptyCommand(context));

    context.subscriptions.push(fixAppJs, appJsIfEmpty);

    appJsFileCommands(context);
    routesFileCommands(context);
    endpointCommands(context);
};