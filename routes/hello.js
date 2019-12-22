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
        res.render('hello/index', data);
      } else {
        throw error;
      }
    });

  // 接続を解除
  connection.end();
});

router.get('/add', (req, res, next) => {
  var data = {
    title: 'Hello/Add',
    content: '新しいレコードを入力'
  }
  res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = { 'name': nm, 'mail': ml, 'age': ag };

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query('insert into mydata set ?', data,
    function (error, results, fields) {
      if (error) throw error;
      res.redirect('/hello');
    }
  );

  connection.end();
})

router.get('/show', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query('SELECT * from mydata where id=?', id,
    function (error, results, fields) {
      if (error == null) {
        var data = {
          title: 'Hello/show',
          content: `id = ${id}のレコード`,
          mydata: results[0]
        }
      } else {
        throw error;
      }
      res.render('hello/show', data);
    }
  )

  connection.end();
})

router.get('/edit', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query('SELECT * from mydata where id=?', id,
    function (error, results, fields) {
      if (error == null) {
        var data = {
          title: 'Hello/edit',
          content: `id = ${id}のレコード`,
          mydata: results[0]
        }
        res.render('hello/edit', data);
      } else {
        throw error;
      }
    });

  connection.end();
});

router.post('/edit', (req, res, next) => {
  var id = req.body.id;
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = { 'name': nm, 'mail': ml, 'age': ag };

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query('update mydata set ? where id= ?', [data, id],
    function (error, results, fields) {
      if (error == null) {
        res.redirect('/hello');
      } else {
        throw error;
      }
    });

  connection.end();
});
module.exports = router;