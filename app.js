const express = require('express')
const app = express()

const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')

const routes = require('./routes')// 引用路由器

const UsePssport = require('./config/passport')

require('./config/mongoose')

//設定埠號
const PORT = process.env.PORT || 3000

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

UsePssport(app)

// 將 request 導入路由器
app.use(routes)



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


//伺服器啟動並監聽
app.listen(PORT, () => {
  console.log(`The app is Listening on http://localhost:${PORT}`)
})