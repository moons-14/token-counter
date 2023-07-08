import BigNumber from "bignumber.js";
import tiktoken from "tiktoken-node";

const cl100kEnc = tiktoken.getEncoding("cl100k_base")

export class TokenCounter {
    public tokens: number = 0;
    public price = BigNumber(0);
    public receipt: { model: "gpt-3.5-4k" | "gpt-3.5-16k" | "gpt-4-8k" | "gpt-4-32k" | "ada-v2", io?: "input" | "output", text: string, tokenCount: number, price: BigNumber }[] = [];
    private _gpt3_4k_inputPricePerToken = BigNumber(0.0000015);
    private _gpt3_4k_outputPricePerToken = BigNumber(0.000002);
    private _gpt3_16k_inputPricePerToken = BigNumber(0.000003);
    private _gpt3_16k_outputPricePerToken = BigNumber(0.000004);
    private _gpt4_8k_inputPricePerToken = BigNumber(0.00003);
    private _gpt4_8k_outputPricePerToken = BigNumber(0.00006);
    private _gpt4_32k_inputPricePerToken = BigNumber(0.00006);
    private _gpt4_32k_outputPricePerToken = BigNumber(0.00012);
    private _ada_v2PricePerToken = BigNumber(0.0000001);
    private _usdJpy = BigNumber(140);
    private _useReceipt: boolean = false;
    private _onChange: (tokens: number, price: string, jpyPrice: string) => void;
    private _useGpt4Mock: boolean = false;
    private _useGpt3Mock: boolean = false;
    private _useAdaMock: boolean = false;

    constructor(useReceipt: boolean = false,
        onChange?: (token: number, price: string, jpyPrice: string) => void,
        {
            useGpt4Mock = false,
            useGpt3Mock = false,
            useAdaMock = false,
            price
        }: {
            useGpt4Mock?: boolean,
            useGpt3Mock?: boolean,
            useAdaMock?: boolean,
            price?: {
                gpt_3_4k_input?: BigNumber | number,
                gpt_3_4k_output?: BigNumber | number,
                gpt_3_16k_input?: BigNumber | number,
                gpt_3_16k_output?: BigNumber | number,
                gpt_4_8k_input?: BigNumber | number,
                gpt_4_8k_output?: BigNumber | number,
                gpt_4_32k_input?: BigNumber | number,
                gpt_4_32k_output?: BigNumber | number,
                ada_2_embedding?: BigNumber | number,
            },
            rate?: {
                jpy: number
            }
        } = {}) {
        this._useReceipt = useReceipt;
        this._onChange = onChange || (() => void 0);
        this._useGpt4Mock = useGpt4Mock;
        this._useGpt3Mock = useGpt3Mock;
        this._useAdaMock = useAdaMock;
        this._gpt3_4k_inputPricePerToken = typeof price?.gpt_3_4k_input == "undefined" ? this._gpt3_4k_inputPricePerToken : typeof price.gpt_3_4k_input == "number" ? BigNumber(price.gpt_3_4k_input) : price.gpt_3_4k_input;
        this._gpt3_4k_outputPricePerToken = typeof price?.gpt_3_4k_output == "undefined" ? this._gpt3_4k_outputPricePerToken : typeof price.gpt_3_4k_output == "number" ? BigNumber(price.gpt_3_4k_output) : price.gpt_3_4k_output;
        this._gpt3_16k_inputPricePerToken = typeof price?.gpt_3_16k_input == "undefined" ? this._gpt3_16k_inputPricePerToken : typeof price.gpt_3_16k_input == "number" ? BigNumber(price.gpt_3_16k_input) : price.gpt_3_16k_input;
        this._gpt3_16k_outputPricePerToken = typeof price?.gpt_3_16k_output == "undefined" ? this._gpt3_16k_outputPricePerToken : typeof price.gpt_3_16k_output == "number" ? BigNumber(price.gpt_3_16k_output) : price.gpt_3_16k_output;
        this._gpt4_8k_inputPricePerToken = typeof price?.gpt_4_8k_input == "undefined" ? this._gpt4_8k_inputPricePerToken : typeof price.gpt_4_8k_input == "number" ? BigNumber(price.gpt_4_8k_input) : price.gpt_4_8k_input;
        this._gpt4_8k_outputPricePerToken = typeof price?.gpt_4_8k_output == "undefined" ? this._gpt4_8k_outputPricePerToken : typeof price.gpt_4_8k_output == "number" ? BigNumber(price.gpt_4_8k_output) : price.gpt_4_8k_output;
        this._gpt4_32k_inputPricePerToken = typeof price?.gpt_4_32k_input == "undefined" ? this._gpt4_32k_inputPricePerToken : typeof price.gpt_4_32k_input == "number" ? BigNumber(price.gpt_4_32k_input) : price.gpt_4_32k_input;
        this._gpt4_32k_outputPricePerToken = typeof price?.gpt_4_32k_output == "undefined" ? this._gpt4_32k_outputPricePerToken : typeof price.gpt_4_32k_output == "number" ? BigNumber(price.gpt_4_32k_output) : price.gpt_4_32k_output;
        this.jpyPrice = rate?.jpy || this.jpyPrice;
    }

    public addGpt3_4kInputText(text: string) {
        if (this._useGpt3Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt3_4k_inputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-3.5-4k", io: "input", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt3_4k_inputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt3_4kOutputText(text: string) {
        if (this._useGpt3Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt3_4k_outputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-3.5-4k", io: "output", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt3_4k_outputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt3_16kInputText(text: string) {
        if (this._useGpt3Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt3_16k_inputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-3.5-16k", io: "input", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt3_16k_inputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt3_16kOutputText(text: string) {
        if (this._useGpt3Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt3_16k_outputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-3.5-16k", io: "output", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt3_16k_outputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt4_8kInputText(text: string) {
        if (this._useGpt4Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt4_8k_inputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-4-8k", io: "input", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt4_8k_inputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt4_8kOutputText(text: string) {
        if (this._useGpt4Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt4_8k_outputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-4-8k", io: "output", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt4_8k_outputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt4_32kInputText(text: string) {
        if (this._useGpt4Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt4_32k_inputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-4-32k", io: "input", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt4_32k_inputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addGpt4_32kOutputText(text: string) {
        if (this._useGpt4Mock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._gpt4_32k_outputPricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "gpt-4-32k", io: "output", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._gpt4_32k_outputPricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    public addAda_v2Text(text: string) {
        if (this._useAdaMock) return void 0;
        const tokenCount = cl100kEnc.encode(text).length;
        this.tokens += tokenCount;
        this.price = new BigNumber(tokenCount).multipliedBy(this._ada_v2PricePerToken).plus(this.price);
        if (this._useReceipt) {
            this.receipt.push({ model: "ada-v2", io: "input", text: text, tokenCount: tokenCount, price: new BigNumber(tokenCount).multipliedBy(this._ada_v2PricePerToken) });
        }
        this._onChange(this.tokens, this.price.toString(), this.jpyPrice)
    }

    get jpyPrice() {
        return this.price.multipliedBy(this._usdJpy).toString();
    }

}