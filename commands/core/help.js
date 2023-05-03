const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Montre la liste de toutes les commandes",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription('Quel bot de fou en vrai nan?')
            .addFields([{ name: `Activées - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') }])
            .setTimestamp()
            .setFooter({ text: 'Fait par HekkaLeBoss', iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ embeds: [embed] });
    },
};