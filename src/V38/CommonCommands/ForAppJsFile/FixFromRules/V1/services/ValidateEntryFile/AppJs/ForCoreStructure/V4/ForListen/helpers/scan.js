export function scan(ast) {

    let hasListen = false;
    let serverVar = null;
    let appVar = 'app';
    let lastInitNode = null;

    ast.program.body.forEach(node => {

        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(dec => {

                if (dec.init?.callee?.name === 'express') {
                    appVar = dec.id.name;
                }

                if (
                    dec.init?.callee?.object?.name === 'http' &&
                    dec.init?.callee?.property?.name === 'createServer'
                ) {
                    serverVar = dec.id.name;
                }
            });

            lastInitNode = node;
        }

        if (node.type === 'ExpressionStatement') {
            lastInitNode = node;
        }

        if (
            node.type === 'ExpressionStatement' &&
            node.expression?.callee?.property?.name === 'listen'
        ) {
            const obj = node.expression.callee.object?.name;
            if (obj === appVar || obj === serverVar) {
                hasListen = true;
            }
        }

    });

    return { hasListen, serverVar, appVar, lastInitNode };
};
