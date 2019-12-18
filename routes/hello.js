var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  // クエリパラメーターの受け取り
  var name = req.query.name;
  var pass = req.query.pass;
  var data = {
    title: 'Hello',
    content: `あなたの名前は${name}です。<br>パスワードは${pass}です。`
  };
  res.render('hello', data);
});

module.exports = router;