import * as vscode from 'vscode';
import { DATA_SOURCE_STRATEGIES } from './strategies/dataSourceStrategies.js';

import { startOrchestration as tableFindOrchestration } from './TableFind/orchestration/startOrchestration.js';
import { startOrchestration as tableShowAllOrchestration } from './TableShowAll/orchestration/startOrchestration.js';
import { startOrchestration as tableFilterOrchestration } from './TableFilter/orchestration/startOrchestration.js';

export async function getEndPointCommand(context, uri) {
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    const selection = await vscode.window.showQuickPick(
        DATA_SOURCE_STRATEGIES.map(s => s.label),
        { placeHolder: "Select data source strategy" }
    );

    if (!selection) return;

    const strategy = DATA_SOURCE_STRATEGIES.find(s => s.label === selection);

    return handleStrategy({ strategy, context, uri }); // ✅ pass uri
};

async function handleStrategy({ strategy, uri }) { // ✅ receive uri
    switch (strategy.id) {
        case "TABLE_ROW_FIND":
            const tableFind = await vscode.window.showInputBox({ prompt: "Enter full table name {Data/tableName.json}" });

            return tableFindOrchestration({
                uri,
                inTableFind: tableFind
            });
        case "TABLE_ROW_FILTER":
            const tableFilter = await vscode.window.showInputBox({ prompt: "Enter full table name : tableName with out extension(.json is default)" });

            return tableFilterOrchestration({
                uri,
                inTableFind: tableFilter
            });
        case "TABLE_SHOWALL":
            return tableShowAllOrchestration({
                uri
            });

        default:
            vscode.window.showErrorMessage("Unknown strategy");
    }
};