require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');

const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json);
app.use(cookieParser);
app.use('/api', router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    } catch {
        console.log(err)
    }
}

start();