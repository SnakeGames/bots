const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");

module.exports = {
    name: "Ban",
    description: "Ban a person from this discord server",
    category: "Moderation",
    run: async (bot, message, args) => {
          //no permissions
          const nperms = new Discord.MessageEmbed()
          .setTitle(`You don't permissions`)
          .setColor(embedcolors.RED)
          .addFields(
              {name: `You don't have permissions to run this command`, value: `\u200B`}
          )
          .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
          //member has been kicked
          const kicked = new Discord.MessageEmbed()
          .setTitle(`Member has been banned`)
          .setColor(embedcolors.GREEN)
          .addFields(
              {name: `The user has been banned!`, value: `\u200B`}
          )
          .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
          //cant kick
          const cantkick = new Discord.MessageEmbed()
          .setTitle(`I/You cant ban this member.`)
          .setColor(embedcolors.RED)
          .addFields(
              {name: `I/You cant ban this member, check if I have permissions! Or this user isn't in the guild.`, value: `\u200B`}
          )
          .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
          //didn't mention
          const nomention = new Discord.MessageEmbed()
          .setTitle(`SplatRP Bot | Coded by, SnakeGames#5754`)
          .setColor(embedcolors.RED)
          .addFields(
              {name: `Plesae mention a user, so I can ban them.`, value: `\u200B`}
          )
          .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
  

      if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(nperms);

      var user = message.mentions.users.first();
      if(!user) return message.reply(nomention);
  
      var member;
  
      try {
          member = await message.guild.members.fetch(user);
      } catch(err) {
          member = null;
      }
  
      if(member){
          if(member.hasPermission('MANAGE_MESSAGES')) return message.reply(nperms);
      }
  
      var reason = args.join(" ").slice(22);
      if(!reason) return message.reply('You need to give a reason!');
  
      var channel = message.guild.channels.cache.find(c => c.name === 'staff-logs');
  
      var log = new Discord.MessageEmbed()
      .setTitle('User Banned')
      .setColor(embedcolors.GREEN)
      .addField('User:', user, true)
      .addField('By:', message.author, true)
      .addField('Reason:', reason)
      channel.send(log);
  
      var embed = new Discord.MessageEmbed()
      .setTitle('You were banned!')
      .setColor(embedcolors.RED)
      .setDescription(reason);
  
      try {
          await user.send(embed);
      } catch(err) {
          console.warn(err);
      }
  
      member.ban({reason: `Staff member: ${message.author.username}\nBan reason: ${reason}`})

      
      message.channel.send({embed: log});
    }

  }
    


module.exports.config = {
    name: "ban",
    aliases: ["ban"]
}