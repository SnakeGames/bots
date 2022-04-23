const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");

module.exports = {
    name: "poll",
    description: "Create a simple yes or no poll",
    category: "fun",
    run: async (bot, message, args) => {
      const nperms = new Discord.MessageEmbed()
      .setTitle('No permissions!')
      .addField(`Error found!`, `You don't have permission to use this command! \n You need the ADMINISTRATOR `, false)
      .setColor(embedcolors.RED)
      .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
      const nmention = new Discord.MessageEmbed()
      .setTitle(`Where should I send this poll?`)
      .setColor(embedcolors.YELLOW)
      .addFields(
        {name: 'Please mention a channel (#)', value: `You didn't do it right, please do what is listed above!`}
      )
      .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
      const nquestion = new Discord.MessageEmbed()
      .setTitle(`What do you want to ask?`)
      .setColor(embedcolors.YELLOW)
      .addField(
        {name: `I didn't get what you wanted to ask,`, value: `Please put a question down so I can write the poll!`}
      )
      .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
      if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.channel.send({embed: nperms});
      const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);
      if (!channel) {
        return message.channel.send({embed: nmention});}
      let question = message.content.split(' ').splice(2)
        .join(" ");
      if (!question)
        return message.channel.send({embed: nmention});
      const Embed = new Discord.MessageEmbed()
        .setTitle(`New poll!`)
        .setDescription(`${message.author.username} asked, ${question}`)
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        .setColor(embedcolors.GREEN);
      let msg = await bot.channels.cache.get(channel.id).send(Embed);
      await bot.channels.cache.get(channel.id).send('@here')
      await msg.react("✅");
      await msg.react("❌");
      let psent = new Discord.MessageEmbed()
      .setTitle(`Poll sent!`)
      .setColor(embedcolors.GREEN)
      .addField(`The poll has been sent!`, `\u200B`)
      .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
      message.channel.send(psent)
    },
  };

  module.exports.config = {
    name: "polls",
    aliases: ["poll", "p"]
  }
