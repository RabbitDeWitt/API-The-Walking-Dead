const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const characters = require("./src/characters/characters.json")

app.get('/characters', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  return res.json({characters})
})


app.listen(port, () => {
  console.log('Server On!!!')
})