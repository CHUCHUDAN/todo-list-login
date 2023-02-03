const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')

const routes = require('./routes')// 引用路由器

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })



// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


//伺服器啟動並監聽
app.listen(3000, () => {
  console.log('The app is Listening on http://localhost:3000')
})