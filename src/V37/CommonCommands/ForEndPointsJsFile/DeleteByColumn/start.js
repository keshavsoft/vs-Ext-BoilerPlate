import * as vscode from 'vscode';

import { startOrchestration } from './V16/orchestration/startOrchestration.js';

export async function deleteCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    return startOrchestration({
        uri
    });
};
