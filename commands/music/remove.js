const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "Enlève une piste de la file d'attente",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le nom ou l\'url',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'la destination dans la file d\'attente',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const number = inter.options.getNumber('number')
        const track = inter.options.getString('song');

        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Il faut utiliser des options pour cette commande ${inter.member}... ❌`, ephemeral: true });

        const BaseEmbed = new EmbedBuilder()
            .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) return inter.editReply({ content: `Impossible de trouver ${track} ${inter.member}... essaie d'utiliser l'url ou le nom complet ❌`, ephemeral: true });
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({ name: `La piste ${track_to_remove.title} est supprimée de la file d'attente ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if (!trackname) return inter.editReply({ content: `Ce morceau n'a pas l'air d'exister ${inter.member}...❌`, ephemeral: true });

            queue.removeTrack(index);

            BaseEmbed.setAuthor({ name: `La piste ${trackname} a bien été supprimée de la file d'attente ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }



    }
}
