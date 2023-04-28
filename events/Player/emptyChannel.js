const { EmbedBuilder } = require('discord.js');
module.exports = (queue) => {

    const emptyChannel = new EmbedBuilder()
        .setAuthor({ name: `Y\'a personne? Bon bah j\'y vais... ❌` })
        .setColor('#2f3136')

    queue.metadata.send({ embeds: [emptyChannel] })
}
