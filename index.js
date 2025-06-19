const express = require('express');
const line = require('@line/bot-sdk');

// 設定環境參數
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const app = express();
const client = new line.Client(config);

const QUOTES_IMAGES = [
  'https://i.postimg.cc/bw4qbB9h/1.png',
  'https://i.postimg.cc/YScwjmt2/10.png',
  'https://i.postimg.cc/NMBqkqyW/11.png',
  'https://i.postimg.cc/hG9RmPGL/12.png',
  'https://i.postimg.cc/kGg0LQvs/13.png',
  'https://i.postimg.cc/5tWZfdm6/14.png',
  'https://i.postimg.cc/XYCRM7dR/15.png',
  'https://i.postimg.cc/3wjzRSL9/16.png',
  'https://i.postimg.cc/V6Ypbqpw/17.png',
  'https://i.postimg.cc/d14XR7cy/18.png',
  'https://i.postimg.cc/mkn5q0DZ/19.png',
  'https://i.postimg.cc/mDsRp1np/2.png',
  'https://i.postimg.cc/ZnnQwTJD/20.png',
  'https://i.postimg.cc/bYVWs2TX/21.png',
  'https://i.postimg.cc/c4Vzcy2X/22.png',
  'https://i.postimg.cc/tC1fPCSs/23.png',
  'https://i.postimg.cc/13wjC7ZP/24.png',
  'https://i.postimg.cc/R0mbj1Mt/25.png',
  'https://i.postimg.cc/76n4FY8H/3.png',
  'https://i.postimg.cc/BQQZGDnd/4.png',
  'https://i.postimg.cc/HnSgLZkF/5.png',
  'https://i.postimg.cc/PfKhKxQK/6.png',
  'https://i.postimg.cc/HshmDhKy/7.png',
  'https://i.postimg.cc/Wb3Vyv9V/8.png',
  'https://i.postimg.cc/YCLHpxKy/9.png'
];

const COVER_IMG = 'https://i.postimg.cc/kMtsPNqG/21-Day-Soul-Reboot-Quotes1.png';
const HEAL_CHAT_URL = 'https://liff.line.me/2007569910-ZoE058zO';
const OFFICIAL_WEB = 'https://www.muzisoulhealing.tw/'; // 你可修改官網網址

// Flex Message Builder
function buildFlexCard(imgUrl) {
  return {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": imgUrl,
      "size": "full",
      "aspectRatio": "1:1",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "image",
          "url": COVER_IMG,
          "size": "full",
          "aspectRatio": "2:1",
          "aspectMode": "cover",
          "margin": "none"
        },
        {
          "type": "text",
          "text": "請靜心感受今日語錄的訊息吧～",
          "wrap": true,
          "weight": "bold",
          "align": "center",
          "size": "md",
          "margin": "md"
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "抽卡",
            "text": "21天重啟"
          },
          "style": "primary"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "分享語錄",
            "uri": `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(imgUrl)}`
          }
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "我想療癒聊",
            "uri": HEAL_CHAT_URL
          }
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "官網",
            "uri": OFFICIAL_WEB
          }
        }
      ]
    }
  };
}

// webhook 路由
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// 處理消息事件
function handleEvent(event) {
  // 只處理文字訊息
  if (event.type === 'message' && event.message.type === 'text' && event.message.text.includes('21天重啟')) {
    const imgUrl = QUOTES_IMAGES[Math.floor(Math.random() * QUOTES_IMAGES.length)];
    const flexMsg = buildFlexCard(imgUrl);
    return client.replyMessage(event.replyToken, {
      type: "flex",
      altText: "21天重啟 隨機抽卡",
      contents: flexMsg
    });
  }
  // 處理 postback 或其他可再擴充
  return Promise.resolve(null);
}

// 提供官網/第三方抽卡 API
app.get('/draw', (req, res) => {
  const imgUrl = QUOTES_IMAGES[Math.floor(Math.random() * QUOTES_IMAGES.length)];
  res.json({
    img: imgUrl,
    cover: COVER_IMG,
    text: '請靜心感受今日語錄的訊息吧～'
  });
});

app.get('/', (req, res) => res.send('Line 21天重啟 抽卡系統 Running!'));

// 啟動服務
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
