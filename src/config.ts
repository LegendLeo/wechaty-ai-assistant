import * as dotenv from 'dotenv';
import { IConfig } from './types/interface.js';

dotenv.config();

console.log('wechaty', process.env.WECHATY_PUPPET)

const CONFIG: IConfig = {
  baseUrl: process.env.OPENAI_API_BASE,
  apiKey: process.env.OPENAI_API_KEY || '123456789',
  model: process.env.MODEL || 'gpt-3.5-turbo',
  disableGroupMessage: process.env.DISABLE_IN_GROUP === 'true',
  temperature: process.env.TEMPERATURE
    ? parseFloat(process.env.TEMPERATURE)
    : 0.6,
  blockWords: process.env.BLOCK_WORDS?.split(',') || [],
  wechatyPuppet: process.env.WECHATY_PUPPET || 'wechaty-puppet-wechat4u'
};

export default CONFIG;
