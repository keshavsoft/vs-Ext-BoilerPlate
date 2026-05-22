import * as vscode from 'vscode';
import { DATA_SOURCE_STRATEGIES } from './strategies/dataSourceStrategies.js';

import { startOrchestration } from './orchestration/startOrchestration.js';
import { startOrchestration as tableFindOrchestration } from './TableFind/orchestration/startOrchestration.js';

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

async function handleStrategy({ strategy, context, uri }) { // ✅ receive uri
    switch (strategy.id) {
        case "ENV_FILE":
            return startOrchestration({ uri, extensionPath: context.extensionPath });

        case "HARD_CODED_TABLE":
            const table = await vscode.window.showInputBox({ prompt: "Enter table name" });

            return startOrchestration({
                uri,
                instrategy: strategy.id,
                inTableName: table
            });
        case "TABLE_PATH":
            const tablePath = await vscode.window.showInputBox({ prompt: "Enter full table name {Data/tableName.json}" });

            return startOrchestration({
                uri,
                instrategy: strategy.id,
                inTableName: tablePath
            });
        case "AUTO_DETECT":
            return startOrchestration({
                uri,
                instrategy: strategy.id,
                extensionPath: context.extensionPath
            });
        case "TABLE_ROW_FIND":
            const tableFind = await vscode.window.showInputBox({ prompt: "Enter full table name {Data/tableName.json}" });

            return tableFindOrchestration({
                uri,
                inTableFind: tableFind
            });

        default:
            vscode.window.showErrorMessage("Unknown strategy");
    }
};