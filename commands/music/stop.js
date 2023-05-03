const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Arrête la lecture',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });

        queue.delete();

        const StopEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Le devoir m'appelle, merci de m'avoir libéré <@${inter.user.username}> ✅` })


        return inter.editReply({ embeds: [StopEmbed] });

    },
};