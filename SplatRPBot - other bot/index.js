const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const embedcolors = require("./colors.json");

const bot = new Discord.Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] }, disableEveryone: true}); //this is what I forgot\\


bot.once('ready', () => {
  bot.user.setActivity("SplatRP", { type: 'STREAMING', url: "https://twitch.tv/snakegamess" })
  console.log('Zanki is online!')
})  


const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    return console.log("[LOGS] Couldn't find commands!");
  }

  jsfile.forEach((f, i) =>{
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    });
  });
});


bot.on("message", async message => {
  if (message.channel.type == "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if(commandfile) commandfile.run(bot,message,args)

});
bot.login(botconfig.token);