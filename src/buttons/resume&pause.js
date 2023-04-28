module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    const success = queue.node.resume();

    if (!success) queue.node.pause();


    return inter.editReply({ content: `${success ? `La piste ${queue.currentTrack.title} a été mise en pause ✅` : `La piste ${queue.currentTrack.title} a été reprise ✅`}`, ephemeral: true });
}