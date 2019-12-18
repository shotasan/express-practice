// モジュールのロード
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// ルート用スクリプトのロード
// routesフォルダ内のファイルを読みこむ
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');

// Expressオブジェクトの作成と基本設定
var app = express();

// view engine setup
// テンプレートファイルが保管される場所
app.set('views', path.join(__dirname, 'views'));
// テンプレートエンジンの種類を指定
app.set('view engine', 'ejs');

// 関数組み込み
// ロードしたモジュールの機能を呼び出す
// モジュール機能の呼び出しはルーティング処理以前に記載する
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

// 特定のアドレスにアクセスした時の処理設定
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);

// エラー発生時の処理
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// moduleオブジェクトのexportsプロパティにappを設定
module.exports = app;
