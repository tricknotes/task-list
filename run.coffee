app = require('./lib/index')

port = Number(process.env.PORT || 80)
app.listen(port)
console.log('Server listening port at %d...', port)
