const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello Worl')
})

app.listen(3000, () => {
  console.log('The app is Listening on http://localhost:3000')
})