import { startOrchestration } from '../../CommonCommands/ForRoutesJsFile/AddSubRoute/V1/orchestration/startOrchestration.js';

export function addSubRouteCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};