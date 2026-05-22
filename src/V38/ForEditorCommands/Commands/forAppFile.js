import { startOrchestration } from '../../CommonCommands/FixCommands/AppJsFile/orchestration/startOrchestration.js';

export function appJsFileCommand(context) {
    return async (uri) => startOrchestration({
        uri: uri || vscode.window.activeTextEditor?.document.uri
    });
};