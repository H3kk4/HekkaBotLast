module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Aucune musique n'est en lecture${inter.member}...❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `Il n'y avait rien avant celle là  ${inter.member}... ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content: `Lecture de la piste **précédente** ✅`, ephemeral: true });
}
