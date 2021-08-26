require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 7000;
const app = express();

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    } catch {
        console.log(err)
    }
}

start();