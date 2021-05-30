module.exports = {
    bot: {
        token: "NzM2OTEyMTE3MzY1NjA0NDAy.Xx1s4w.2X5pnEyu95Ccwc_wCdW1kkb6LN4",
        prefix: "-",
        status: "tickets",
        presence: "ONLINE",
        type: "WATCHING",
        url: "" // for the streaming status
    },
    mongodb: {
        url: "mongodb+srv://Reddy:Toppie12@uzo.lnqt8.mongodb.net/ticket"
    },


    // Variables:
    // {user.tag} - Displays the tag of the member that opened the ticket
    // {user} - Mentions the member that opened the ticket
    // {user.username} - Displays the username of the member that opened the ticket
    // {user.discriminator} - Displays the discriminator of the member that opened the ticket
    // {ticket_number} - Displays the ticket number
    ticket: {
        supportRoleId: "736597416811429968",
        categoryId: "753903693560152094",
        hastebin_link: "https://starb.in",
        transcriptId: "753905512155971605",
        embed: {
            color: "BLUE",
            title: `Thanks for creating a ticket {user.tag}`,
            description: "Thanks for creating a ticket {user}\nThe support team will be with you as soon as possible\n\n:lock: | Close the ticket\n:newspaper: | Get the tickets transcript" // use `\n` to go to a new line
        }
    },
    panel: {
        channelId: "754705321846374441",
        title: "Create a ticket!",
        description: "React to this message and a ticket will be opened for you!",
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