const mongoose = require("mongoose");


let TicketsSchema = new mongoose.Schema({
    guildID: String,
    userID: String,
    channelID: String,
    msgID: String,
});

module.exports = mongoose.model("tickets", TicketsSchema)