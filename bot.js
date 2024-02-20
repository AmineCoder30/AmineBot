const TelegramBot = require('node-telegram-bot-api');
import questionList from "./Question.js";
require('dotenv').config();

const TOKEN = process.env.TELEGRAM_TOKEN ;
const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://amine-bot.vercel.app';
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);

bot.on('message', function onMessage(msg) {
    const { message_id: originalMessageId, chat: { id: chatId } } = msg;
    const item = questionList[Math.floor(Math.random() * questionList.length)];
    if (msg.text.toLowerCase() === "ask") {
        bot.sendMessage(chatId, ` ${item}؟`, {
            reply_to_message_id: originalMessageId
          });
    }

});