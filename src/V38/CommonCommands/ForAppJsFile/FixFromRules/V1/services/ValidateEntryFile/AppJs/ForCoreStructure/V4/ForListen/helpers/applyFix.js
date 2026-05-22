import { insertAtPosition } from './insertAtPosition.js';

export async function applyFix(uri, fix, context) {

    let insertLine =
        context.lastInitNode?.loc?.end.line ?? 999;

    await insertAtPosition(uri, fix, insertLine);
};