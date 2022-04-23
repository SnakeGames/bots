const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");

module.exports = {
    name: "Ban",
    description: "Ban a person from this discord server",
    category: "Moderation",
    run: async (bot, message, args) => {

        //embeds\\
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
        .setTitle(`Member has been kicked!`)
        .setColor(embedcolors.GREEN)
        .addFields(
            {name: `The user has been kicked!`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //cant kick
        const cantkick = new Discord.MessageEmbed()
        .setTitle(`I/You cant kick this member.`)
        .setColor(embedcolors.RED)
        .addFields(
            {name: `I/You cant kick this member, check if I have permissions! Or this user isn't in the guild.`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
        //didn't mention
        const nomention = new Discord.MessageEmbed()
        .setTitle(`You didn't mention a user!`)
        .setColor(embedcolors.RED)
        .addFields(
            {name: `Plesae mention a user, so I can kick them.`, value: `\u200B`}
        )
        .setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)

        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
              .kick('Optional reason that will display in the audit logs')
              .then(() => {
                // We let the message author know we were able to kick the person
                message.reply({embed: kicked});
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply({embed: cantkick});
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            message.reply({embed: cantkick});
          }
          // Otherwise, if no user was mentioned
        } else {
          message.reply({embed: nomention});        
        if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.channel.send({embed: nperms})
        }
      }
    }

module.exports.config = {
    name: "kick",
    aliases: ["kick"]
}