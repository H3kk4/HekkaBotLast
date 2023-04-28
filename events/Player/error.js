const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {

    const ErrorEmbed = new EmbedBuilder()
        .setAuthor({ name: `Il y a eu un problème, oskour!`, iconURL: track.thumbnail })
        .setColor('#EE4B2B')

    queue.metadata.send({ embeds: [ErrorEmbed] })

    console.log(`Erreur émise par le bot : ${error.message}`);
}
