"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const celebrants_1 = __importDefault(require("./models/celebrants"));
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
app.post('/birthdays', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, dateOfBirth } = req.body;
    try {
        const newCelebrant = new celebrants_1.default({ username, email, dateOfBirth });
        yield newCelebrant.save();
        res.status(201).json({
            message: 'Celebrant added successfully!',
            newCelebrant
        });
    }
    catch (error) {
        console.error('Error adding celebrant:', error);
        res.status(500).json({ message: 'Error adding celebrant!' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
