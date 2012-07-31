express = require('express')
app = express.createServer()
app.use express.static(__dirname)
app.listen 5454
console.log 'ready'
