const discord = require("discord.js");
const db = require("../db/schemas/TicketSchema")
const config = require("../config/bot")

module.exports = async (guild, user, guildDoc, database) => {

    let categoryID = config.ticket.categoryId;
    let SupportTeam = config.ticket.supportRoleId



    guildDoc.ticketCount +=1;

    await guildDoc.save();

    let ticketChannel = await guild.channels.create(`ticket-${guildDoc.ticketCount}`, {
        type: 'text'
    }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                async (channel) => {
                    await channel.updateOverwrite(guild.roles.cache.find(x => x.name === "@everyone"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    await channel.updateOverwrite(user.id, {

                        CREATE_INSTANT_INVITE: false,
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true
                    });


                    await channel.updateOverwrite(guild.roles.cache.find(x => x.id === SupportTeam), {
                        CREATE_INSTANT_INVITE: false,
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true
                    });


                    let description = config.ticket.embed.description ? config.ticket.embed.description : ""

                    description = description
                        .replace("{user}", user)
                        .replaceAll("{user.tag}", user.tag)
                        .replace("{user.username}", user.username)
                        .replace("{user.discriminator}", user.discriminator)
                    let title = config.ticket.embed.title ? config.ticket.embed.title : ""

                    title = title
                        .replace("{user}", user)
                        .replaceAll("{user.tag}", user.tag)
                        .replace("{user.username}", user.username)
                        .replace("{user.discriminator}", user.discriminator)
                        .replace("{ticket_number}", guildDoc.ticketCount)

                    let footer = config.embed.footer ? config.embed.footer : ""

                    let footer_url = config.embed.footer_url ? config.embed.footer_url : ""

                    footer = footer
                        .replace("{message.guild.name}", guild.name)
                    footer_url = footer_url
                        .replace("{message.guild.iconURL()}", guild.iconURL())

                    let embedParent = new discord.MessageEmbed()

                        .setTitle(title)
                        .setDescription(description)
                        .setColor(config.ticket.embed.color)
                        .setFooter(footer)
                    if(config.embed.timestamp){
                        embedParent.setTimestamp();
                    }

                    const msg = await channel.send(embedParent);
                    await msg.react("🔒")
                    await msg.react("📰")

                    const tickDoc = new database({
                        guildID: guild.id,
                        userID: user.id,
                        channelID: channel.id,
                        msgID: msg.id,
                    });
                    await tickDoc.save();









                }

            )

        }

    )
}