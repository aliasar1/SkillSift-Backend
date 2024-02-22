const express = require('express')
const connectDb = require('./config/dbConnection');
require('dotenv').config();
const jobseekerRoutes = require('./routes/jobSeekerRoutes');

const app = express();
app.use(express.json());
connectDb();

app.use('/jobseeker', jobseekerRoutes);
require('./utils/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));