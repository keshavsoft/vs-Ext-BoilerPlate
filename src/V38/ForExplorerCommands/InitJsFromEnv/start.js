import { startOrchestration } from './orchestration/startOrchestration.js';

export function initJsFromEnvCommand(context) {
    return async (uri) => startOrchestration(uri, context.extensionPath);
};