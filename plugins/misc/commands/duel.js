const ROT = require('rot-js');

// Constants
const MAX_ROUNDS = 20
const INITIAL_HP = 20
const TARGET_SELF = 'self'
const TARGET_OTHER = 'target'

// TEMPLATES BEGIN
// {a} is attacker, {d} is defender/target, {o} is a randomly selected object,
// {v} is the verb associated with that object, and {b} is a random body part.

const WEAPONS = {
  'swing': {
    'axe': 3,
    'scimitar': 4,
    'buzzsaw': 5,
    'chainsaw': 6,
    'broadsword': 7,
    'katana': 4,
    'falchion': 5
  },
  'fire': {
    'raygun': 5,
    'flamethrower': 6,
    'crossbow': 3,
    'railgun': 6,
    'ballista': 6,
    'catapult': 5,
    'cannon': 4,
    'mortar': 3
  },
  'stab': {
    'naginata': 5,
    'lance': 4
  }
}

const SINGLE_PROJECTILE = {
    'fire': {
        'a psionic projectile': 4,
    },
    'hurl': {
        'pocket sand': 1,
        'a spear': 6,
        'a heavy rock': 3,
    },
    'toss': {
        'a moltov cocktail': 4,
        'a grenade': 5
    }
}

const FAMILIAR = {
    'divebomb': {
        'their owl companion': 3,
    },
    'charge': {
        'their pet goat': 3,
        'their pet unicorn': 4,
    },
    'constrict': {
        'their thick anaconda': 4,
    }
}

const SUMMON = {
    'charge': {
        'a badass tiger': 5,
        'a sharknado': 8,
        'a starving komodo dragon': 5
    },
    'swarm': {
        'all these muthafucking snakes': 5,
    }
}

const MELEE = {
    'stab': {
        'dagger': 5
    },
    'drive': {
        'fist': 4,
        'toe': 2
    }
}

const MARTIAL = {
  'roundhouse kick': 6,
  'uppercut': 5,
  'bitch-slap': 2,
  'headbutt': 4
}

const BODYPARTS = [
    'head',
    'throat',
    'neck',
    'solar plexus',
    'ribcage',
    'balls',
    'spleen',
    'kidney',
    'leg',
    'arm',
    'jugular',
    'abdomen',
    'shin',
    'knee',
    'other knee'
]

const VERB_IND_SUB = {
  'munch': 'munches', 'toss': 'tosses'
}

const ATTACK = {
  "{a} {v} their {o} at {d}!": (WEAPONS),
  "{a} {v} their {o} into {d}!": (MELEE),
  "{a} {v} their {o} into {d}'s {b}!": (MELEE),
  "{a} {v} {o} at {d}!": (SINGLE_PROJECTILE),
  "{a} {v} {o} at {d}'s {b}!": (SINGLE_PROJECTILE),
  "{a} {v} {o} into {d}'s {b}!": (SINGLE_PROJECTILE),
  "{a} orders {o} to {v} {d}!": FAMILIAR,
  "{a} summons {o} to {v} {d}!": SUMMON,
  "{a} {v} {d}!": (MARTIAL),
  "{d} is bowled over by {a}'s sudden bull rush!": 6,
  "{a} tickles {d}, causing them to pass out from lack of breath": 2,
  "{a} points at something in the distance, distracting {d} long enough to {v} them!": MARTIAL
}

const CRITICAL = {
  "Quicker than the eye can follow, {a} delivers a devastating blow with their {o} to {d}'s {b}.": WEAPONS,
  "The sky darkens as {a} begins to channel their inner focus. The air crackles as they slowly raise their {o} above their head before nailing an unescapable blow directly to {d}'s {b}!": WEAPONS,
  "{a} nails {d} in the {b} with their {o}! Critical hit!": WEAPONS,
  "With frightening speed and accuracy, {a} devastates {d} with a tactical precision strike to the {b}. Critical hit!": WEAPONS
}

const HEALS = {
    'inject': {
        'morphine': 4,
        'nanomachines': 5
    },
    'smoke': {
        'a fat joint': 2,
        'medicinal incense': 3,
        'their hookah': 3
    },
    'munch': {
        'on some': {
            'cake': 5,
            'cat food': 3,
            'dog food': 4
        },
        'on a': {
            'waffle': 4,
            'turkey leg': 2
        }
    },
    'drink': {
        'some': {
            'Ambrosia': 7,
            'unicorn piss': 5,
            'purple drank': 2,
            'sizzurp': 3,
            'goon wine': 2
        },
        'a': {
            'generic hp potion': 5,
            'refreshingly delicious can of 7-Up': 3,
            'fresh mug of ale': 3
        },
        'an': {
            'elixir': 5
        }
    }
}

const HEAL = {
  "{a} decides to {v} {o} instead of attacking.": HEALS,
  "{a} calls a timeout and {v} {o}.": (HEALS),
  "{a} decides to meditate on their round.": 5
}


const FUMBLE = {
  "{a} closes in on {d}, but suddenly remembers a funny joke and laughs instead.": 0,
  "{a} moves in to attack {d}, but is disctracted by a shiny.": 0,
  "{a} {v} their {o} at {d}, but has sweaty hands and loses their grip, hitting themself instead.": (WEAPONS),
  "{a} {v} their {o}, but fumbles and drops it on their {b}!": (WEAPONS)
}

const BOT = {
  "{a} charges its laser aaaaaaaand... BZZZZZZT! {d} is now a smoking crater for daring to challenge the bot.": INITIAL_HP
}

const HITS = [
  'deals', 'hits for'
]
const RECOVERS = [
  'recovers', 'gains', 'heals'
]

// TEMPLATES END

// Move category target and multiplier (negative is damage)
const MOVES = {
  CRITICAL: {
    move: CRITICAL,
    target: TARGET_OTHER,
    multiplier: -2
  },
  ATTACK: {
    move: ATTACK,
    target: TARGET_OTHER,
    multiplier: -1
  },
  FUMBLE: {
    move: FUMBLE,
    target: TARGET_SELF,
    multiplier: -1
  },
  HEAL: {
    move: HEAL,
    target: TARGET_SELF,
    multiplier: 1
  },
  BOT: {
    move: BOT,
    target: TARGET_OTHER,
    multiplier: -64
  }
}

// Weights of distribution for biased selection of moves

const weightedMoves = { 'CRITICAL': 0.05, 'ATTACK': 1, 'FUMBLE': 0.1, 'HEAL': 0.1 }

class Player {
  constructor(member, initial_hp=INITIAL_HP) {
    this.hp = initial_hp;
    this.member = member;
  }
}

const weighted_choice = (choices) => {
  return ROT.RNG.getWeightedValue(choices);
}


const nested_random = (d) => {
  let k = weighted_choice(dict_weight(d))
  let result = [k]

  if (typeof d[k] === 'object') {
    result.push(nested_random(d[k]))
  } else {
    result.push(d[k])
  }

  return result
}

const dict_weight = (d, top=true) => {
  let wd = {};
  let sw = 0;

  for (let k in d) {
    let v = d[k]
    let w;

    if (typeof v === d) {
      let { x, y } = dict_weight(v, false);
      wd[k] = (top) ? y : x;
      w = y
    } else {
      w = 1
      wd[k] = w
    }

    sw += w
  }

  if (top) {
    return { wd }
  } else {
    return { wd, sw }
  }
}

const generateAction = (attacker, defender, cat) => {
  if (!cat) cat = weighted_choice(weightedMoves);

  console.log(cat);

  let { moves, target, multiplier } = MOVES[cat];

  target = (target === TARGET_OTHER) ? defender : attacker;

  let { move, obj, verb, hp_delta } = generateMove(moves)
  hp_delta *= multiplier
  bodypart = random.choice(BODYPARTS)

  let msg = move.format(attacker, defender, obj, verb, bodypart)
  if (hp_delta == 0) {
    pass
  } else {
    target.hp += hp_delta;
    if (hp_delta > 0) {
      let s = random.choice(RECOVERS)
      msg += ' It %s %d HP (%d)' % (s, abs(hp_delta), target.hp)
    } else if (hp_delta < 0) {
      let s = random.choice(HITS)
      msg += ' It %s %d damage (%d)' % (s, abs(hp_delta), target.hp)
    }
  }

  return msg
}

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateMove = (moves) => {
  // Select move, action, object, etc
  let movelist = nested_random(moves)

  let hp_delta = movelist.pop()  // always last

  // randomize damage/healing done by -/+ 33%
  hp_delta = math.floor(((hp_delta * randomInt(66, 133)) / 100))
  let move = movelist.pop(0)  // always first
  let verb = (movelist) ? movelist.pop(0) : null; // Optional
  let obj = (movelist) ? movelist.pop() : null;  // Optional

  if (movelist)
    verb += ' ' + movelist.pop(); // Optional but present when obj is

  return { move, obj, verb, hp_delta };
}

exports.run = (client, message, args, level) => {
  const defender = message.mentions.members.first();

  if (!defender) return message.reply('You have to tag someone to duel');

  if (defender.id === message.member.id) return message.reply('You can\'t duel yourself silly');

  const p1 = new Player(message.member);
  const p2 = new Player(defender);

  const order = [[p1, p2], [p2, p1]];

  message.channel.send(`${p1.member} challenges ${p2.member} to a duel`)
  .then((battleMsg) => {
    let i;
    for (i = 0; i < MAX_ROUNDS; i++) {
      if (p1.hp <= 0 || p2.hp <= 0) break;

      for (const o in order) {
        let [attacker, defender] = order[o];

        if (p1.hp <= 0 || p2.hp <= 0) break;

        let moveMsg;

        if (attacker.member.id === client.user.id) {
          moveMsg = generateAction(attacker, defender, 'BOT');
        } else {
          moveMsg = generateAction(attacker, defender);
        }

        battleMsg.edit(battleMsg.content + '\n' + moveMsg);
        
      }
    }

    if (p1.hp !== p2.hp) {
      let victor = (p1.hp > p1.hp) ? p1 : p2;
      let loser = (p1.hp < p2.hp) ? p1 : p2;
      victor.wins += 1
      loser.losses += 1

      let msg = `After ${i + 1} rounds, ${victor.mention} wins with ${victor.hp} HP!`;
      msg += '\nStats: '

      for (let p in [p1, p2]) {
        msg += `${p} has ${p.wins} wins, ${p.losses} losses, ${p.draws} draws`
      }
    } else {
      let victor = null;

      for (let p in [p1, p2]) {
        p.draws += 1
      }

      msg = `After ${i + 1} rounds, the duel ends in a tie!`;
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "duel",
  category: "Miscelaneous",
  description: "Fight someone! attacks and such randomized (might change)",
  usage: "duel @user"
};