require("dotenv").config();
const ACCESS_KEY = process.env.ACCESS_KEY;

async function getNewsData() {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${ACCESS_KEY}&countries=au&languages=en`
  );
  const data = await res.json();
  return data;
}

getNewsData().then((data) => console.log(data["data"][0]["url"]));
// let news = data.querySelector("url");
// console.log(news);

//How to access in browser:
// info['data'][0]['url']
// From terminal: 'https://www.watoday.com.au/lifestyle/beauty/skin-cycling-is-the-viral-routine-approved-by-dermatologists-here-s-how-to-do-it-20221006-p5bnqz.html?ref=rss&utm_medium=rss&utm_source=rss_feed'

//From console: document.querySelector("div.articles")
