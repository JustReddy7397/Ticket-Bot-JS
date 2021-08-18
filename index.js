const discord = require("discord.js")
const client = new discord.Client({partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "USER", "REACTION"]})
const chalk = require("chalk")
const { readdirSync, readdir } = require("fs");
const fs = require("fs")
const { sep } = require("path");
const config = require("./config/bot")
client.config = config;
client.commands = new discord.Collection();
client.info = [];


const dir = "./commands"

readdirSync(dir).forEach(dirs => {

    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

    if(!commands) return;

    for (const file of commands) {

        const pull = require(`${dir}/${dirs}/${file}`);

        client.commands.set(pull.help.name, pull);

        if(pull.help.alias){

            pull.help.alias.forEach(a => {

                client.commands.set(a, pull)

            })

        }

        client.info.push(pull.help)

        console.log(chalk.cyan(`${pull.help.name} loaded`, chalk.red(`|`), chalk.blue(dirs)))

    }

})


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
}




client.login(`${config.bot.token}`)
