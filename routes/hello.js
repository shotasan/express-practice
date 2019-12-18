var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  var msg = '何か書いてください';
  // セッション情報の取得
  if (req.session.message != undefined) {
    msg = `Last Message: ${req.session.message}`;
  }
  var data = {
    title: 'Hello',
    content: msg
  };
  res.render('hello', data);
});

router.post('/post', (req, res, next) => {
  var msg = req.body['message'];
  // セッション情報の登録
  req.session.message = msg;
  var data = {
    title: 'Hello!',
    content: `Last Message: ${req.session.message}`
  };
  res.render('hello', data);
});

module.exports = router;