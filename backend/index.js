const connectToMongo= require('./db')

connectToMongo();
var cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

//Available routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})