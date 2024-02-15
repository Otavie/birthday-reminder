"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(DB_URI);
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to database!');
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Disconnected from database!');
});
mongoose_1.default.connection.on('error', (error) => {
    console.log('Error connecting to database:', error);
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
