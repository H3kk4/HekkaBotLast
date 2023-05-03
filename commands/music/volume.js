const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'Ajuste le volume',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'le volume en question',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...  ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.node.volume === vol) return inter.editReply({ content: `C'est déjà le volume actuel en fait ${inter.member}... ❌`, ephemeral: true });

        const success = queue.node.setVolume(vol);


        const VolEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: success ? `Le volume a été modifié à **${vol}**/**${maxVol}**% 🔊` : `Y'a eu un problème frr ${inter.member}... essaie de redémarrer la box ❌` })


        return inter.editReply({ embeds: [VolEmbed] });
    },
};