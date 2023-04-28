const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });

        if (queue.node.isPaused()) return inter.editReply({ content: `La piste est en pause! ${inter.member} ❌`, ephemeral: true })

        const success = queue.node.setPaused(true);

        const PauseEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? `La piste ${queue.currentTrack.title} est mise en pause ✅` : `Y'a eu un problème, ${inter.member}... ❌` })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
// embed update stoped here