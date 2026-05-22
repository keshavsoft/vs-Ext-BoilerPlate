import { startOrchestration } from './orchestration/startOrchestration.js';

export function addSubRouteCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};