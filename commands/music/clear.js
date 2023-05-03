const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'clear',
    description: 'Vide la file d\'attente',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: `Plus aucune musique en attente ${inter.member}...❌`, ephemeral: true });

        await queue.tracks.clear();

        const ClearEmbed = new EmbedBuilder()
            .setAuthor({ name: `La file d'attente est de nouveau vide. 🗑️` })
            .setColor('#2f3136')

        inter.editReply({ embeds: [ClearEmbed] });

    },
};