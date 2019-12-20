var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// MySQLの設定情報
var mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my-nodeapp-db'
}

router.get('/', (req, res, next) => {
  // コネクションの用意
  var connection = mysql.createConnection(mysql_setting);

  // データベースに接続
  connection.connect();

  // データの取り出し
  connection.query("SELECT * from mydata",
    function (error, results, fields) {
      // データベースアクセス完了時の処理
      if (error == null) {
        var data = { title: 'mysql', content: results }
        res.render('hello', data);
      } else {
        throw error;
      }
    });

  // 接続を解除
  connection.end();
})

module.exports = router;