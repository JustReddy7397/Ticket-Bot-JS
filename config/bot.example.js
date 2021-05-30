module.exports = {
    bot: {
        token: "<token>",
        prefix: "<prefix>",
        status: "tickets",
        presence: "ONLINE",
        type: "WATCHING",
        url: "" // for the streaming status
    },
    mongodb: {
        url: "<url>"
    },


    // Variables:
    // {user.tag} - Displays the tag of the member that opened the ticket
    // {user} - Mentions the member that opened the ticket
    // {user.username} - Displays the username of the member that opened the ticket
    // {user.discriminator} - Displays the discriminator of the member that opened the ticket
    // {ticket_number} - Displays the ticket number
    ticket: {
        supportRoleId: "<id>",
        categoryId: "<id>",
        hastebin_link: "<link>",
        transcriptId: "<id>",
        embed: {
            color: "BLUE",
            title: `Thanks for creating a ticket {user.tag}`,
            outside: "null", // The message that will be send outside the embed
            description: "Thanks for creating a ticket {user}\nThe support team will be with you as soon as possible\n\n:lock: | Close the ticket\n:newspaper: | Get the tickets transcript" // use `\n` to go to a new line
        }
    },
    panel: {
        channelId: "<id>",
        title: "Create a ticket!",
        description: "React to this message and a ticket will be opened for you",
        emoji: "🎫",
        color: "BLUE"
    },
    // Variables:
    // {message.guild.name} - Displays the guilds name
    // {message.guild.iconURL()} - Displays the guilds server icon
    embed: {
        footer: "{message.guild.name}",
        footer_url: "{message.guild.iconURL()}",
        timestamp: false
    }

}