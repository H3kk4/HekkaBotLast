const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Active ou désactive le mode boucle',
    voiceChannel: true,
    options: [
        {
            name: 'action',
            description: 'l\'action voulue',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'File d\'attente', value: 'enable_loop_queue' },
                { name: 'Désactiver', value: 'disable_loop' },
                { name: 'La piste', value: 'enable_loop_song' },
                { name: 'Autoplay', value: 'enable_autoplay' },
            ],
        }
    ],
    execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);
        let BaseEmbed = new EmbedBuilder()
            .setColor('#2f3136')

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture ${inter.member}... ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content: `Il faut d'abord désactiver le mode boucle en fait (/loop Disable) ${inter.member}... ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

                BaseEmbed.setAuthor({ name: success ? `Y'a eu un problème frr ${inter.member}... ❌` : `Mode boucle **activé**, ça va jamais s'arrêter 🔁, demandé par <@${inter.member}>` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content: `Il faut d'abord désactiver le mode boucle en fait (/loop Disable) ${inter.member}... ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `Y'a eu un problème frr ${inter.member}...  ❌` : `Mode boucle **désactivé**` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content: `Il faut désactiver le mode boucle de la musique d'abord (/loop Disable) ${inter.member}... ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `Y'a eu un problème frr${inter.member}... ❌` : `Mode boucle **activé** ça va jamais s'arrêter 🔁, demandé par ${inter.member}` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content: `Il faut désactiver le mode autoplay d'abord ${inter.member}... ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `Y'a eu un problème frr ${inter.member}... ❌` : `Autoplay **activé** la liste d'attente va être remplie automatiquement avec des morceaux similaires 🔁, demandé par ${inter.member}` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }

    },
};