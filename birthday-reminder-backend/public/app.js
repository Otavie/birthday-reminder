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
const celebrants_1 = __importDefault(require("./models/celebrants"));
const db_1 = __importDefault(require("./database/db"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Connect to Database
(0, db_1.default)();
app.use('/', routes_1.default);
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
