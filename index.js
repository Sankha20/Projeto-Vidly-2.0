const express = require('express')
const genresRoutes = require("./routes/genresRoutes")

const port = process.env.PORT || 3000

const app = express()

app.use('/api/genres', genresRoutes)

app.listen(port, () => console.log(`http://localhost:${port}`))