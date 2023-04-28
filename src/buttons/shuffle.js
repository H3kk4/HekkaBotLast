const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Aucune musique après celle ci ${inter.member}... ❌`, ephemeral: true });

    await queue.tracks.shuffle();

    const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Mode aléatoire sur **${queue.tracks.size}** morceau(x)! ✅` })


    return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true });
}