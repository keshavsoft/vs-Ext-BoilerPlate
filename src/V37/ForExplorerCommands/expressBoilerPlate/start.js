import * as vscode from "vscode";
import { startOrchestration } from "./orchestration/startOrchestration.js";

export const initFromExpressBoilerPlate = (context) => {
    return async (uri) => {
        await start();

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: "KeshavSoft: Creating Express Boilerplate...",
                cancellable: false
            },
            async (progress) => {
                await run(progress, uri);
            }
        );

        await end(uri);
    };
};

/* ---------- START ---------- */
const start = async () => {
    vscode.window.setStatusBarMessage("KeshavSoft: Starting...", 2000);
};

/* ---------- RUN ---------- */
const run = async (progress, uri) => {
    progress.report({ message: "Processing..." });

    await startOrchestration({ inTargetPath: uri?.fsPath });

    progress.report({ message: "Done" });
};

/* ---------- END ---------- */
const end = async (uri) => {
    const filePath = vscode.Uri.file(`${uri.fsPath}/app.js`);

    const selection = await vscode.window.showInformationMessage(
        "KeshavSoft: Project created",
        "Open app.js"
    );

    if (selection === "Open app.js") {
        try {
            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
        } catch {
            vscode.window.showWarningMessage("app.js not found");
        }
    }
};