import * as vscode from 'vscode';

import { DATA_SOURCE_STRATEGIES } from './dataSourceStrategies.js';
import { insertCommand } from '../../CommonCommands/ForEndPointsJsFile/Insert/start.js';

export async function postRegisterCommend(context, uri) {
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

        case "Insert": {

            return insertCommand(context, uri);
        };

        default:
            vscode.window.showErrorMessage("Unknown strategy");
    };
};


