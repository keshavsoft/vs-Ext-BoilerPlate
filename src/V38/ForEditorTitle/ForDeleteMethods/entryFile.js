import * as vscode from 'vscode';

import { DATA_SOURCE_STRATEGIES } from './dataSourceStrategies.js';
import { startOrchestration as deletePkCommand } from '../../CommonCommands/ForEndPointsJsFile/Delete/V14/orchestration/startOrchestration.js';
import { startOrchestration as deleteByColumnCommand } from '../../CommonCommands/ForEndPointsJsFile/DeleteByColumn/V16/orchestration/startOrchestration.js';

export async function deleteRegisterCommands({ context, uri }) {

    // get current file uri if not passed
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    const selection = await vscode.window.showQuickPick(
        DATA_SOURCE_STRATEGIES.map(s => s.label),
        { placeHolder: "Select get methods" }
    );

    if (!selection) return;

    const strategy = DATA_SOURCE_STRATEGIES.find(s => s.label === selection);

    return handleStrategy({ strategy, context, uri });
}

async function handleStrategy({ strategy, context, uri }) {

    switch (strategy.id) {

        case "pk": {

            return deletePkCommand({ uri });
        };

        case "query": {

            return deleteByColumnCommand({ uri });
        };

        default:
            vscode.window.showErrorMessage("Unknown strategy");
    };
};


