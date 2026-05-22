// src/.../services/copyTemplate.js
import { simpleWithCrud } from "@keshavsoft-org/express-todo";

export function copyTemplate({ targetPath }) {
    console.log("aaaaaaaaa : ", targetPath);

    // simpleWithCrud({
    //     isAnnounce: true, showLog: true,
    //     folderName: "v1111111111111",
    //     inProcessPath: targetPath
    // });


    simpleWithCrud({
        isAnnounce: true, showLog: true,
        inProcessPath: targetPath
    });
};