const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Aucune autre musique après ${inter.member}... ❌`, ephemeral: true });

    const methods = ['', '🔁', '🔂'];

    const songs = queue.tracks.length;

    const nextSongs = songs > 5 ? `Et **${songs - 5}** autre(s) morceau(x)...` : `Dans la playlist **${songs}** morceau(x)...`;

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`)

    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({ name: `Du serveur - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`La piste ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Hekka règne ici', iconURL: inter.member.avatarURL({ dynamic: true }) })

    inter.editReply({ embeds: [embed], ephemeral: true });
}
