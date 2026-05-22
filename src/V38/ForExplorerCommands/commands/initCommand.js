import { startOrchestration } from '../InitJs/orchestration/startOrchestration.js';

export function initCommand(context) {
    return async (uri) => startOrchestration(uri, context.extensionPath);
};