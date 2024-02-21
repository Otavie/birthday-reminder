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
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const celebrants_1 = __importDefault(require("./models/celebrants"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable Cors
app.use((0, cors_1.default)());
// Connect to Database
(0, db_1.default)();
app.use('/', routes_1.default);
// cron.schedule('*/5 * * * *', async() => {
node_cron_1.default.schedule('0 7 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todayDate = new Date();
        const celebrants = yield celebrants_1.default.find({
            dateOfBirth: {
                $gte: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).setHours(0, 0, 0, 0),
                $lt: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1).setHours(0, 0, 0, 0)
            }
        });
        if (celebrants.length > 0) {
            console.log('Sending birthday email to celebrants:', celebrants);
        }
        else {
            console.log('No birthday today!');
        }
    }
    catch (error) {
        console.error('Error checking for birthday:', error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
exports.default = app;
