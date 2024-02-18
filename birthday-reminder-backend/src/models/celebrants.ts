import Joi from 'joi'
import mongoose, { Schema, Document, Model } from 'mongoose'

// Define Interface for Celebrant Document
interface ICelebrant extends Document {
    username: string;
    email: string;
    dateOfBirth: Date
}

// Define Joi Schema for Validation
// Request Validation Schema
const requestSchema = Joi.object({
    username: Joi.string().required().description('Username is required!'),
    email: Joi.string().email().required().description('Email is required!'),
    dateOfBirth: Joi.date().iso().required().description('Date of birth is required!')
})

// Mongoose Schema Definition with Type Annotations
// Database Schema
const celebrantSchema: Schema<ICelebrant> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
})

// Celebrant Model
const Celebrants: Model<ICelebrant> = mongoose.model<ICelebrant>('Celebrants', celebrantSchema)

export default Celebrants