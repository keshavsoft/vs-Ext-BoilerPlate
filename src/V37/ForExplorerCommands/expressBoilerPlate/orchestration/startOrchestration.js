import { express } from "@keshavsoft/kschema-cli";

export async function startOrchestration({ inTargetPath }) {
    await express(inTargetPath);
};