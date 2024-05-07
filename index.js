require('dotenv').config();

const express = require('express');

const sequelize = require('./app/config/database.config')
const models = require('./app/models');
const routes = require('./app/routes');

const app = express();
const PORT = process.env.PORT;

// parse requests of content-type - application/json
app.use(express.json());

//define all models
models();

// synce all the models with database
sequelize.sync()
.then(() => {
    console.log('Synced database')
    console.log(sequelize.models, 'Available models')
})
.catch((error) => {
    console.log(`Failed to sync database: ${error.message}`)
});

//import routes
routes(app);
app.use((req, res, next) => {
    res.status(404).send("Sorry, the page you're looking for doesn't exist.");
});

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})