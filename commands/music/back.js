const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.node.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.editReply({ content: `Aucune musique précédente${inter.member}...❌`, ephemeral: true });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
            .setAuthor({ name: `Lecture de la piste **précédente** ✅` })
            .setColor('#2f3136')

        inter.editReply({ embeds: [BackEmbed] });
    },
};