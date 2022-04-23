const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");

module.exports = {
    name: "warm",
    description: "Warn a user",
    category: "Moderation",
    run: async (bot, message, args) => {
        //no permse
        const noperms = new Discord.MessageEmbed()
        .setTitle(`No permissions`)
        .setColor(embedcolors.RED)
        .addFields(
            {name: `You don't have permissions to use this command!`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //no permse end

        //start of command
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(noperms);

        //no mention user e
        const nomention = new Discord.MessageEmbed()
        .setTitle(`Who should I warn?`)
        .setColor(embedcolors.RED)
        .addFields(
            {name: `You didn't mention someone to warn!`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //endof nomention user e
        var user = message.mentions.users.first();
        if(!user) return message.channel.send(nomention);
    
        var member;
    
        try {
            member = await message.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }
        //not in server
        const notinserver = new Discord.MessageEmbed()
        .setTitle(`I cant find this user.`)
        .setColor(embedcolors.RED)
        .addFields(
            {name: `I cant find this user, make sure they're in the discord server!`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //end of nis
        if(!member) return message.reply(notinserver);
    
        var reason = args.splice(1).join(' ');
        //reason
        const reasonembed = new Discord.MessageEmbed()
        .setTitle(`Why are you warning this person?`)
        .setColor(embedcolors.YELLOW)
        .addFields(
            {name: `I need to know the reason for this warn, for logging purposes!`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //end of reason
        if(!reason) return message.reply(reason);
    
        var channel = message.guild.channels.cache.find(c => c.name === 'staff-logs');
    
        var log = new Discord.MessageEmbed()
        .setTitle('User Warned')
        .setColor(embedcolors.GREEN)
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        channel.send(log);
    
        var embed = new Discord.MessageEmbed()
        .setTitle('You were warned!')
        .setColor(embedcolors.RED)
        .setDescription(reason);
    
        try {
            user.send(embed);
        } catch(err) {
            console.warn(err);
        }
    
        message.channel.send({embed: log});
    }
}

module.exports.config = {
    name: "warn",
    aliases: ["warn"]
  }