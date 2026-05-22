import * as vscode from 'vscode';

export async function askFix(target) {
    return vscode.window.showInformationMessage(
        `Missing ${target}.listen`,
        'Fix Now'
    );
};
