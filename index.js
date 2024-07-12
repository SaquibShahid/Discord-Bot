const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
require('./command');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

let data = null;
const getData = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}`)
    data = await response.json();
    return data.urls.regular;
}


// generating message responses

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (["Hi" , "hi" , "Hello" , "hello" , "hey" , "Hey"].includes(message.content)) {
        return message.reply({
            content: "Hello from Saquib's Bot",
        })
    }
    message.reply({
        content: "I don't get you , I'm still getting trained..."
    })
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
        }).catch((e)=>{
            interaction.reply({
                content : "Failed to generate random Image"
            })
        })

    }
})


client.login(process.env.DISCORD_TOKEN);