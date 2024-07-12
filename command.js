const dotenv = require('dotenv');
dotenv.config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name : "ping",
        description : "Replies with pong"
    },
    {
        name : "pic",
        description : "Replies with random picture"
    }
];


const rest = new REST().setToken(process.env.DISCORD_TOKEN);
// console.log(rest);

(async () => {
	try {
		console.log(`Started refreshing application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();