const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'Ajoute un filtre',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'le filtre',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter, client }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase().toString());

        if (!filter) return inter.editReply({ content: `Ce filtre n'existe pas ${inter.member}... ❌\n${actualFilter ? `Filtre déjà actif ${actualFilter}.\n` : ''}Liste des filtres : ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filter)

        const FilterEmbed = new EmbedBuilder()
            .setAuthor({ name: `Le filtre ${filter} est maintenant **${queue.filters.ffmpeg.isEnabled(filter) ? 'actif' : 'désactivé'}** ✅\n*PS : Plus la musique est longue, plus ça va prendre de temps*` })
            .setColor('#2f3136')

        return inter.editReply({ embeds: [FilterEmbed] });
    },
};