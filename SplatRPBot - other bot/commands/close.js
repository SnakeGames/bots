const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const embedcolors = require("../colors.json");
const moment = require("moment");


/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const url = 'https://hastebin.com/documents';
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close',
	category: 'Ticket',
	description: 'Closes the ticket.',
	aliases: [],
	usage: 'close',
	userperms: [],
	botperms: [],
	run: async (client, message, args, channel) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));						
			if(message.member.hasPermission('MANAGE_CHANNELS') || message.channel.name === `open-ticket-${message.author.username}`) {
				message.channel.messages.fetch().then(async (messages) => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Successfully closed ${message.channel}`);
						});
					}
					catch (e) {
						const closeembed = new Discord.MessageEmbed()
						.setTitle(`Ticket has been closed!`)
							.setColor(embedcolors.GREEN)
							.addFields(
								{
									name: `Your ticket has been closed`, value: 'I will be deleting this channel in `5 seconds`'
								})
							.setFooter(`SplatRP Bot | Coded by, SnakeGames#5754`)
						message.channel.send(closeembed)
						message.channel.setName(`closed-ticket-${message.author.username}`)
						setTimeout(function () {
							message.channel.delete();
						}, 5000);
					{
							}
					}
			})
		} else {
			return message.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
		  }
		  message.delete()
	  }
  }
}

module.exports.config = {
    name: "close",
    aliases: ["close"]
}