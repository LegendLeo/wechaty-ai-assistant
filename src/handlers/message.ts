import { Contact, Message, Room, Wechaty } from 'wechaty';
import { Message as MessageType } from 'wechaty-puppet/types';
import CONFIG from '../config.js';
import { FileBox } from 'file-box';

const SINGLE_MESSAGE_MAX_SIZE = 500;

const IGNORED_TEXTS = [
  '收到一条视频/语音聊天消息，请在手机上查看',
  '收到红包，请在手机上查看',
  '收到转账，请在手机上查看',
  '/cgi-bin/mmwebwx-bin/webwxgetpubliclinkimg', // 位置消息
  '加入了群聊',
  '与群里其他人都不是朋友关系',
  '收到一条暂不支持的消息类型',
];

/**
 * 消息是否触发屏蔽
 */
function isBlocked(text: string): boolean {
  if (CONFIG.blockWords?.some((word: string) => text.includes(word))) {
    console.log(`🚫 此消息触发屏蔽词，将不会被处理: ${text}`);
  }
  return false;
}

/**
 * 消息是否被忽略
 */
function isIgnored(
  talker: Contact,
  messageType: MessageType,
  text: string
): boolean {
  return (
    talker.self() ||
    // TODO: 支持image, link
    ![MessageType.Text].includes(messageType) ||
    talker.name() === '微信团队' ||
    IGNORED_TEXTS.some((item) => text.includes(item))
  );
}

/**
 * 获取干净的消息文本
 */
function cleanMessage(
  rawText: string,
  isInGroup: boolean = false,
  botName: string
): string {
  let text = rawText;
  const item = rawText.split('- - - - - - - - - - - - - - -');
  if (item.length > 1) {
    text = item[item.length - 1];
  }

  if (isInGroup) {
    text = text.replace('@' + botName, '');
  }
  return text;
}

async function getReplyMessage(params: Contact, text: string, isRoom: boolean) {
  // TODO: 补充回复逻辑
  return text;
}

async function reply(
  talker: Room | Contact,
  message: string | FileBox
): Promise<void> {
  const messages: Array<string | FileBox> = [];
  if (typeof message === 'string') {
    if (isBlocked(message)) {
      console.log(`🚫 返回消息有屏蔽词，此消息将不会回复 ${message}`);
      return;
    }
    let tempMsg = message;
    while (tempMsg.length > SINGLE_MESSAGE_MAX_SIZE) {
      messages.push(tempMsg.slice(0, SINGLE_MESSAGE_MAX_SIZE));
      tempMsg = tempMsg.slice(SINGLE_MESSAGE_MAX_SIZE);
    }
    messages.push(tempMsg);
    for (const msg of messages) {
      await talker.say(msg);
    }
  } else {
    await talker.say(message);
  }
}

export async function handleMessage(this: Wechaty, msg: Message) {
  const room = msg.room(); // 是否为群消息
  const talker = msg.talker();
  const msgType = msg.type();
  const rawText = msg.text();
  if (isBlocked(rawText) || isIgnored(talker, msgType, rawText)) return;
  console.log('thisname', this.currentUser.name());
  const listener = msg.listener()?.name();
  console.log('listener', listener);
  try {
    if (room) {
      const topic = await room.topic();
      console.log(
        `🚪 群聊：${topic} 🤵 的用户：${talker.name()} 💬 消息内容：${rawText}`
      );
    } else {
      console.log(`🤵 联系人：${talker.name()} 💬 消息内容：${rawText}`);
    }
    const text = cleanMessage(rawText, !!room, this.currentUser.name());
    const replyText = await getReplyMessage(talker, text, !!room);
    await reply(talker, replyText);
  } catch (e) {
    console.error(e);
  }
}
