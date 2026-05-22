import * as vscode from 'vscode';

import { initCommand } from './commands/initCommand.js';

export const registerAllCommands = (context) => {
    const init = vscode.commands.registerCommand('extension.initJs', initCommand(context));

    context.subscriptions.push(init);
};
