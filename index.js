import TelegramBot from "node-telegram-bot-api";
import questionList from "./Question.js";
import http  from "http"
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
// const port = process.env.PORT
const bot = new TelegramBot(token, { polling: true });

http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);

bot.on("message", (msg) => {
  const item = questionList[Math.floor(Math.random() * questionList.length)];
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const message_id = msg.message_id;

  if (messageText === "اسألني") {
    bot.sendMessage(chatId, `${item}؟`, {
      reply_to_message_id: message_id,
    });
  }
});
