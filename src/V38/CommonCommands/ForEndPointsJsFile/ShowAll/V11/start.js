import * as vscode from 'vscode';

import { startOrchestration as tableShowAllOrchestration } from './TableShowAll/orchestration/startOrchestration.js';

export async function showAllCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    return tableShowAllOrchestration({
        uri
    });
};
