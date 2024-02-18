"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
// Define Joi Schema for Validation
const celebrantsJoiSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    dateOfBirth: joi_1.default.date().iso().required()
});
// Mongoose Schema Definition with Type Annotations
const celebrantSchema = new mongoose_1.Schema({});
// const celebrantSchema = new mongoose.Schema({
//     username: Joi.string().required(),
//     email: Joi.string().email().required(),
//     dateOfBirth: Joi.date().iso().required()
// })
// const Celebrants = mongoose.model('Celebrants', celebrantSchema)
// export default Celebrants
