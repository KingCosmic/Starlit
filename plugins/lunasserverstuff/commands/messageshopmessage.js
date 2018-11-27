

// this is the code that runs when the command is called
// client is the client connected to the discord servers,
// message is the current message object
// args is an array with all the content of the message (example C!purchase Red args would = ['Red'])
// level is the users permission level
exports.run = (client, message, args, level) => {
  const embed = {
    "color": 16075907,
    "timestamp": "2018-08-26T00:15:51.318Z",
    "fields": [
      {
        "name": "<:cupcake:512241096689057792>Natsuki\'s Role Shop!",
        "value": "Command: C!purchase <itemname>, please only do this in <#478237091399204877>\nShop items are case sensitive, for example diamond won't work so say Diamond\nDo not include @, for example C!purchase Red"
      },
      {
        "name": "Badges",
        "value": ":shopping_cart: <@&498934549741436928> (Free)\n\n:shopping_cart: <@&505009084072853516> (Free)"
      },
      {
        "name": "Perks (These roles will give you access to certain channels and perks)",
        "value": ":shopping_cart: <@&466591284967112704> (Free)\n\n:shopping_cart: <@&477228773260132373>(Free)\n\n:shopping_cart: <@&486281853784031242> (750 <:cupcake:512241096689057792>) Allows you to create Instant invites\n\n:shopping_cart: <@&486277952670007296> (250 <:cupcake:512241096689057792>) Allows you to change your Nickname"
      },
      {
        "name": "About me",
        "value": ":shopping_cart: <@&498086262146859008> (Free)\n\n:shopping_cart: <@&498091875153215489> (Free)\n\n:shopping_cart: <@&498092758813376513> (Free)\n\n:shopping_cart: <@&475599368918138880> (Free)\n\n:shopping_cart: <@&475599795671793666> (Free)"
      },
      {
        "name": "Colours (All standard Colours are ~~50~~ 25 <:cupcake:512241096689057792>) [Page 1]",
        "value": ":shopping_cart: <@&479702886696353792>\n\n:shopping_cart: <@&470989076443693056>\n\n:shopping_cart: <@&470646969468059649>\n\n:shopping_cart: <@&474184898924642314>\n\n:shopping_cart: <@&479709913367576586>\n\n:shopping_cart: <@&470984082562482181>\n\n:shopping_cart: <@&470647745481408512>\n\n:shopping_cart: <@&479375788836388883>\n\n:shopping_cart: <@&479704868949327894>\n\n:shopping_cart: <@&470647245855784960>\n\n:shopping_cart: <@&470649603251765260>\n\n:shopping_cart: <@&479374556621176833>\n\n:shopping_cart: <@&479705381170446336>\n\n:shopping_cart: <@&479379488145276952>"
      },
      {
        "name": "Colours (All standard Colours are ~~50~~ 25 <:cupcake:512241096689057792>) [Page 2]",
        "value": " \n\n:shopping_cart: <@&470648209585471488>\n\n:shopping_cart: <@&479382886902923274>\n\n:shopping_cart: <@&479710200912412672>\n\n:shopping_cart: <@&474186014483546113>\n\n:shopping_cart: <@&479377970709135370>\n\n:shopping_cart: <@&470648493845774357>\n\n:shopping_cart: <@&479705175460937739>\n\n:shopping_cart: <@&470647526245007380>\n\n:shopping_cart: <@&470989424327655434>\n\n:shopping_cart: <@&479689543931658263>\n\n:shopping_cart: <@&479709517886783498>\n\n:shopping_cart: <@&479412829162569768>\n\n:shopping_cart: <@&479413661098835979>\n\n:shopping_cart: <@&470647933864378389>"
      },
      {
        "name": "Premium Colours (~~250~~ 125 <:cupcake:512241096689057792>)",
        "value": ":shopping_cart: <@&471019337604530177>\n\n:shopping_cart: <@&471020137546252299>\n\n:shopping_cart: <@&471019801389694986>\n\n:shopping_cart: <@&474186764370575361>\n\n:shopping_cart: <@&474186563635511296>\n\n:shopping_cart: <@&474186970977796098>\n\n:shopping_cart: <@&480128087393042453> (~~500~~ 250 <:cupcake:512241096689057792>)"
      }
    ]
  };
  
  message.channel.send({
   embed
  });
};

// this defines if the command is enabled, only usable in guilds, aliases it might
// have and the permission level required to run it
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Admin"
};

// this defines things for use in the help command.
exports.help = {
  name: "shopmessage",
  category: "System",
  description: "it shows all the avaialable items for purchase in the shop",
  usage: "shopmessage"
};