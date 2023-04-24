const express = require('express')
const app = express()
const route = require('./routes/route')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const port = 3000

app.use(cors())
app.use(cookieParser())



app.use('/', route)



app.listen(port, () => {
    console.log('Express app running on Port' +" "+ port)
})


