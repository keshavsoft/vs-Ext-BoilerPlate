import * as vscode from 'vscode';

import { getWebviewContent } from '../../../ui/getWebviewContent.js';

import { createEndpointCommand } from '../CommonCommands/CreateEndpoint/start.js';

export function registerAllCommands(context) {
    const CreateEndpoint = vscode.commands.registerCommand('extension.editor.title.appjs.startEndpoint', createEndpointCommand(context));
    const wizard = vscode.commands.registerCommand('extension.wizard.appjs', () => {

        const panel = vscode.window.createWebviewPanel(
            'ui',
            'Schema Tool',
            vscode.ViewColumn.Beside, // 🔥 IMPORTANT
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        panel.webview.html = getWebviewContent(context, panel);

        panel.webview.onDidReceiveMessage(async (message) => {
            // await handleMessage(message, context, panel);
        });

        // sendInitialState(panel);
    });

    context.subscriptions.push(CreateEndpoint, wizard);
};