const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });


        if (queue.node.isPlaying()) return inter.editReply({ content: `La musique est déjà en lecture, ${inter.member}... ❌`, ephemeral: true })

        const success = queue.node.resume();

        const ResumeEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? `La piste ${queue.currentTrack.title} est de nouveau en lecture ✅` : `Y'a eu un problème ${inter.member}... ❌` })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
