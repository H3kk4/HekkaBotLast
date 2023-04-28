const maxVol = client.config.opt.maxVol;

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume - 5)

    if (vol < 0) return inter.editReply({ content: `Je peux pas baisser encore plus le volume ${inter.member}... ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.editReply({ content: `Le volume est déjà le bon ${inter.member}... ❌`, ephemeral: true });

    const success = queue.node.setVolume(vol);

    return inter.editReply({ content: success ? `Le volume a été modifié à **${vol}**/**${maxVol}**% 🔊` : `Y'a eu un problème frr ${inter.member}... ❌`, ephemeral: true });
}