// validateProject/start.js

import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';

export function validateProjectCommand(context) {
    return async (uri) => {
        const rootPath = uri?.fsPath || context.extensionPath;

        const files = getAllJsFiles(rootPath);
        const graph = {};

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            const ast = parse(content, { sourceType: 'module' });

            const imports = [];

            ast.program.body.forEach(node => {
                if (node.type === 'ImportDeclaration') {
                    imports.push(node.source.value);
                }
            });

            graph[file] = imports.map(i => resolveImport(file, i));
        }

        const issues = validateGraph(graph);

        console.log('GRAPH:', graph);
        console.log('ISSUES:', issues);
    };
}

/* ---------- helpers ---------- */

function getAllJsFiles(dir, files = []) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getAllJsFiles(fullPath, files);
        } else if (item.endsWith('.js')) {
            files.push(fullPath);
        }
    }

    return files;
}

function resolveImport(fromFile, importPath) {
    if (!importPath.startsWith('.')) return null;

    const resolved = path.resolve(path.dirname(fromFile), importPath);

    if (fs.existsSync(resolved + '.js')) return resolved + '.js';
    if (fs.existsSync(resolved)) return resolved;

    return null;
}

function validateGraph(graph) {
    const issues = [];

    for (const file in graph) {
        graph[file].forEach(dep => {
            if (dep && !graph[dep]) {
                issues.push(`Missing file: ${dep} (imported in ${file})`);
            }
        });
    }

    return issues;
};