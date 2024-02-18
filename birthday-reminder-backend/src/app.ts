import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Celebrants from './models/celebrants'
import dbConnection from './database/db'
import routes from './routes/routes'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

// Connect to Database
dbConnection()

app.use('/', routes)

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