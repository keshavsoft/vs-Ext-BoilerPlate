import { startOrchestration } from './orchestration/startOrchestration.js';

export function postEndPointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};