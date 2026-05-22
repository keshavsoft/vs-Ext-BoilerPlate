import * as vscode from 'vscode';

import { startOrchestration } from './V1/orchestration/startOrchestration.js';

export async function alterCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    return startOrchestration({
        uri
    });
};
