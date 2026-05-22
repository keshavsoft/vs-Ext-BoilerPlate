import * as vscode from 'vscode';

import { appJsFileCommand } from '../CommonCommands/FixCommands/AppJsFile/start.js';

export function registerAllCommands(context) {
    const forAppJs = vscode.commands.registerCommand('extension.forAppJs', appJsFileCommand(context));

    context.subscriptions.push(forAppJs);
};