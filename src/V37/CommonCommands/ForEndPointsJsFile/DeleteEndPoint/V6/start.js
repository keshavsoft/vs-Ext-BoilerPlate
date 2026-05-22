import * as vscode from 'vscode';
import path from 'path';
import dotenv from 'dotenv';

import { DATA_SOURCE_STRATEGIES } from './strategies/dataSourceStrategies.js';
import { startOrchestration } from './orchestration/startOrchestration.js';

export async function DeleteEndPointCommand(context, uri) {

    // get current file uri if not passed
    uri = uri || vscode.window.activeTextEditor?.document?.uri;

    const selection = await vscode.window.showQuickPick(
        DATA_SOURCE_STRATEGIES.map(s => s.label),
        { placeHolder: "Select data source strategy" }
    );

    if (!selection) return;

    const strategy = DATA_SOURCE_STRATEGIES.find(s => s.label === selection);

    return handleStrategy({ strategy, context, uri });
}


async function handleStrategy({ strategy, context, uri }) {

    switch (strategy.id) {

        case "ENV_FILE": {

            try {

                // workspace root path (project base folder)
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

                if (!workspaceFolder) {
                    vscode.window.showErrorMessage("Workspace not found");
                    return;
                }

                const rootPath = workspaceFolder.uri.fsPath;

                // .env file path
                const envPath = path.join(rootPath, ".env");

                // load env file
                const result = dotenv.config({ path: envPath });

                if (result.error) {
                    vscode.window.showErrorMessage(".env file not found in project root");
                    return;
                }

                // read TablePath from .env
                const tablePath = process.env.TablePath;

                if (!tablePath) {
                    vscode.window.showErrorMessage("TablePath key missing in .env");
                    return;
                }

                return startOrchestration({
                    uri,
                    instrategy: strategy.id,
                    inTableName: tablePath,
                    extensionPath: context.extensionPath
                });

            } catch (error) {

                vscode.window.showErrorMessage("Error reading .env file");
                console.error(error);
            }
        }


        case "HARD_CODED_TABLE": {

            const table = await vscode.window.showInputBox({
                prompt: "Enter table name"
            });

            if (!table) return;

            return startOrchestration({
                uri,
                instrategy: strategy.id,
                inTableName: table
            });
        }


        case "TABLE_PATH": {

            const tablePathInput = await vscode.window.showInputBox({
                prompt: "Enter full table path (Example: Data/Customers.json)"
            });

            if (!tablePathInput) return;

            return startOrchestration({
                uri,
                instrategy: strategy.id,
                inTableName: tablePathInput
            });
        }


        case "AUTO_DETECT":

            return startOrchestration({
                uri,
                instrategy: strategy.id,
                extensionPath: context.extensionPath
            });


        default:
            vscode.window.showErrorMessage("Unknown strategy");
    }
}