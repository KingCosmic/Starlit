const gifs = [
  "https://cdn.discordapp.com/attachments/472130065845714974/490617646702919691/4fd8cd7665c61881b7dba02bd3c62437.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490617663056248832/401.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490617670790807563/ce6.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490617705330769940/original.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490617715741032473/tumblr_o5uc8b7nIt1rgagxfo1_500.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/490617726599954473/umaru_crie.gif.542285e9ba5161dec5ddecf8dd0946d7.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251174367592448/tenor_3.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251160576851999/1484357407_Little_Witch_Academia_-_Akko.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251154436521998/tumblr_p3ln9jLfwc1wxbjq5o4_540.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251150783152139/Tumblr_ojvjs0SufW1s846hwo1_500.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251142545408000/tumblr_oj2d2w1TSn1vw1jsxo1_500.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251127999823876/tenor_2.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251127999823876/tenor_2.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251111897890836/tenor_4.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251091613974529/f6d.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251081019162624/f2a0e09da0ba2abeee9b672d848655a97f2623b9_hq.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251082864918528/WarmheartedAridCygnet-size_restricted.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251069707124786/Act_3_Classroom.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251065051447306/original.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251062811820032/tenor.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251045191417856/ccb656881a69c407f8c078e834cbe066f6622951_hq.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251041836105759/cbdc9326c02c62a7bd955257f7a031531d4900e7_hq.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251037343875082/tumblr_n7pfn2LPzu1tegxkqo1_400.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251030893166613/Elfen-Lied-image-elfen-lied-36246878-320-197.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251026623496212/tenor_1.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251013272895489/dc0e4aa4975f3c50838b63c4c49ff7dc3e591dad_hq.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494257522723782656/photo.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251011586654209/tumblr_mqk97zlTFU1s6mgaeo1_500.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494251008155713536/large.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250997334671390/373a12c37389cf554df0a7d51d778c4c.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250989520420865/abde38499c5774bd996a79157982115e.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250991441674261/tumblr_nxvr7xDFBq1rl9jl7o1_500.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250988543279115/6410716802723d039a8a7703d3574ddf.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250909967187968/giphy.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250856355463188/original_1.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250796318326785/1501465875_Akko_And_Constanze.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250799187361802/e4c.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250790907543552/1529908786_tumblr_oavyobw9m41rac3s9o1_540.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250783420973056/1515919698_1505429153733.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250779163754496/a0468c4fbda31087a606591bf260f1cd.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250770271567872/1471555726075.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250715217133578/96f.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250668014698496/9a7.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250644887306240/2ed60ed5d7b694f0b1ed2f11c77ff6f5.gif",
  "https://cdn.discordapp.com/attachments/472130065845714974/494250644056571916/00c44aa82d4b92d475525b813edae2076dcf2980_hq.gif",
  "https://cdn.discordapp.com/attachments/478258306767519744/494633877910847518/image0.gif",
]

module.exports = {
  guild: (client, member) => {
    return {
      "title": `Hello ${member.displayName}! Welcome to Natsuki\'s Café!`,
      "color": 16663691,
      "timestamp": new Date().toISOString(),
      "footer": {
        "text": "Enjoy your stay :3"
        
        
   },
      "image": {
        "url": gifs.random()
      }
    }
  },

  dm: (client, member) => {
    return {
      "title": `Welcome to Natsuki\'s Café, ${member.displayName}!`,
      "description": "Hiya, i'm Natsuki, i'll be your guide but it's not that i like you or anything... baka!\nBefore you start chatting, please read the rules\nYou'll find them in <#510416564382859264>!\n\nTo gain access to the rest of the server\nPlease look at <#514412702429478933> and equip the Cupcake role!\n\nI hope to see you in the server! :heart:",
      "color": 16730522,
      "timestamp": "2018-07-25T18:14:20.238Z",
      "image": {
        "url": "https://cdn.discordapp.com/attachments/472130065845714974/511892008672034816/welcdm2.gif"
      },
      "footer": {
        "text": "I hope you enjoy your time in the server!"
      }
    };
  }
}