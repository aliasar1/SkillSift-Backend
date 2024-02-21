const express = require('express')
const connectDb = require('./config/dbConnection');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());
connectDb();

app.use('/admin', adminRoutes);



require('./utils/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));