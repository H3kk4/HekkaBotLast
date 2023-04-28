const { EmbedBuilder, InteractionType } = require('discord.js');

module.exports = async (client, inter) => {
    await inter.deferReply()
    if (inter.type === InteractionType.ApplicationCommand) {
        const DJ = client.config.opt.DJ;
        const command = client.commands.get(inter.commandName);


        if (!command) return inter.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Erreur! Oskour !')], ephemeral: true, }), client.slash.delete(inter.commandName)
        if (command.permissions && !inter.member.permissions.has(command.permissions)) return inter.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Il faut avoir les permissions pour effectuer cette commande`)], ephemeral: true, })
        if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) return inter.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Commande réservée à \`${DJ.roleName}\` `)], ephemeral: true, })
        if (command.voiceChannel) {
            if (!inter.member.voice.channel) return inter.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Tu n'es pas dans un salon vocal, dommage...`)], ephemeral: true, })
            if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) return inter.editReply({ embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`❌ | Tu n'es pas dans un salon vocal, dommage...`)], ephemeral: true, })
        }
        command.execute({ inter, client });
    }
    if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId)
        const file_of_button = customId.ffb
        const queue = player.nodes.get(inter.guildId);
        if (file_of_button) {
            delete require.cache[require.resolve(`../../src/buttons/${file_of_button}.js`)];
            const button = require(`../../src/buttons/${file_of_button}.js`)
            if (button) return button({ client, inter, customId, queue });
        }
    }
};