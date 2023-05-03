const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'play',
    description: "Joue un morceau / ajoute une piste/playlist",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'le morceau en question',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `Aucun résultat... ❌` })
            .setColor('#2f3136')

        if (!res || !res.tracks.length) return inter.editReply({ embeds: [NoResultsEmbed] });

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.volume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: `Impossible de rejoindre le salon vocal... ❌` })
                .setColor('#2f3136')
            console.log("Impossible de rejoindre le salon vocal")
            return inter.editReply({ embeds: [NoVoiceEmbed] });
        }
        const playEmbed = new EmbedBuilder()
            .setAuthor({ name: `Chargement de ${res.playlist ? 'la playlist' : 'la piste'}... ✅, demandé par <@${inter.user.username}>` })
            .setColor('#2f3136')

        await inter.editReply({ embeds: [playEmbed] });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    },
};
