const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {

    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: `Y'a eu un problème ! Oskour !`, iconURL: track.thumbnail })
        .setColor('#EE4B2B')

    queue.metadata.send({ embeds: [ErrorEmbed] })

    console.log(`Erreur émise par le player ${error.message}`);
}
