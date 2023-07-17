import { TokenCounter } from "@/index.js";
import { BaseCallbackHandler } from "langchain/callbacks";
import { LLMResult } from "langchain/schema";


export class TokenCounter3_4kCallback extends BaseCallbackHandler {
    name = "TokenCounter3_4kCallback";
    private _tokenCounter: TokenCounter;

    constructor(tokenCounter: TokenCounter) {
        super();
        this._tokenCounter = tokenCounter;
    }


    async handleLLMEnd(output: LLMResult): Promise<void> {
        if (output.llmOutput) {
            await this._tokenCounter.addGpt3_4kInputTokenCount(output.llmOutput.tokenUsage.promptTokens)
            await this._tokenCounter.addGpt3_4kOutputTokenCount(output.llmOutput.tokenUsage.completionTokens)
        }
    }
}