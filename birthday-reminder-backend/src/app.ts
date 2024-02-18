import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Celebrants from './models/celebrants'
import dbConnection from './database/db'
import validateRequest from './middleware/validate.request'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

// Connect to Database
dbConnection()

app.post('/birthdays', validateRequest, async (req: Request, res: Response) => {
    try {
        // Validate Required Fields
        const { username, email, dateOfBirth } = req.body
        if (!username || !email || !dateOfBirth) {
            return res.status(400).json({ message: 'Username, email or password is missing!' })
        }

        // Ensure Username and Email are Unique Using Model Method
        const existingUsername = await Celebrants.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use!' })
        }

        const existingEmail = await Celebrants.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use!' })
        }

        // Create New Celebrant
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