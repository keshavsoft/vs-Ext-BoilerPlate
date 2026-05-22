import * as vscode from 'vscode';

import { startOrchestration } from './orchestration/startOrchestration.js';

export function appJsFileCommand(context) {
    return async (uri) => startOrchestration({
        uri: uri || vscode.window.activeTextEditor?.document.uri,
        context
    });
};