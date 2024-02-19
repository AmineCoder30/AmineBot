const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const { TELEGRAM_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const URI = `/webhook/${TELEGRAM_TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
    try {
        const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
        console.log(res.data);
    } catch (error) {
        console.error('Error setting up webhook:', error.message);
    }
};

app.post(URI, async (req, res) => {
    try {
        console.log(req.body);
        const chatId = req.body.message.chat.id;
        const text = req.body.message.text;
        
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: text
        });
        
        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling incoming message:', error.message);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 app running on port ${PORT}`);
    await init();
});
