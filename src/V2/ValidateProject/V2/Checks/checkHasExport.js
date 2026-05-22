export function startFunc(body) {
    const hasExport = body.some(node =>
        node.type === 'ExportNamedDeclaration' ||
        node.type === 'ExportDefaultDeclaration'
    );

    if (!hasExport) {
        return { success: false, message: 'No export found' };
    }

    return { success: true };
};
