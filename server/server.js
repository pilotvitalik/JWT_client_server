require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');

const PORT = process.env.PORT;
const app = express();

app.use(express.json);
app.use(cookieParser);
//app.use('/api', router);
//
// const start = async () => {
//     try {
//         app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
//     } catch {
//         console.log(err)
//     }
// }
//
// start();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})