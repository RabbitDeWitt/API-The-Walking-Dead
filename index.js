const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const characters = require("./src/characters/characters.json")
const message = require('./until/helpers')

app.get('/characters', paginatedResults(characters),(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  return res.json(res.result)
})

app.listen(port, () => {
  console.log('Server On!!!')
})

function paginatedResults(model){
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const limit = req.query.limit || 20
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const pages = Math.ceil(model.length / limit)
    
    if(page > pages || page < 0){
      res.status(404).json({
        error: message.messageInvalidPage
      })
      return
    }

    
    const resultCharacters = model.slice(startIndex, endIndex)
    const baseUrl = `${req.protocol}://${req.get('host')}`

    const info = {
      "count": model.length,
       pages,
      "previousPage": (startIndex > 0) ? `${baseUrl}${req.path}?page=${page - 1}&limit=${limit}` : null,
      "nextPage": (endIndex < model.length) ? `${baseUrl}${req.path}?page=${page + 1}&limit=${limit}` : null,
    }
    
    res.result = {
      "Info": info,
      "Characters": resultCharacters
    }


    next()
  }
}