const { Client } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
const client = new Client(config);

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

const HEAL_CHAT_URL = 'https://liff.line.me/2007569910-ZoE058zO';

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
        }
      ]
    }
  };
}

async function handleEvent(event) {
  if (
    event.type === 'message' &&
    event.message.type === 'text' &&
    event.message.text.includes('21天重啟')
  ) {
    const imgUrl = QUOTES_IMAGES[Math.floor(Math.random() * QUOTES_IMAGES.length)];
    const flexMsg = buildFlexCard(imgUrl);
    await client.replyMessage(event.replyToken, {
      type: "flex",
      altText: "21天重啟 隨機抽卡",
      contents: flexMsg
    });
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(200).send('OK');
    return;
  }

  try {
    const events = req.body.events;
    if (!events) {
      res.status(200).send('No events');
      return;
    }
    await Promise.all(events.map(handleEvent));
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(200).send('OK');
  }
};
