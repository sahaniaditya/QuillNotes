const connectToMongo = require("./database.js")
connectToMongo();
var cors = require('cors')
const express = require('express');
const app = express()



app.use(cors())
const port = 5000
//middleware for sending the json text
app.use(express.json())
/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/
app.use("/api/auth",require('./routes/auth'));
app.use("/api/notes",require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})