const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { getData } = require('./slash.command.helpers/random.pic');
const { generateShortUrl } = require('./slash.command.helpers/url.shortner');
dotenv.config();

require('./command');
require('./models/conn');
require('./server');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


// generating message responses

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (["Hi", "hi", "Hello", "hello", "hey", "Hey"].includes(message.content)) {
        return message.reply({
            content: "Hello from Saquib's Bot",
        })
    }
    if (message.content.startsWith("shortenUrl")) {
        generateShortUrl(message.content.split("shortenUrl")[1]).then((shortenURL) => {
            return message.reply({
                content: "Shorten Url " + `http://192.168.1.198:5000/url/${shortenURL}`
            })
        }).catch((e) => {
            console.log(e.message);
        })
    }
    else {
        message.reply({
            content: "I don't get you , I'm still getting trained..."
        })
    }
})



// generating slash command outputs

client.on("interactionCreate", (interaction) => {
    if (interaction.commandName == "ping") {
        interaction.reply({
            content: "pong"
        })
    } else if (interaction.commandName == "pic") {
        getData().then((pic) => {
            interaction.reply({
                content: pic
            })
        }).catch((e) => {
            interaction.reply({
                content: "Failed to generate random Image"
            })
        })
    }
})


client.login(process.env.DISCORD_TOKEN);