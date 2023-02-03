// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Todo model
const Todo = require('../../models/todo')

//首頁路由render mongodb中所有資料
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) //資料排序=>正序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

//匯出路由模組
module.exports = router