

module.exports = async (client, message) => {
    if(message.author.bot || message.channel.type === "dm") return;
    let prefix = client.config.bot.prefix;

    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");

    let command = messageArray[0];

    let args = messageArray.slice(1);


    let commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client, message, args);
}