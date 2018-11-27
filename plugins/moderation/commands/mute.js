const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.mentions.members.first();

  if (!tomute) return message.reply("Couldn't find user.");

  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Lack required permissions to mute them");

  let muterole = message.guild.roles.find(`name`, "muted");

  // if there is no mute role we'll make one
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }


  let mutetime = args[1];
  if (!mutetime) return message.reply("You didn't specify a time!");

  await tomute.addRole(muterole.id);
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(() => {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: "Mod"
}

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "mutes a user, C!mute [user], to unmute, remove the mute role",
  usage: "mute [user]"
};