const express = require('express');
const mealsRouter = require('./routers/meals');
const reservationsRouter = require('./routers/reservations');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/meals', mealsRouter);

app.use('/api/reservations', reservationsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
