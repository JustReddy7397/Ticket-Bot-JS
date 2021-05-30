const db  = require("../db/db")
const discord = require("discord.js");
const manager = require("../manager/managerListener")
module.exports = async (client) => {

    await db;
    await manager(client);
    await client.user.setActivity(client.config.bot.status, {type: client.config.bot.type})
    await client.user.setPresence(client.config.bot.presence);
    console.log(`${client.user.tag} has awoken from the dungeons`)


    setTimeout(async () => {

        let channel = client.channels.cache.get(client.config.panel.channelId)
        let embed = new discord.MessageEmbed()
            .setTitle(client.config.panel.title)
            .setDescription(client.config.panel.description)
            .setColor(client.config.panel.color)
            .setFooter(client.user.username, client.user.displayAvatarURL())

        await channel.bulkDelete(1);
        let msg = await channel.send(embed);
        await msg.react(client.config.panel.emoji)
    }, 15000)


}