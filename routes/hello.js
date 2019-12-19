var express = require('express');
var router = express.Router();
const NewsApi = require('newsapi');
const newsapi = new NewsApi('b76e25b055d846c2b2ca80dca43a2e8f');

router.get('/', (req, res, next) => {
  newsapi.v2.topHeadlines({
    q: 'trump',
    category: 'politics',
    language: 'en',
    country: 'us'
  }).then(response => {
    var data = {
      title: 'Hello!',
      content: response.articles
    }
    res.render('hello', data);
  })
});

module.exports = router;