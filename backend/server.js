


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/upload');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
