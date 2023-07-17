## install

npm

```bash
npm install token-counter
```

yarn

```bash
yarn add token-counter
```

## Feature

- Count the number of tokens from the text
- Calculate the price based on the number of tokens
- Price calculation according to the model in use
- Support for LangChain Callback
- Calculation of amounts in each country's currency
- Obtaining usage details
- OnChange event handler when adding
- Avoid counting in mock use option

## Usage

### Count tokens from text

```typescript
import { TokenCounter } from "token-counter";

const tokenCounter = new TokenCounter();

const prompt = "example text";

tokenCounter.addGpt3_4kInputText(prompt);

// Tapping the API of Gpt-3.5-turbo (4k model)

tokenCounter.addGpt3_4kOutputText(prompt);
```

### Use for LangChain Callback

```typescript
import { TokenCounter } from "token-counter";
import { TokenCounter3_4kCallback } from "token-counter/langchain";

const tokenCounter = new TokenCounter();

new ChatOpenAI({
  modelName: "gpt-3.5-turbo-0613",
  temperature: 0,
  callbacks: [new TokenCounter3_4kCallback(tokenCounter)],
});
```

### Get prices in your country's currency

```typescript
console.log(tokenCounter.jpyPrice);
```

### Obtain a statement of use

```typescript
// True must be passed as the first argument when initializing tokenCounter
const tokenCounter = new TokenCounter(true);

tokenCounter.addGpt3_4kInputText(prompt);

// Obtain a statement of use
console.log(tokenCounter.receipt);
```

## Available Methods

#### Counting based on text

- addGpt3_4kInputText
- addGpt3_4kOutputText
- addGpt3_16kInputText
- addGpt3_16kOutputText
- addGpt4_8kInputText
- addGpt4_8kOutputText
- addGpt4_32kInputText
- addGpt4_32kOutputText
- addAda_v2Text

#### Counting based on tokens

- addGpt3_4kInputTokenCount
- addGpt3_4kOutputTokenCount
- addGpt3_16kInputTokenCount
- addGpt3_16kOutputTokenCount
- addGpt4_8kInputTokenCount
- addGpt4_8kOutputTokenCount
- addGpt4_32kInputTokenCount
- addGpt4_32kOutputTokenCount
- addAda_v2TokenCount

## Available Properties

#### Get number of tokens

- tokenCounter.tokens

#### Get price in USD

- tokenCounter.price

#### Retrieve usage statements

- tokenCounter.receipt

#### Supported Currency Properties

- tokenCounter.jpyPrice
