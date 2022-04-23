const colors = require('../../colors.json')
module.exports = {
    name: 'tnew',
    aliases: ['tr', 'newtr', 'new'],
    description: 'Creates a new ticket.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("I need the `MANAGE_CHANNELS` permission to use this comamnd");
        if (message.guild.channels.cache.find(channel => channel.name === `tech-report-${message.author.id}`)) {
            return message.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
        }

        message.guild.channels.create(`tech-report-${message.author.id}`, {
            permissionOverwrites: [
                {
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
            type: 'text',
        }).then(async channel => {
            message.reply(`✔ you have successfully created a tr! Please click on ${channel} to view your tr.`);
            channel.send(`Hi. TR! <@&965451601433198632> Go on.. Say whats wrong!`);
            let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
            if (logchannel) {
                logchannel.send(`Ticket ${message.author.id} created. Click the following to veiw <#${channel.id}>`);
            }
        });

    }
}