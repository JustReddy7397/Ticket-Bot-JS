const mongoose = require("mongoose")


const TicketSchema = new mongoose.Schema({
    guildID: String,
    ticketCount: Number,
});

module.exports = mongoose.model("count", TicketSchema)