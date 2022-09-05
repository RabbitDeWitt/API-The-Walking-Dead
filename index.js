const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const characters = require("./src/characters/characters.json")

app.get('/characters', (req, res) => {
  return res.json({characters})
})


app.listen(port, () => {
  console.log('Server On!!!')
})