import { startOrchestration } from './orchestration/startOrchestration.js';

export function addEndPointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};