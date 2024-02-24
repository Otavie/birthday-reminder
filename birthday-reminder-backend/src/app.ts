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

const cronTask = async () => {
    try {
        const todayDate = new Date()
        const todayDay = todayDate.getDate()            // Get today's day
        const todayMonth = todayDate.getMonth() + 1     // Gte today's month
                
        const celebrants = await Celebrants.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: '$dateOfBirth' }, todayMonth] },
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] }
                ]
            }
        })


        if (celebrants.length) {
            // console.log(celebrants)
            console.log('Happy birthday to ')
            celebrants.forEach((celebrant) => {
                console.log(`- ${celebrant.email}`)
            })
        } else {
            console.log('No celebrants today!')
        }

    } catch (error) {
        console.log('Error checking for birthday:', error)
    }
}

cron.schedule('*/1 * * * *', cronTask)

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})

export default app