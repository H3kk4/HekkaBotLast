const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'skip the track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: success ? `La piste ${queue.currentTrack.title} s'est fait next ✅` : `Y'a eu un problème frr ${inter.member}... ❌` })


        return inter.editReply({ embeds: [SkipEmbed] });

    },
};