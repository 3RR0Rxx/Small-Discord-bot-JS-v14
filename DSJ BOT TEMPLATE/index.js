const discord = require('discord.js')
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const commandLoader = require('./loader/load_commands');
const config = require('./config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.commands = new discord.Collection();
client.setMaxListeners(100);
commandLoader(client);

client.once('ready', () => {
    console.log(`------------------------------------------------\nConnected to "${config.xKey}" as ${client.user.tag}`);
    client.user.setPresence({
        activities: [{ name: "what you want to display in their activity", type: ActivityType.Watching }],
    });
    client.user.setStatus(""); //idle, online, dnd, invisible (default is online)
});

//command exec
client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content.startsWith(config.prefix + "what you want the user say to exec the command")) {
        client.commands.get("command name").run(msg, client);
    }
});


//CONNECTION
client.login(config.token);