import * as vscode from 'vscode';

import { startOrchestration } from './orchestration/startOrchestration.js';

export function appJsIfEmptyCommand(context) {
    return async (uri) => startOrchestration({
        uri: uri || vscode.window.activeTextEditor?.document.uri,
        context
    });
};