const discord = require("discord.js")
const database = require("../../db/schemas/TicketSchema")

module.exports.run = async (client, message,args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return



    const user = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));


    const ticketDoc = await database.findOne( { channelID: message.channel.id } );

    if(!ticketDoc){
        message.delete();
        message.channel.send(`This channel is not a ticket ${message.author}`).then(m => m.delete({ timeout: 2000 }));
    }else{



        await message.channel.updateOverwrite(user.id, {

            CREATE_INSTANT_INVITE: false,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: false,
            ATTACH_FILES: true,
            ADD_REACTIONS: true
        })
        await message.channel.send(`:white_check_mark: Successfully removed ${user} from this ticket`)


    }
}

module.exports.help = {
    name: "remove",
    description: "Remove a user from the ticket",
    category: "tickets"
}



