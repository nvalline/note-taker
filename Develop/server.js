const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public Routes
app.use('/', require('./routes/htmlRoutes'));

// API Routes
// app.use('/api', require('./routes/api/apiRoutes'));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})