const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    queue.delete();

    const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Le devoir m'appelle, salut les cassos ✅` })


    return inter.editReply({ embeds: [StopEmbed], ephemeral: true });

}