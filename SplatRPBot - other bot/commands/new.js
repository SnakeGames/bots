const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");

module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	aliases: [],
	usage: 'new',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
		let question = message.content.split(`${botconfig.prefix}new `).join(" ");

		const newticket = new Discord.MessageEmbed()
		.setTitle(`New Ticket!`)
		.setColor(embedcolors.GREEN)
		.addFields(
			{name: `You have created a ticket, please be patient.`, value: `Ticket Creator: <@${message.author.id}>\n Reason: ${question}`}
		)
		.setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)


		if (message.guild.channels.cache.find(channel => channel.name === `open-ticket-${message.author.username}`)) {
			return message.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
		}

		message.guild.channels.create(`open-ticket-${message.author.username}`, {

			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.cache.find(role => role.name === "Support"),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			channel.send(`@here`, {embed: newticket})

		const oticket = new Discord.MessageEmbed()
		.setTitle(`New Ticket!`)
		.setColor(embedcolors.GREEN)
		.addFields(
			{name: `A ticket has been opened by:`, value: `${message.author.username}\n Ticket: <#${channel.id}>\n Reason: ${question}`}
		)
		.setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(oticket);
			}
			message.delete()
		});
	},
};

// to add a custom role copy this and paste it as explained in the video and replace role-id with the role ya want :D
// {
//					id: message.guild.roles.cache.get("role-id"),
//					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
//				}

module.exports.config = {
    name: "new",
    aliases: ["new"]
}