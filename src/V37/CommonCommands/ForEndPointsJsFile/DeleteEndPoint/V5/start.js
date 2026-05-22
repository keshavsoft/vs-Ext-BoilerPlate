import { startOrchestration } from './orchestration/startOrchestration.js';

export function DeleteEndPointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};