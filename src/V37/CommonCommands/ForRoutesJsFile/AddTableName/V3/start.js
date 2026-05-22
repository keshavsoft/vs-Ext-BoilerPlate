import { startOrchestration } from './orchestration/startOrchestration.js';

export function addTableNameCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};