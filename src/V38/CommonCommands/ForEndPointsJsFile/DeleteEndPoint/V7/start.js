import * as vscode from 'vscode';
import { DATA_SOURCE_STRATEGIES } from './strategies/dataSourceStrategies.js';

import { startOrchestration } from './orchestration/startOrchestration.js';

export async function DeleteEndPointCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    const selection = await vscode.window.showQuickPick(
        DATA_SOURCE_STRATEGIES.map(s => s.label),
        { placeHolder: "Select data source strategy" }
    );

    if (!selection) return;

    const strategy = DATA_SOURCE_STRATEGIES.find(s => s.label === selection);

    return handleStrategy({ strategy, context, uri }); // ✅ pass uri
};

async function handleStrategy({ strategy, context, uri }) { // ✅ receive uri
    const tableName = await vscode.window.showInputBox({ prompt: "Enter full table name {Data/tableName.json}" });

    return startOrchestration({
        uri,
        inTableName: tableName
    });

};