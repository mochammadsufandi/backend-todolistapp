const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(
    cors({
        origin : "http://localhost:3001",
        allowedHeaders :  "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        optionsSuccessStatus: 200
    })
)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:'true'}));

app.use('/api',router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})