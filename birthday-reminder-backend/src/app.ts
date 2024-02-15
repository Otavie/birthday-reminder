import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI as string

const app = express()
app.use(express.json())

mongoose.Promise = Promise
mongoose.connect(DB_URI)

mongoose.connection.on('connected', () => {
    console.log('Connected to database!')
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from database!')
})

mongoose.connection.on('error', (error) => {
    console.log('Error connecting to database:', error)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})