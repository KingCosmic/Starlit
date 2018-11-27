
const items = {
  'Anime': {
    name: 'Anime',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Anime'), 'Purchased');
    }
  },
  'Gaming': {
    name: 'Gaming',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Gaming'), 'Purchased');
    }
  },
  'NSFW': {
    name: 'NSFW',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'NSFW'), 'Purchased');
    }
  },
  'Spoiler': {
    name: 'Spoiler',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Spoiler'), 'Purchased');
    }
  },
  'Red': {
    name: 'Red',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Red'), 'Purchased');
    }
  },
  'Fire Red': {
    name: 'Fire Red',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Fire Red'), 'Purchased');
    }
  },
  'Nightmare Red': {
    name: 'Nightmare Red',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Nightmare Red'), 'Purchased');
    }
  },
  'Cherry Red': {
    name: 'Cherry Red',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Cherry Red'), 'Purchased');
    }
  },
  'Blue': {
    name: 'Blue',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Blue'), 'Purchased');
    }
  },
  'Blossom Blue': {
    name: 'Blossom Blue',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Blossom Blue'), 'Purchased');
    }
  },
  'Sea Blue': {
    name: 'Sea Blue',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Sea Blue'), 'Purchased');
    }
  },
  'Evening Blue': {
    name: 'Evening Blue',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Evening Blue'), 'Purchased');
    }
  },
  'Green': {
    name: 'Green',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Green'), 'Purchased');
    }
  },
  'Leaf Green': {
    name: 'Leaf Green',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Leaf Green'), 'Purchased');
    }
  },
  'Lush Green': {
    name: 'Lush Green',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Lush Green'), 'Purchased');
    }
  },
  'Grass Green': {
    name: 'Grass Green',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Grass Green'), 'Purchased');
    }
  },
  'Orange': {
    name: 'Orange',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Orange'), 'Purchased');
    }
  },
  'Spicy Orange': {
    name: 'Spicy Orange',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Spicy Orange'), 'Purchased');
    }
  },
  'Sweet Orange': {
    name: 'Sweet Orange',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Sweet Orange'), 'Purchased');
    }
  },
  'Silly Orange': {
    name: 'Silly Orange',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Silly Orange'), 'Purchased');
    }
  },
  'Pink': {
    name: 'Pink',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Pink'), 'Purchased');
    }
  },
  'Pleasant Pink': {
    name: 'Pleasant Pink',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Pleasant Pink'), 'Purchased');
    }
  },
  'Tasty Pink': {
    name: 'Tasty Pink',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Tasty Pink'), 'Purchased');
    }
  },
  'Cute Pink': {
    name: 'Cute Pink',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Cute Pink'), 'Purchased');
    }
  },
  'Yellow': {
    name: 'Yellow',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Yellow'), 'Purchased');
    }
  },
  'Sunshine Yellow': {
    name: 'Sunshine Yellow',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Sunshine Yellow'), 'Purchased');
    }
  },
  'Electric Yellow': {
    name: 'Electric Yellow',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Electric Yellow'), 'Purchased');
    }
  },
  'Shiny Yellow': {
    name: 'Shiny Yellow',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Shiny Yellow'), 'Purchased');
    }
  },
  'Purple': {
    name: 'Purple',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Purple'), 'Purchased');
    }
  },
  'Sunrise Purple': {
    name: 'Sunrise Purple',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Sunrise Purple'), 'Purchased');
    }
  },
  'Mystical Purple': {
    name: 'Mystical Purple',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Mystical Purple'), 'Purchased');
    }
  },
  'Night Purple': {
    name: 'Night Purple',
    price: 25,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Night Purple'), 'Purchased');
    }
  },
  'Rose Gold': {
    name: 'Rose Gold',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Rose Gold'), 'Purchased');
    }
  },
  'Magic Magenta': {
    name: 'Magic Magenta',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Magic Magenta'), 'Purchased');
    }
  },
  'Tropical Turquoise': {
    name: 'Tropical Turquoise',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Tropical Turquoise'), 'Purchased');
    }
  },
  'Ruby Red': {
    name: 'Ruby Red',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Ruby Red'), 'Purchased');
    }
  },
  'Emerald Green': {
    name: 'Emerald Green',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Emerald Green'), 'Purchased');
    }
  },
  'Sapphire Blue': {
    name: 'Sapphire Blue',
    price: 125,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Sapphire Blue'), 'Purchased');
    }
  },
  'Diamond': {
    name: 'Diamond',
    price: 250,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Diamond'), 'Purchased');
    }
  },
  'Team Natsuki': {
    name: 'Team Natsuki',
    price: 0,
    purchase: (client, member) => {	
      return member.addRole(member.guild.roles.find('name', 'Team Natsuki'), 'Purchased');
    }
  },
  'Nickname Pass': {
    name: 'Nickname Pass',
    price: 250,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Nickname Pass'), 'Purchased');
    }
  },
  'Invite Pass': {
    name: 'Invite Pass',
    price: 725,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Invite Pass'), 'Purchased'); 
    }
  },
  'Girl': {
    name: 'Girl',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Girl'), 'Purchased');
    }
  },
  'Guy': {
    name: 'Guy',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'Guy'), 'Purchased');
    }
  },
  'DMs open': {
    name: 'DMs open',
    price: 0,
    purchase: (client, member) => {
      return member.addRole(member.guild.roles.find('name', 'DMs open'), 'Purchased');
    }
  },
  'Support': {
    name: 'Support',
    price: 0,
    purchase: (client, member) => {
      member.addRole(member.guild.roles.find('name', 'Support'), 'Purchased');
    }
  }
};

module.exports = items;
