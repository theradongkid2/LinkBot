const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.token;
//const sbID = "";
const sgID = "803195678595481631";
const ruseID = "803191990778724352";
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
  client.user.setActivity(`Linking Schools`);
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
  if(message.content.startsWith("-l")) return;
  if(message.channel.id === ruseID){
      var messageContent = message.content;
      //client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
      client.channels.get(sgID).send(`${nickname} (JRAHS): ${messageContent}`);
      client.channels.get(chsID).send(`${nickname} (JRAHS): ${messageContent}`);
  }/* else if(message.channel.id === sbID){
    var messageContent = message.content;
    client.channels.get(sgID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(chsID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (JRAHS): ${messageContent}`);
  } */else if(message.channel.id === chsID){
    var messageContent = message.content;
    client.channels.get(sgID).send(`${nickname} (SB): ${messageContent}`);
    //client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (SB): ${messageContent}`);
  }else if(message.channel.id === sgID){
    var messageContent = message.content;
    //client.channels.get(sbID).send(`${nickname} (JRAHS): ${messageContent}`);
    client.channels.get(chsID).send(`${nickname} (SG): ${messageContent}`);
    client.channels.get(ruseID).send(`${nickname} (SG): ${messageContent}`);
  }
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
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