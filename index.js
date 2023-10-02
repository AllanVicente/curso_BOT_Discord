const {
    Client, 
    Events, 
    GatewayCloseCodes,
    GatewayIntentBits
} = require('discord.js');

const { token } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]//Guilds, forma como o discord chama os servidores
});

client.once(Events.ClientReady, c =>{
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

