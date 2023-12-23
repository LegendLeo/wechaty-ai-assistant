import bot from './channels/index.js'
import * as handlers from './handlers/index.js'

bot
  .on('scan', handlers.handleScan)
  .on('login', handlers.handleLogin)
  .on('message', handlers.handleMessage)
  .on('error', handlers.handleError)

try {
  await bot.start();
} catch (e) {
  console.error(`⚠️ 机器人启动失败：${e}`);
}
