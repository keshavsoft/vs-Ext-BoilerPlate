import { startOrchestration } from './orchestration/startOrchestration.js';

export function createEndpointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};