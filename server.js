const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const absensiRoute = require('./routes/absensi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rute
app.use('/api/absensi', absensiRoute);

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
