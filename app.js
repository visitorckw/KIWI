var express = require('express');
var engine = require('ejs-locals');             //讓express支援layout
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
// 引入router檔案位於routes資料夾中
var index = require('./routes/index');
var post = require('./routes/post');
var user = require('./routes/user');

var app = express();

app.engine('ejs', engine);
app.set('views',path.join(__dirname,'views'));  //view的路徑位在資料夾views中
app.set('view engine','ejs');                   //使用ejs作為template

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Validator
app.use(expressValidator());
app.use("/assets",express.static(__dirname + "/assets"));

//Handle sessions and cookie
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));
app.use(cookieParser('secretString'));

//flah message
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//Route
app.use('/', index);                              // get '/'時交給routes index處理
app.use('/post', post);                          // get '/post'時交給routes post處理
app.use('/user',user);                          // get '/user'時交給routes user處理

app.listen( process.env.PORT || 3000);                             //監聽3000port
console.log('running on port 3000');
