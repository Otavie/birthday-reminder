import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './database/db'
import routes from './routes/routes'
import cron from 'node-cron'
import Celebrants from './models/celebrants'
dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())

// Enable Cors
app.use(cors())

// Connect to Database
dbConnection()

app.use('/', routes)

// cron.schedule('*/5 * * * *', async() => {
cron.schedule('0 7 * * *', async() => {
    try {
        const todayDate = new Date()

        const celebrants = await Celebrants.find({
            dateOfBirth: {
                $gte: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).setHours(0, 0, 0, 0),
                $lt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1).setHours(0, 0, 0, 0)
            }
        });

        if (celebrants.length > 0) {
            console.log('Sending birthday email to celebrants:', celebrants)
        } else {
            console.log('No birthday today!')
        }
    } catch (error) {
        console.error('Error checking for birthday:', error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})

export default app