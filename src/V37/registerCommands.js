import { registerAllCommands as ForEditorRegisterAllCommands } from './ForEditorCommands/registerCommands.js';
import { registerAllCommands as ForExplorerRegisterAllCommands } from './ForExplorerCommands/registerCommands.js';
import { registerAllCommands as ForEditorTitle } from './ForEditorTitle/registerCommands.js';

export function registerAllCommands(context) {
    ForExplorerRegisterAllCommands(context);
    ForEditorRegisterAllCommands(context);
    ForEditorTitle(context);
};
