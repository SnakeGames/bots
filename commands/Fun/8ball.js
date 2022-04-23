const { MessageEmbed } = require("discord.js");
const colors = require('./../../colors.json')

module.exports = {
    name: "8ball",
    aliases: "8ball",
    description: "There is a big chance I insult you!",
    category: "fun",
    run: async (bot, message, args) => {
      let question = message.content.split('-8ball ')
        .join(" ");
    let results = [`As I see it, yes.`, `Ask again later.`, `Better not tell you now.`, `Cannot predict now.`, `Concentrate and ask again.`, `Don’t count on it.`, `Yes`, `Yes - Definitely`, `Outlook good`, `Outlook not so good`]
    let result = Math.floor((Math.random() * results.length));
    //embed\\
    const bembed = new MessageEmbed()

    .setTitle(`I HAVE SPOKEN`)
    .addField(`Here is your responce:`, `Your question: ${question}\n What my 8ball says: ${results[result]}`)
    .setFooter(`Spark`)
    message.channel.send(bembed)
    },
};