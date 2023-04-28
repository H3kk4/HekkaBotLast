const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    const track = queue.currentTrack;

    const methods = ['disabled', 'track', 'queue'];

    const timestamp = track.timestamp;

    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.node.createProgressBar();


    const embed = new EmbedBuilder()
        .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setThumbnail(track.thumbnail)
        .setDescription(`Volume **${queue.volume}**%\nDurée **${trackDuration}**\nProgression ${progress}\nLoop mode **${methods[queue.repeatMode]}**\nDemandé par ${track.requestedBy}`)
        .setFooter({ text: 'Hekka règne ici', iconURL: inter.member.avatarURL({ dynamic: true }) })
        .setColor('ff0000')
        .setTimestamp()

    inter.editReply({ embeds: [embed], ephemeral: true });
}