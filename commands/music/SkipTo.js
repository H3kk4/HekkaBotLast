const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skipto',
    description: "skips to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to skip to',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const track = inter.options.getString('song');
        const number = inter.options.getNumber('number')

        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Il faut impérativement utiliser les options en fait ${inter.member}... ❌`, ephemeral: true });

        if (track) {
            const track_skipto = queue.tracks.toArray().find((t) => t.title.tolowercase() === track.tolowercase() || t.url === track)
            if (!track_skipto) return inter.editReply({ content: `Impossible de trouver ${track} ${inter.member}... essaie en utilisant l'url ou le nom complet ❌`, ephemeral: true });
            queue.node.skipTo(track_skipto);
            return inter.editReply({ content: `Morceau actuel sauté pour ${track_skipto.title}  ✅` });
        }
        if (number) {
            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title
            if (!trackname) return inter.editReply({ content: `Ce morceau n'a pas l'air d'exister ${inter.member}... ❌`, ephemeral: true });
            queue.node.skipTo(index);

            const skipToEmbed = new EmbedBuilder()
                .setAuthor({ name: `Saut à ${trackname} ✅` })
                .setColor('#2f3136')

            inter.editReply({ embeds: [skipToEmbed] });
        }

    }
}