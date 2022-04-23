module.exports.run = async (client) => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setActivity(`Made By Clerisy#0001`, {
    type: "WATCHING",
  });
};
