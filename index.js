const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = proccess.env.token;
const sbID = "";
const sgID = "";
const ruseID = "";
const chsID = "";

//Error Handler
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});


//Terminal User Interface
client.on("ready", () => {
  console.log(`Link has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`(-l) Linking ${client.guilds.size} Servers`);

   // List servers the bot is connected to
   console.log("Servers:");
   client.guilds.forEach((guild) => {
       console.log(" - " + guild.name);
   })
});


//Schools Link
client.on('message', message => {
  if(message.author.bot) return;
  let guild = message.guild;
  let member = guild.member(message.author);
  let nickname = member ? member.displayName : null;
  if(message.channel.id === ruseID){
      var messageContent = message.content;
      client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
      client.channels.get(sgID).send(`${nickname} (JRAHS): ${messageContent}`);
      client.channels.get(chsID).send(`${nickname} (JRAHS): ${messageContent}`);
  } else if(message.channel.id === sbID){
    var messageContent = message.content;
    client.channels.get(sgID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(chsID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (JRAHS): ${messageContent}`);
  } else if(message.channel.id === chsID){
    var messageContent = message.content;
    client.channels.get(sgID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (JRAHS): ${messageContent}`);
  } else if(message.channel.id === sgID){
    var messageContent = message.content;
    client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(chsID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (JRAHS): ${messageContent}`);
  }
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "invite") {
        const inviteEmbed = {
            color: 0x9932CC,
            title: 'LinkBot Invite Link',
            description: 'https://discord.com/api/oauth2/authorize?client_id=730004103719288904&permissions=2147483639&scope=bot',
            thumbnail: {
                url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
            },
            
            timestamp: new Date(),
            footer: {
                text: 'Link by Joshua Koh',
                icon_url: 'https://cdn.discordapp.com/avatars/730004103719288904/ce269b42ef41f924bdeb4e3de9d0cb26.png?size=2048',
            },
        };
        
        message.channel.send({ embed: inviteEmbed });
        
      }
    
    
    
    
    
    
    
    
    
    
    
    
    //moderation commands
    
    if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(`${sayMessage}`);
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    if(command === "ping") {
        const m = await message.channel.send("Ping!");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }
    
});

//Client Login
client.login(token);