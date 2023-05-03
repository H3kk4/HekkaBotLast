const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "Joue le morceau passé en paramètre juste après",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le son en question',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });

        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.editReply({ content: `Aucun résultat  ${inter.member}... ❌`, ephemeral: true });

        if (res.playlist) return inter.editReply({ content: `Cette commande ne prend pas en compte les playlists déso ${inter.member}... ❌`, ephemeral: true });

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
            .setAuthor({ name: `Le morceau sera joué en suivant 🎧, demandé par <@${inter.member.user.id}>` })
            .setColor('#2f3136')

        await inter.editReply({ embeds: [PlayNextEmbed] });


    }
}
