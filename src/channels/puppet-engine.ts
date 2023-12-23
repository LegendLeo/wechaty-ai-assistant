import { PuppetEngine } from 'wechaty-puppet-engine';

export const puppetEngine = new PuppetEngine({
  port: '8089', // 对应注入器中的 callBackUrl=http://localhost:8089/wechat/
  httpServer: 'http://127.0.0.1:8055', // 对应注入器参数port=8055
  runLocal: true,
});
