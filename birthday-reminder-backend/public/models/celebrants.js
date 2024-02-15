"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const celebrantSchema = new mongoose_1.default.Schema({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    dateOfBirth: joi_1.default.date().iso().required()
});
const Celebrants = mongoose_1.default.model('Celebrants', celebrantSchema);
exports.default = Celebrants;
