const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows all commands of the bot",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  aliases: [""],
  ownerOnly: false,
  run: async (client, message, args) => {
    let helpEmbed = new MessageEmbed()
      .setTitle("Here are my commands")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter("Sparky v2")


      return message.channel.send(helpEmbed,{
      });

  },
};
