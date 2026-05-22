import readFile from "../common/readFile.js";
import writeFile from "../common/writeFile.js";

import buildUseLine from "./buildUseLine.js";
import checkDuplicate from "./checkDuplicate.js";
import findUseInsertIndex from "./findInsertIndex.js";

const updateAppUse = (inData) => {
    const localData = inData;
    const { appJsPath, endpoint } = localData;

    const summary = {
        use: { added: false, skipped: false, line: null }
    };

    const content = readFile(appJsPath);
    const useLine = buildUseLine(endpoint);

    if (checkDuplicate(content, endpoint)) {
        summary.use.skipped = true;
        console.log(summary);
        return summary;
    };

    const index = findUseInsertIndex(content);

    const before = content.slice(0, index);
    const lineNumber = before.split("\n").length + 1;

    const updated =
        before + "\n" + useLine + content.slice(index);

    writeFile(appJsPath, updated);

    summary.use.added = true;
    summary.use.line = lineNumber;

    console.log(summary);
    return summary;
};

export default updateAppUse;