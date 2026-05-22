import * as vscode from 'vscode';
import { DATA_SOURCE_STRATEGIES } from './strategies/dataSourceStrategies.js';

import { startOrchestration as tableInsert } from './TableInsert/orchestration/startOrchestration.js';

export async function postEndPointCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    const selection = await vscode.window.showQuickPick(
        DATA_SOURCE_STRATEGIES.map(s => s.label),
        { placeHolder: "Select data source strategy" }
    );

    if (!selection) return;

    const strategy = DATA_SOURCE_STRATEGIES.find(s => s.label === selection);

    return handleStrategy({ strategy, uri }); // ✅ pass uri
};

async function handleStrategy({ strategy, uri }) { // ✅ receive uri
    switch (strategy.id) {
        case "TABLE_INSERT":
            const tableFind = await vscode.window.showInputBox({ prompt: "Enter full table name {Data/tableName.json}" });

            return tableInsert({
                uri,
                instrategy: strategy.id,
                inTableName: tableFind
            });
        default:
            vscode.window.showErrorMessage("Unknown strategy");
    }
};