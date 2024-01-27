const express = require('express')
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const app = express();
app.use(express.json());
connectDb();

require('./utils/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));