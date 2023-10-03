const {
    Client,
    Collection,
    Events, 
    GatewayCloseCodes,
    GatewayIntentBits
} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { token } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]//Guilds, forma como o discord chama os servidores
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath)
.filter(file=>file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute in command'){
        client.commands.set(command.data.name, command);
    }else{
        console.log(`[WARNING] The command ar ${filePath} is missing a require " data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, async interection =>{
    const command = interection.client.command.get(interection.commandName);

    if(!command){
        console.error(
            `No command matching ${interection.commandName} was found.`
        );
    }

    try{
        await command.execute(interection);
    }catch(error){
        console.error(error);
    }
});

client.once(Events.ClientReady, c =>{
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

