// src/V9/createFullEndpoint/orchestration/startOrchestration.js

import * as vscode from 'vscode';
import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/Prechecks/start.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';

export async function startOrchestration({ uri }) {
    const log = (m) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${m}`);
    try {
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            entryFilePath: context.entryFilePath
        });

        const result = await runFeatureOrchestration({ context, log });
        if (!result) return;

        finalize({
            message: `Endpoint '${result.endpoint}' created 🚀`
        });
    } catch (e) {
        log(`ERROR: ${e.message};`);
        vscode.window.showErrorMessage(`Error: ${e.message}`);
    }
};