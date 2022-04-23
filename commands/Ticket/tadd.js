const colors = require('../../colors.json')
module.exports = {
    name: 'tadd',
    aliases: ['tadd'],
    description: 'Adds a member to a specified ticket.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.channel.send("❌ I need the `MANAGE_WEBHOOKS` permission to use this comamnd");
        if (message.channel.name.includes('tech-report-')) {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
            if (!member) {
                return message.channel.send(`Incorrect Usage! Correct Usage: \`${config.prefix}add <member>\``);
            }
            try {
                message.channel.updateOverwrite(member.user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGE_HISTORY: true,
                }).then(() => {
                    message.channel.send(`✔ Successfully added ${member} to ${message.channel}`);
                });
            }
            catch (e) {
                return message.channel.send('**❌ An error occurred, please try again!**');
            }
        }
    }
}
