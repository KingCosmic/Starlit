// This event executes when someone reacts to a message

module.exports = (client, mr, user) => {
  // check if its our rules message
  if (mr.message.id === '514551539679887375') {
  
    // make sure its the right emoji
    if (mr.emoji.name === '✅') {
    // add the role
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('460383598151860224'));
            mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('512192089812107304'));
                  mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514522798820163595'));
    }
  }
    
  if (mr.message.id === '514550925361414144') {
    if (mr.emoji.name === '👧') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('498091875153215489'));
    }
    if (mr.emoji.name === '👦') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('498086262146859008'));    
      }
   }
    
  if (mr.message.id === '514550994684870666') {
    if (mr.emoji.name === '🍼') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514499968837353506'));
      }
    if (mr.emoji.name === '👶') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514500147447726080')); 
      }
    if (mr.emoji.name === '👦') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514500299378130957'));      
       }
    if (mr.emoji.name === '👨') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514500299432656906'));      
       }
    if (mr.emoji.name === '🤵') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514510633375629342'));      
       }
    if (mr.emoji.name === '👴') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514510639717285888'));      
       }
    }
  if (mr.message.id === '514551367935852605') {
    if (mr.emoji.name === '🇳') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518073273745408'));
      }
    if (mr.emoji.name === '🇸') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518083122102282')); 
      }
    if (mr.emoji.name === '🇪') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518103955341314'));      
       }
    if (mr.emoji.name === '🇦') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518579094224932'));      
       }
    if (mr.emoji.name === '🅰') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518587273379871'));      
       }
    if (mr.emoji.name === '🇴') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('514518797609205810'));  
      }
    }
  if (mr.message.id === '514551462152503296') {
    if (mr.emoji.name === '🎮') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('475599795671793666'));
      }
    if (mr.emoji.name === '💭') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('475599368918138880')); 
      }
    if (mr.emoji.name === '💴') {
      mr.message.guild.members.get(user.id).addRole(mr.message.guild.roles.get('498092758813376513'));      

       }
    }

 };