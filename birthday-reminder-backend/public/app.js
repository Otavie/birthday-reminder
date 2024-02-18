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
    try {
        // Validate Required Field
        const { username, email, dateOfBirth } = req.body;
        if (!username || !email || !dateOfBirth) {
            return res.status(400).json({ message: 'Username, email or password is missing!' });
        }
        // Ensure Username and Email are Unique Using Model Method
        const existingUsername = yield celebrants_1.default.findOne({ username });
        if (existingUsername) {
            throw new Error('Username already in use!');
        }
        const existingEmail = yield celebrants_1.default.findOne({ email });
        if (existingEmail) {
            throw new Error('Email already in use!');
        }
        // Create New Celebrant
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
app.get('/birthdays', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const celebrants = yield celebrants_1.default.find();
        res.status(200).json({
            message: "All celebrants details",
            celebrants
        });
    }
    catch (error) {
        console.error('Error getting all the celebrants details:', error);
        res.status(500).json({ message: 'Error getting all the celebrants!' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
