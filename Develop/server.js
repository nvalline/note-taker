const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving Static Files
app.use(express.static('public'));

// Public Routes
app.use('/', require('./routes/htmlRoutes'));

// API Routes
// app.use('/api', require('./routes/api/apiRoutes'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})