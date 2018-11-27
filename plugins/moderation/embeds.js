
module.exports = {
  whichUser: () => {

  },

  dm: (user) => {
    return {
      "title": `You were banned by ${user.displayName}`,
      "description": "If you want to be unbanned, DM the person who banned you, if you're unsure what their tag is then please contact the server Owner (Natyori#0001)",
      "color": 16264736,
      "timestamp": new Date().toISOString(),
      "footer": {
        "icon_url": "https://media.giphy.com/media/ToMjGpz63CcxpN235OE/giphy.gif",
        "text": "Sorry D:"
      }
    }
  },

  confirmation: (user, banned) => {
    return {
      "title": `${user.displayName} banned ${banned.displayName}`,
      "color": 65296,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "Sad D:"
     },
      "image": {
        "url": "https://media.giphy.com/media/ToMjGpz63CcxpN235OE/giphy.gif"
      }
    }
  },

  error: (banned) => {
    return {
      "title": `Error banning ${banned.displayName}`,
      "description": "I cannot ban this person, they're either higher up than me or the code is broken.",
      "color": 16264736,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "Ban Error, contact the owner if this persists."
      }
    }
  }
}