"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./models/users"));
const env_1 = require("./env");
// initialize websocket server
require("./websocket");
const app = express_1.default();
mongoose_1.default.connect(env_1.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (err)
        throw err;
    console.log('MongoDB connected');
});
if (process.env.NODE_ENV !== 'production') {
    app.use(cors_1.default());
}
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('ok');
});
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid email/password' });
    }
    // TODO: Hashing the password
    try {
        const user = new users_1.default({ email, password });
        await user.save();
    }
    catch (error) {
        console.log('Error', error);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
    res.json({ status: 'ok' });
});
app.post('/api/refresh', () => { });
app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await users_1.default.findOne({ email, password }).lean();
    if (!user) {
        return res.json({
            status: 'error',
            error: 'Please check your email and password',
        });
    }
    const payload = jsonwebtoken_1.default.sign({ email }, env_1.JWT_SECRET_TOKEN);
    return res.json({ status: 'ok', data: payload });
});
app.listen(1337);
