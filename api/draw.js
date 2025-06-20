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

module.exports = (req, res) => {
  const imgUrl = QUOTES_IMAGES[Math.floor(Math.random() * QUOTES_IMAGES.length)];
  res.status(200).json({
    img: imgUrl,
    text: '請靜心感受今日語錄的訊息吧～'
  });
};
