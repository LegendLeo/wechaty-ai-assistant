import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface IConfig {
  baseUrl?: string;
  apiKey: string;
  model: string;
  disableGroupMessage: boolean;
  temperature: number;
  blockWords: string[];
  wechatyPuppet: string;
}

export interface ChatMessageParam {
  username: string,
  chatMessage: Array<ChatCompletionMessageParam>,
}
