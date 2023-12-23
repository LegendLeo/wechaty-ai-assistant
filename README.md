# 🎉 欢迎使用 `wechaty-ai-assistant`

> 在微信上迅速接入 ChatGPT，让它成为你的得力助手！

## 🌟 功能特性

- 在微信上与 ChatGPT 进行对话
  - 基于 [wechaty](https://github.com/wechaty/wechaty) 和 [OpenAI API](https://platform.openai.com) 在微信中使用 ChatGPT
  - 支持多轮对话

## 🚀 开始使用

> 获取 OPENAI API KEY，请参考 [OpenAI API](https://platform.openai.com/account/api-keys)。

### 使用 NodeJS 运行

> 请确认安装的 NodeJS 版本为 18.0.0 以上

```sh
# 克隆项目
git clone https://github.com/legendleo/wechaty-ai-assistant.git && cd wechaty-ai-assistant
# 安装依赖
yarn install # or npm i
# 编辑配置
cp .env.example .env
vim .env # 也可用任意文本编辑器修改
# 启动项目
npm run dev
# 初次登录需要扫描二维码
```

> 请确保您的账号可以登陆 [网页版微信](https://wx.qq.com/)。

### 环境变量

| name             | default                   | example               | description                                                                                     |
| ---------------- | ------------------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| OPENAI_API_BASE  | https://api.openai.com/v1 |                       | 自定义 ChatGPT API 地址                                                                         |
| OPENAI_API_KEY   |                           | sk-XXXXXXXXXXXXXXXXXX | [创建你的 API 密钥](https://platform.openai.com/account/api-keys)                               |
| MODEL            | gpt-3.5-turbo             |                       | 要使用的模型 ID，默认为`gpt-3.5-turbo`                                                          |
| TEMPERATURE      | 0.6                       |                       | 在 0 和 2 之间。较高的数值如 0.8 会使 ChatGPT 输出更加随机，而较低的数值如 0.2 会使其更加稳定。 |
| DISABLE_IN_GROUP | false                     |                       | 是否在群聊里禁用                                                                                |
| BLOCK_WORDS      | "VPN"                     | "WORD1,WORD2,WORD3"   | 聊天屏蔽关键词，同时在群组和私聊中生效, 避免 bot 用户恶意提问或不当回复导致封号                 |

## 🙏 感谢支持

如果这个项目对你产生了一点的帮助，请为这个项目点上一颗 ⭐️，感谢
