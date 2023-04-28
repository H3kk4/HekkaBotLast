const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Get the songs in the queue',
    voiceChannel: true,

    execute({ client, inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}...❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Plus aucune musique en attente ${inter.member}... ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.size;

        const nextSongs = songs > 5 ? `Et **${songs - 5}** autres chanson(s)...` : `Dans la playlist **${songs}** chanson(s)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (demandé par: ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({ name: `Server queue - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription(`Current ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
            .setTimestamp()
            .setFooter({ text: 'Fait par mes soins', iconURL: inter.member.avatarURL({ dynamic: true }) })

        inter.editReply({ embeds: [embed] });
    },
};