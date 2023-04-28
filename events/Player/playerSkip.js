const { EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {

    const playerSkip = new EmbedBuilder()
        .setAuthor({ name: `Le skip de **${track.title}** a eu une erreur! ❌`, iconURL: track.thumbnail })
        .setColor('#EE4B2B')

    queue.metadata.send({ embeds: [playerSkip] })


}
