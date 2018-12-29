require('dotenv').config()


const express = require('express');

const pgdb = require('./db/pgdb.js')

const session = require("express-session");
const KnexSessionStore = require('connect-session-knex')(session);

const cors = require('cors')
const bodyParser = require('body-parser');
const lineLogin = require('./Line/lineLogin.js')

const proxy = require('express-http-proxy');

const path = require('path');
const publicPath = path.join(__dirname, '..', 'build');

const isProd = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3050
const app = express();
const subscribeRouter = require('./routers/subscribeRouter.js')
const lineAuthRouter = require('./routers/lineAuthRouter.js')
const userRouter = require('./routers/userRouter')


const store = new KnexSessionStore({
  knex: pgdb
});

const session_options = {
  secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
  resave: false,
  saveUninitialized: false,
  store: isProd === "production" ? store : undefined
}


app.use(cors())

app.use(session(session_options));
app.use(express.static(publicPath));




//step.1
//請求後會幫你redirect轉到line 登入網址
app.use("/auth", lineLogin.auth())

//step.2
//line回call到 react授權頁面
app.use("/callback", (req,res,next) => {
  console.log('dev有轉發')
  next()
});

//react call 此api  判斷 回傳登入成功或是失敗 自己寫邏輯


app.use(bodyParser.json());
app.use('/api/v1/subscriptions', subscribeRouter)
app.use('/api/v1', [lineAuthRouter, userRouter])


//handle all error
app.use( (err, req, res, next) => {
  var statusCode = 500;
  if (err.status != null) {
    var statusCode = err.status;
    return res.status(statusCode).json({ errMsg: err.message, isSucceeded: false });
  } 
  next()
})




//????????
//最後只要不是api的全都回傳react page

if (isProd !== 'production') {
  app.use('/', proxy('http://localhost:3000'))
  console.log('使用proxy to webpack dev server')
}

if (isProd === 'production') {
  app.get('*', (req, res) => {

    res.sendFile(path.join(publicPath, 'index.html'))
  })
}




app.listen(port, function () {
  console.log(`backend server is running at ${port} ...`);
  console.log(`backend server is running env: ${process.env.NODE_ENV} `);
});


// "proxy": "http://localhost:3050"