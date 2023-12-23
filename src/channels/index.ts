import { WechatyBuilder } from 'wechaty';
import * as Puppet from 'wechaty-puppet';
import CONFIG from '../config.js';
import { puppetEngine } from './puppet-engine.js';
import { puppetWechat4u } from './puppet-wechat4u.js';

let puppet: Puppet.Puppet;
switch (CONFIG.wechatyPuppet) {
  case 'wechaty-puppet-engine':
    puppet = puppetEngine;
    break;
  default:
    puppet = puppetWechat4u;
}

export default WechatyBuilder.build({
  name: 'wechaty-ai-assistant',
  puppet,
});
