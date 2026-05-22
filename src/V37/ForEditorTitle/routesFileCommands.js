import * as vscode from 'vscode';

import { addEndPointCommand } from '../CommonCommands/ForRoutesJsFile/AddEndPoint/V2/start.js';
import { addSubRouteCommand } from '../CommonCommands/ForRoutesJsFile/AddSubRoute/V1/start.js';
// import { addTableNameCommand } from '../CommonCommands/ForRoutesJsFile/AddTableName/V2/start.js';

import { addTableNameCommand } from '../CommonCommands/ForRoutesJsFile/AddTableName/start.js';

export function registerAllCommands(context) {
    const addEndPoint = vscode.commands.registerCommand('extension.editor.title.addEndPoint', addEndPointCommand(context));
    const addSubRoute = vscode.commands.registerCommand('extension.editor.title.addSubRoute', addSubRouteCommand(context));
    const addTableName = vscode.commands.registerCommand('extension.editor.title.addTableName',
        addTableNameCommand(context));

    context.subscriptions.push(addEndPoint, addSubRoute, addTableName);
};