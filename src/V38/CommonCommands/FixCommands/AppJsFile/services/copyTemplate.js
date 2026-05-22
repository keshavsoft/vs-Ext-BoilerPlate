// service/copyTemplate.js

import fs from 'fs';
import path from 'path';

export function copyTemplate({ templatePath, targetPath }) {
    fs.cpSync(templatePath, targetPath, {
        recursive: true
    });
}