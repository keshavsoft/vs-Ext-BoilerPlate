import * as vscode from 'vscode';

import { startOrchestration } from './V17/orchestration/startOrchestration.js';

export async function filterColumnsCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    return startOrchestration({
        uri
    });
};
