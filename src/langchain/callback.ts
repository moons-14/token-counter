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

export class TokenCounter3_16kCallback extends BaseCallbackHandler {
    name = "TokenCounter3_16kCallback";
    private _tokenCounter: TokenCounter;

    constructor(tokenCounter: TokenCounter) {
        super();
        this._tokenCounter = tokenCounter;
    }


    async handleLLMEnd(output: LLMResult): Promise<void> {
        if (output.llmOutput) {
            await this._tokenCounter.addGpt3_16kInputTokenCount(output.llmOutput.tokenUsage.promptTokens)
            await this._tokenCounter.addGpt3_16kOutputTokenCount(output.llmOutput.tokenUsage.completionTokens)
        }
    }
}

export class TokenCounter4_8kCallback extends BaseCallbackHandler {
    name = "TokenCounter3_4kCallback";
    private _tokenCounter: TokenCounter;

    constructor(tokenCounter: TokenCounter) {
        super();
        this._tokenCounter = tokenCounter;
    }


    async handleLLMEnd(output: LLMResult): Promise<void> {
        if (output.llmOutput) {
            await this._tokenCounter.addGpt4_8kInputTokenCount(output.llmOutput.tokenUsage.promptTokens)
            await this._tokenCounter.addGpt4_8kOutputTokenCount(output.llmOutput.tokenUsage.completionTokens)
        }
    }
}

export class TokenCounter4_32kCallback extends BaseCallbackHandler {
    name = "TokenCounter3_4kCallback";
    private _tokenCounter: TokenCounter;

    constructor(tokenCounter: TokenCounter) {
        super();
        this._tokenCounter = tokenCounter;
    }


    async handleLLMEnd(output: LLMResult): Promise<void> {
        if (output.llmOutput) {
            await this._tokenCounter.addGpt4_32kInputTokenCount(output.llmOutput.tokenUsage.promptTokens)
            await this._tokenCounter.addGpt4_32kOutputTokenCount(output.llmOutput.tokenUsage.completionTokens)
        }
    }
}