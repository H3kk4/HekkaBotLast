const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {

    const Disconnect = new EmbedBuilder()
        .setAuthor({ name: `J\'ai été viré du salon, je vide la file d\'attente... ❌` })
        .setColor('#2f3136')

    queue.metadata.send({ embeds: [Disconnect] })
}
