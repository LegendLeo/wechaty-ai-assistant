import { ContactSelfInterface } from "wechaty/impls";
import CONFIG from "../config.js";

export async function handleLogin (user: ContactSelfInterface) {
  console.log(`User ${user} logged in`);
  console.log(`已设置 ${CONFIG.blockWords.length} 个聊天关键词屏蔽. \n${CONFIG.blockWords}`);
}
