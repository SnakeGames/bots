const colors = require('../../colors.json')
const MessagEmbed = require('discord.js')
module.exports = {
    name: 'tclose',
    aliases: ['trclose'],
    description: 'Closes the ticket.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (message.channel.name.includes('tech-report-')) {
            const member = message.guild.members.cache.get(message.channel.name.split('tech-report-').join(''));
            if (message.member.permissions.has('ADMINISTRATOR') || message.channel.name === `tech-report-${message.author.id}`) {
                message.channel.messages.fetch().then(async (messages) => {
                    const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

                    let response;
                    try {
                        response = await sourcebin.create([
                            {
                                name: ' ',
                                content: output,
                                languageId: 'text',
                            },
                        ], {
                            title: `Chat transcript for ${message.channel.name}`,
                            description: ' ',
                        });
                    }
                    catch (e) {
                        console.log(e)
                    }
                }).then(() => {
                    try {
                        message.channel.updateOverwrite(member.user, {
                            VIEW_CHANNEL: false,
                            SEND_MESSAGES: false,
                            ATTACH_FILES: false,
                            READ_MESSAGE_HISTORY: false,
                        }).then(() => {
                            message.channel.send(`Successfully closed ${message.channel}!`);
                            message.channel.delete();
                        });
                    }
                    catch (e) {
                        return message.channel.delete();
                        console.log(e)
                    }
                });
            }
        }
        else {
            return message.reply('❌ you cannot use this command here. Please use this command when you\'re closing a ticket.');
        }

    }
}
