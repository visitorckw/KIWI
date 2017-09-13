var express = require("express");
var engine = require("ejs-locals");             //讓express支援layout
var path = require("path");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var session = require("express-session");
var db = require("./model/db");
var flash = require("express-flash");
var compression = require("compression");
var cookieParser = require("cookie-parser");
// 引入router檔案位於routes資料夾中
var index = require("./routes/index");
var post = require("./routes/post");
var user = require("./routes/user");
var schedule = require("./routes/schedule");
var course = require("./routes/course");
var course_rate = require("./routes/course_rate");
var bot = require("./routes/bot");

var app = express();

app.engine("ejs", engine);
app.set("views",path.join(__dirname,"views"));  //view的路徑位在資料夾views中
app.set("view engine","ejs");                   //使用ejs作為template

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-status-monitor')());
app.use("/assets",express.static("assets",{ maxAge: 30*60*1000 }));

//Handle sessions and cookie
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret:"secret",
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser("secretString"));

app.use(function(req, res, next) {
  if(req.cookies.isLogin){
    db.FindbyID("user",req.cookies.id,function(user){
      req.user = user;
      next();
    });
  }
  else {
    next();
  }
});

app.use(flash());
app.use(expressValidator());
app.use(compression());

//Route
app.use("/course",course);                              // get "/"時交給routes course
app.use("/post", post);                          // get "/post"時交給routes post處理
app.use("/user",user);                          // get "/user"時交給routes user處理
app.use("/schedule",schedule);                 // get "/schedule"時交給routes schedule
app.use("/course_rate",course_rate);          // get "/course_rate"時交給routes course_rate
app.use("/bot",bot);
app.use("/*",course);

app.listen( process.env.PORT || 3000);                             //監聽3000port
console.log("running on port 3000");
