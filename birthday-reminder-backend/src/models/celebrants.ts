import Joi from 'joi'
import mongoose from 'mongoose'

const celebrantSchema = new mongoose.Schema({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().iso().required()
})

const Celebrants = mongoose.model('Celebrants', celebrantSchema)

export default Celebrants