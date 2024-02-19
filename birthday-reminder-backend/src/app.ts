import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './database/db'
import routes from './routes/routes'
dotenv.config()

const PORT = process.env.PORT

export const app = express()
app.use(express.json())

// Connect to Database
dbConnection()

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})