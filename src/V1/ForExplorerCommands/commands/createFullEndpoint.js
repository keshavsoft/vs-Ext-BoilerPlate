import { startOrchestration } from '../CreateFullEndpoint/orchestration/startOrchestration.js';

export function createFullEndpointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};