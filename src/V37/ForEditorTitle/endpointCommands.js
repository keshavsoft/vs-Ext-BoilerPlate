import * as vscode from 'vscode';

import { alterCommand } from '../CommonCommands/ForEndPointsJsFile/Alter/start.js';
import { getRegisterCommend } from './ForGetMethods/entryFile.js';
import { deleteRegisterCommands } from './ForDeleteMethods/entryFile.js';
import { postRegisterCommend } from './ForPostMethods/entryFile.js';

export function registerAllCommands(context) {

    const getEndPoint = vscode.commands.registerCommand(
        'extension.editor.title.endpoints.get',
        (uri) => getRegisterCommend(context, uri)
    );

    // Other commands
    const postEndPoint = vscode.commands.registerCommand(
        'extension.editor.title.endpoints.insert',
        (uri) => postRegisterCommend(context, uri)
    );

    // const DeleteEndPoint = vscode.commands.registerCommand(
    //     'extension.editor.title.endpoints.delete',
    //     (uri) => deleteCommand(context, uri)
    // );

    const alterEndPoint = vscode.commands.registerCommand(
        'extension.editor.title.endpoints.alter',
        (uri) => alterCommand(context, uri)
    );

    const deleteCommands = vscode.commands.registerCommand(
        'extension.editor.title.endpoints.delete',
        (uri) => deleteRegisterCommands({ context, uri })
    );

    context.subscriptions.push(
        getEndPoint,
        postEndPoint,
        alterEndPoint, deleteCommands
    );
};