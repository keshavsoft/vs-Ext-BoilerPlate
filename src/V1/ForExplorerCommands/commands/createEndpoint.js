import { startOrchestration } from '../../CommonCommands/CreateEndpoint/orchestration/startOrchestration.js';

export function createEndpointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};