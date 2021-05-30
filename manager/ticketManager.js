const discord = require("discord.js");
const createTicket = require("../features/createTicket")
const db = require("../db/schemas/TicketCountSchema")
const database = require("../db/schemas/TicketSchema")
const fetchAll = require("discord-fetch-all")
const fs = require("fs")
const blacklist = require("../db/schemas/TBlacklistSchema")

const hastebin = require("hastebin-gen")

const { MessageAttachment } = require("discord.js")
module.exports = (client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        const schema = await blacklist.findOne({
            user: user.id
        })
        const { message } = reaction;
        if(reaction.partial) await reaction.fetch();

        if(user.bot) return;

        const guild = reaction.message.guild;

        let guildDoc = await db.findOne({ guildID: guild.id });

        if(!guildDoc) {
            guildDoc = new db({
                guildID: guild.id,
                ticketCount: 0
            });

            await guildDoc.save()
        }




        if(reaction.message.channel.id === client.config.panel.channelId){
            if(reaction.emoji.name === client.config.panel.emoji){
                if(schema){
                    const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));
                    try{
                        for(const react of userReactions.values()){
                            await react.users.remove(user.id);
                        }
                    }catch(error) {
                        console.error("Could not remove reaction")
                    }

                    return user.send(`You are blacklisted from creating tickets!\n**Reason:** ${schema.reason}`)

                }
                const ticketDoc = await database.findOne({ guildID: guild.id, userID: user.id });

                if(ticketDoc){
                    const channel = guild.channels.cache.get(ticketDoc.channelID);
                    if(channel){
                        user.send(`You already have a ticket open ${user}`)
                        const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));
                        try{
                            for(const react of userReactions.values()){
                                await react.users.remove(user.id);
                            }
                        }catch(error){
                            console.error("Could not remove reaction")
                        }

                    }else{
                        await ticketDoc.deleteOne();


                        await createTicket( guild, user, guildDoc, database);
                        await reaction.channel.setTopic(`Ticket of ${user}, Reason: Default Ticket`);
                        const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));
                        try{
                            for(const react of userReactions.values()){
                                await react.users.remove(user.id);
                            }
                        }catch(error){
                            console.error("Could not remove reaction")
                        }


                    }
                }else{
                    await createTicket(guild, user, guildDoc, database);

                    const userReactions = reaction.message.reactions.cache.filter(react => react.users.cache.has(user.id));
                    try{
                        for(const react of userReactions.values()){
                            await react.users.remove(user.id);
                        }
                    }catch(error){
                        console.error("Could not remove reaction")
                    }
                }
            }
        }else{
            const ticketDoc = await database.findOne({ guildID: guild.id, userID: user.id});
            try {
                if (ticketDoc.msgID === reaction.message.id) {
                    if (reaction.emoji.name === "🔒") {
                        await ticketDoc.deleteOne()

                        const msgs = await fetchAll.messages(reaction.message.channel, {
                            reverseArray: true
                        })
                        const content = msgs.map(m => `${m.author.tag} - ${m.content}`);

                        const haste = await hastebin(content.join('\n'), {extension: "txt", url: client.config.ticket.hastebin_link})
                        let footer = client.config.embed.footer ? client.config.embed.footer : ""

                        let footer_url = client.config.embed.footer_url ? client.config.embed.footer_url : ""

                        footer = footer
                            .replace("{message.guild.name}", guild.name)
                        footer_url = footer_url
                            .replace("{message.guild.iconURL()}", guild.iconURL())
                        let embed = new discord.MessageEmbed()
                            .setTitle(`Ticket closed`)
                            .addField("Opened by", user, true)
                            .addField("Closed by", user, true)
                            .addField("Reason", "No reason specified")
                            .addField("Transcript", `[Click Here](${haste})`)
                            .setColor(client.config.ticket.embed.color)
                            .setFooter(footer)
                        if(client.config.embed.timestamp){
                            embed.setTimestamp()
                        }

                        let owo = client.channels.cache.find(x => x.id === client.config.ticket.transcriptId)

                        await message.channel.send(`:white_check_mark: This ticket will close in 5 seconds!`);

                        client.setTimeout(async () => {
                            await message.channel.delete();
                            user.send(`Your ticket has been closed\n${haste}`).catch(err => console.log(err));
                            owo.send(embed);


                        }, 5000)





                    } else if (reaction.emoji.name === "📰") {
                        const msgs = await fetchAll.messages(reaction.message.channel, {
                            reverseArray: true
                        })
                        const content = msgs.map(m => `${m.author.tag} - ${m.content}`);

                        hastebin(content.join('\n'), {extension: "txt", url: client.config.ticket.hastebin_link}).then(haste => {
                            reaction.message.channel.send(haste)
                        }).catch(error => console.log(error));

                    }
                }
            }catch (e) {
                return null;
            }
        }


        console.log("required 2q")

    })



}