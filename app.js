const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:'true'}));

app.use('/api',router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})