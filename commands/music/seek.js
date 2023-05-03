const ms = require('ms');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Avance ou recule dans le morceau',
    voiceChannel: true,
    options: [
        {
            name: 'time',
            description: 'le timecode',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.reply}... ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.editReply({ content: `Le timecode indiqué est plus grand que le temps total du morceau en fait ${inter.member}... ❌\n*Essaie par exemple **5s, 10s, 20 secondes, 1min**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Avance rapide **${ms(timeToMS, { long: true })}** ✅` })


        inter.editReply({ embeds: [SeekEmbed] });
    },
};