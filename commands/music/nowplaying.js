const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'veiw what is playing!',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });

        const track = queue.currentTrack;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = track.duration;

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();


        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(`Volume **${queue.node.volume}**%\nDurée **${trackDuration}**\nProgression ${progress}\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`)
            .setFooter({ text: 'Hekka règne ici', iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setColor('#2f3136')
            .setTimestamp()

        const saveButton = new ButtonBuilder()
            .setLabel('Save this track')
            .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
            .setStyle('Danger')

        const volumeup = new ButtonBuilder()
            .setLabel('Volume up')
            .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
            .setStyle('Primary')

        const volumedown = new ButtonBuilder()
            .setLabel('Volume Down')
            .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
            .setStyle('Primary')

        const loop = new ButtonBuilder()
            .setLabel('Loop')
            .setCustomId(JSON.stringify({ ffb: 'loop' }))
            .setStyle('Danger')

        const resumepause = new ButtonBuilder()
            .setLabel('Resume & Pause')
            .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
            .setStyle('Success')



        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);

        inter.editReply({ embeds: [embed], components: [row] });
    },
};