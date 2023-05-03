module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const success = queue.node.skip();

    return inter.editReply({ content: success ? `La piste ${queue.currentTrack.title} s'est faite next ✅` : `Y'a eu un problème frr ${inter.member}... ❌`, ephemeral: true });
}