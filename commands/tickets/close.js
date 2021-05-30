const discord = require("discord.js")
const database = require("../../db/schemas/TicketSchema")
const hastebin = require("hastebin-gen");
const fetchAll = require("discord-fetch-all");

module.exports.run = async (client, message,args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    const ticketDoc = await database.findOne( { channelID: message.channel.id } );

    if(!ticketDoc){

        message.delete();
        message.channel.send(`This channel is not a ticket ${message.author}`).then(m => m.delete({ timeout: 2000 }));
    }else{
        let reason = args.join(' ');
        if(!reason) reason = "No reason specified"
        const msgs = await fetchAll.messages(message.channel, {
            reverseArray: true
        })
        const content = msgs.map(m => `${m.author.tag} - ${m.content}`);
        let footer = client.config.embed.footer ? client.config.embed.footer : ""

        let footer_url = client.config.embed.footer_url ? client.config.embed.footer_url : ""
        const haste = await hastebin(content.join('\n'), {extension: "txt", url: client.config.ticket.hastebin_link})

        footer = footer
            .replace("{message.guild.name}", message.guild.name)
        footer_url = footer_url
            .replace("{message.guild.iconURL()}", message.guild.iconURL())
        let embed = new discord.MessageEmbed()
            .setTitle(`Ticket closed`)
            .addField("Opened by", ticketDoc.userID.toString(), true)
            .addField("Closed by", message.author, true)
            .addField("Reason", reason)
            .addField("Transcript", `[Click Here](${haste})`)
            .setColor(client.config.ticket.embed.color)
            .setFooter(footer)
        if(client.config.embed.timestamp){
            embed.setTimestamp()
        }

        let owo = client.channels.cache.find(x => x.id === client.config.ticket.transcriptId)

        await message.channel.send(`:white_check_mark: This ticket will close in 5 seconds!`);

        client.setTimeout(async () => {
            message.channel.delete();                                        owo.send(embed);


        }, 5000)



        await ticketDoc.deleteOne();
    }

}

module.exports.help = {
    name: "close",
    description: "Close a ticket",
    category: "tickets"
}



