const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lyrics',
    description: 'get lyrics for the current track',
    voiceChannel: true,

    async execute({ inter }) {

        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });

        try {

            const search = await genius.songs.search(queue.currentTrack.title);

            const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
            if (!song) return inter.editReply({ content: `Aucunes paroles trouvées pour ${queue.currentTrack.title}... ❌`, ephemeral: true });
            const lyrics = await song.lyrics();
            const embeds = [];
            for (let i = 0; i < lyrics.length; i += 4096) {
                const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
                embeds.push(new EmbedBuilder()
                    .setTitle(`Les paroles : ${queue.currentTrack.title}`)
                    .setDescription(toSend)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter({ text: 'Hekka règne ici', iconURL: inter.member.avatarURL({ dynamic: true }) })
                );
            }
            return inter.editReply({ embeds: embeds });

        } catch (error) {
            inter.editReply({ content: `Erreur! Oskour | ❌`, ephemeral: true });
        }
    },
};

