require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(cookieParser())

const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOption))

app.use('/storage', express.static('storage'))

const PORT = process.env.PORT || 3300;
DbConnect()
app.use(express.json({ limit: '8mb' }))
app.use(router);
app.get('/', (req, res) => {
    res.send('Hello from other side ');
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));