import * as vscode from 'vscode';

import { startOrchestration } from './V4/orchestration/startOrchestration.js';

export async function insertCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    return startOrchestration({
        uri
    });
};
