import { Request, Response } from "express"
import Celebrants from "../models/celebrants"

export const addCelebrant = async (req: Request, res: Response) => {
    try {
        const { username, email, dateOfBirth } = req.body

        if (!username || !email || !dateOfBirth) {
            return res.status(400).json({ message: 'Username, email or date of birth is missing!' })
        }

        const existingEmail = await Celebrants.findOne({ email })
        if  (existingEmail) {
            return res.status(400).json({ message: 'Email already in use!' })
        }

        const existingUsername = await Celebrants.findOne({ username })
        if (existingUsername) {
            res.status(400).json({ message: 'Username already in use' })
        }

        const newCelebrant = new Celebrants({ username, email, dateOfBirth })
        await newCelebrant.save()

        res.status(201).json({
            message: 'Celebrant added successfully!',
            newCelebrant
        })

    } catch (error) {
        console.log('Error adding celebrant:', error)
        res.status(500).json({ message: 'Error adding celebrant!' })
    }
}