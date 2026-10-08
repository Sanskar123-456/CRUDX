require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/records', recordRoutes);

app.get('/', (req, res) => {
  res.send('Data Entry Program API is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));