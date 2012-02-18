express = require 'express'
app = module.exports = express.createServer()

app.use(express.static(__dirname + '/../public'))
app.set('view options', layout: false)

app.get '/', (req, res) ->
  res.render('index.jade')
