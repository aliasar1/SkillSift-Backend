const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./config/dbConnection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true})); 
app.use(express.json());
connectDb();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./utils/routes')(app);

const port = process.env.PORT || 4078;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));