
const discord = require("discord.js")
const database = require("../../db/schemas/TicketSchema")

module.exports.run = async (client, message,args) => {
    var pingEmbed = new discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(`**Bot ping** \n???ms \n\n **Latency Ping** \n${Math.round(client.ws.ping)}ms`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/754967793476042792/757207904481968228/er-removebg-preview.png`)
        .setColor("BLUE")
        .setFooter(message.guild.name);

    message.channel.send(pingEmbed).then(m =>{

        var ping = m.createdTimestamp - message.createdTimestamp;

        pingEmbed.setDescription(`**Bot ping** \n${ping}ms \n\n **Discord API Ping** \n${Math.round(client.ws.ping)}ms`)
        pingEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/754967793476042792/757207904481968228/er-removebg-preview.png`)

        m.edit(pingEmbed)
    });
}

module.exports.help = {
    name: "ping",
    description: "Show ping",
    category: "misc"
}



