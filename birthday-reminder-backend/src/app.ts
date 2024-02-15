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

app.get('/birthdays', async (req: Request, res: Response) => {
    try {
        const celebrants = await Celebrants.find()
        res.status(200).json({
            message: "All celebrants details",
            celebrants
        })

    } catch (error) {
        console.error('Error getting all the celebrants details:', error)
        res.status(500).json({ message: 'Error getting all the celebrants!' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})