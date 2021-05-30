const mongoose = require("mongoose");
const config = require("../config/bot");
const chalk = require("chalk");


mongoose.connect(config.mongodb.url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => error
        ? console.log(chalk.red('[DATABASE] Failed to connect to the MongoDB database'))
        : console.log(chalk.green('[DATABASE] Connected to the MongoDB database')));