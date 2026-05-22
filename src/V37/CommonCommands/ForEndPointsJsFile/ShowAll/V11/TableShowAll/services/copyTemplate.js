import fs from 'fs';

export function copyTemplate({ templatePath, targetPath }) {
    fs.cpSync(templatePath, targetPath, {
        recursive: true
    });
}