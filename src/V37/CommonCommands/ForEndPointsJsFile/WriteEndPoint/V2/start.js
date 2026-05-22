import { startOrchestration } from './orchestration/startOrchestration.js';

export function writeEndPointCommand(context) {
    return async (uri) => startOrchestration({ uri, extensionPath: context.extensionPath });
};