require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.HOST_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(17)
        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start();