const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");




module.exports = {
	name: 'remove',
	category: 'Ticket',
	description: 'Removes a member to a specified ticket.',
	aliases: [],
	usage: 'remove <member>',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Incorrect Usage! Correct Usage:${prefix}remove <member>`);
			}
			const nperm = new Discord.MessageEmbed()
			.setTitle(`No permissions!`)
			.setColor(embedcolors.RED)
			.addField(`No permissions!`, `\u200b`, false)
		if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send(nperm);
			const madd = new Discord.MessageEmbed()
			.setTitle(`Member Added!`)
			.setColor(embedcolors.GREEN)
			.addFields(
				{name: `I have removed the following people from this ticket:`, value: `${member.user}`}
			)
			.setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					message.channel.send(madd);
				});
			}
			catch(e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}
	},
};

module.exports.config = {
    name: "remove",
    aliases: ["remove"]
}