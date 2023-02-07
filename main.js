require("dotenv").config();
const ACCESS_KEY = process.env.ACCESS_KEY;

async function getNewsData() {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${ACCESS_KEY}&countries=au&languages=en`
  );
  const news = await res.json();
  return news;
}

getNewsData().then((News) => console.log(News));
