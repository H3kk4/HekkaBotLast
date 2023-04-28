module.exports = async (client) => {
    console.log(`Connecté au client ${client.user.username}\nLezgoooo !`);
    client.user.setActivity(client.config.app.playing);
};