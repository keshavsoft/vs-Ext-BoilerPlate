import { tally } from "@keshavsoft/kschema-cli";

export async function startOrchestration({ inTargetPath }) {
    await tally(inTargetPath);
};