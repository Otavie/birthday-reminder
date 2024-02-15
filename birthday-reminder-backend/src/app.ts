import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Celebrants from './models/celebrants'
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


app.post('/birthdays', async (req: Request, res: Response) => {
    const { username, email, dateOfBirth } = req.body

    try {
        const newCelebrant = new Celebrants({ username, email, dateOfBirth })
        await newCelebrant.save()

        res.status(201).json({
            message: 'Celebrant added successfully!',
            newCelebrant
        })
    } catch (error) {
        console.error('Error adding celebrant:', error)
        res.status(500).json({ message: 'Error adding celebrant!' })
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})