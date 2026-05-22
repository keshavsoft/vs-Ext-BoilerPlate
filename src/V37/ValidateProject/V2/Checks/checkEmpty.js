
export function startFunc(body) {
    if (!body.length) {
        return { success: false, message: 'Empty file' };
    }
    return { success: true };
}
