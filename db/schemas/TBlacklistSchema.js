const discord = require("discord.js")
const mongoose = require("mongoose");


let HistorySchema = new mongoose.Schema({
    user: String,
    reason: String
});

module.exports = mongoose.model('blacklist', HistorySchema);