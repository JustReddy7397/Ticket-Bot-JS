const ticketManager = require("./ticketManager")

module.exports = async (client) => {
    await ticketManager(client);
    console.log("required")
}