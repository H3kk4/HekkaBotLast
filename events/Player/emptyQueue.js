const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {
    const emptyQueue = new EmbedBuilder()
        .setAuthor({ name: `Toute la playlist a été lue ✅` })
        .setColor('#2f3136')

    queue.metadata.send({ embeds: [emptyQueue] })
}
