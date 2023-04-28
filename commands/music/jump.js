const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to jump to',
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
        if (!track && !number) inter.editReply({ content: `Il faut utiliser les options pour utiliser cette commande ${inter.member}... ❌`, ephemeral: true });

        if (track) {
            const track_to_jump = queue.tracks.toArray().find((t) => t.title.tolowercase() === track.tolowercase() || t.url === track)
            if (!track_to_jump) return inter.editReply({ content: `impossible de trouver ${track} ${inter.member}... essaie avec l'url ou le nom complet du morceau ❌`, ephemeral: true });
            queue.node.jump(track_to_jump);
            return inter.editReply({ content: `Saut à ${track_to_jump.title}  ✅` });
        }
        if (number) {
            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title
            if (!trackname) return inter.editReply({ content: `Ce morceau n'a pas l'air d'exister ${inter.member}...❌`, ephemeral: true });
            queue.node.jump(index);

            const JumpEmbed = new EmbedBuilder()
                .setAuthor({ name: `Saut à ${trackname} ✅` })
                .setColor('#2f3136')

            inter.editReply({ embeds: [JumpEmbed] });
        }

    }
}