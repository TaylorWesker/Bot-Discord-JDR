const atribut = {
  "Nom": "m_Name",
  "Classe": "m_Class",
  "Race":"m_Race",
  "Sexe":"m_Sex",
  "Age":"m_Age",
  "Taille":"m_Height",
  "Poid":"m_Weight",
  "Peau":"m_Skin",
  "Yeux":"m_Eyes",
  "Cheveux":"m_Hair",
  "Sens":"m_Sens",
  "Dieu":"m_Gods",
  "Langue":"m_Languages",
  "Alignement":"m_Alignment",
  "Niveau":"m_Level",
  "Exp":"m_Exp",
  "LVupExp":"m_LevelUpExp",
  "Force": "m_Strength",
  "Dexterite": "m_Dexterity",
  "Constitution": "m_Stamina",
  "Connaisance": "m_Atunemet",
  "Sagesse": "m_Wisdom",
  "Charisme": "m_Charisma",
  "PVMax":"m_LifePointMax",
  "PV":"m_LifePoint"
};

const insulte = [
  "Dans ta gueule",
  "Tu sait pas viser",
  "La prochaine fois, essai plus fort",
  "lol t'es mort",
  "Le karma te sodomise"
];

const congrat = [
  "EXTERMINATE",
  "L'âme des cartes est avec toi, yugi ! ",
  "Explose pas la région STP",
  "Le karma te pompe la bite",
  "Tu veut pas 500 balles et un mars avec ?"
];

const Doc = `;+
Roll XdX, ou les X sont des nombre pour faire un lancé de dé
Presente, pour affiche un resume de la fiche perso de tout les joueur (Vous pouvez marqué un nom pour affiche uniquement un seul personnage)
Change. Nom de la caractéristique + chiffre ou texte + Nom personage, pour changé un attribut d'un personage`;


module.exports = Object.freeze({
  commands: {
    "Change": (bot,msg,perso,lenPreffix,db) => {
      let type = msg.content.split(".")[1].split(" ")[0];
      let num=msg.content.slice(lenPreffix+("Change."+type).length+1,msg.content.indexOf(" ",lenPreffix+("Change."+type).length+1));
      let charName = msg.content.slice(lenPreffix+("Change."+type+" "+num).length+1);
      let pos = SearchCharPos(perso,charName);
      if (num=="" || charName=="" || pos == -1) {
        return msg.channel.sendMessage("Argument incorecte");
      }
      if (typeof perso[pos][atribut[type]] == "string") {
        perso[pos][atribut[type]] = num;
      }
      else if (typeof perso[pos][atribut[type]] == "number") {
        perso[pos][atribut[type]] = parseInt(num);
      }
      perso[pos].UpdateMod();
      db.run(`UPDATE Character
              SET `+atribut[type].split("_")[1]+` = ?
              WHERE name = ?`, [perso[pos][atribut[type]],perso[pos].m_Name], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });
    },

    "Presente": (bot,msg,perso,lenPreffix) => {
      let reply = "";
      let charName=msg.content.slice(lenPreffix+("Presente").length+1);
      let pos = SearchCharPos(perso,charName);
      if (charName == "") {
        for (var i = 0; i < perso.length; i++) {
          reply+=perso[i].SePresente() + "\n\n";
          reply+=perso[i].AfficheComp() + "\n\n";
        }
      }
      else if(pos != -1) {
        reply+=perso[pos].SePresente() + "\n\n";
        reply+=perso[pos].AfficheComp() + "\n\n";
      }
      else {
        reply+="Personnage non defini";
      }
      return msg.channel.sendMessage(reply);
    },

    "Roll": (bot,msg,lenPreffix) => {
      let nbDes = msg.content.slice(lenPreffix).split(" ")[1].split("d")[0];
      let nbFace = msg.content.slice(lenPreffix).split(" ")[1].split("d")[1];
      if(!OnlyNumber(nbDes) || !OnlyNumber(nbFace)){
        return msg.channel.sendMessage("Ce n'est pas un dé valide");
      }
      parseInt(nbDes);
      parseInt(nbFace);
      return lanceDes(msg,nbDes,nbFace,msg.author.username);
    },

    "Deconnecter": (bot) =>{
      return bot.destroy();
    },

    "Help": (bot,msg) => {
      return msg.channel.sendMessage(Doc);
    }
/*
    "Attaque": (msg,perso,lenPreffix,db) => {

    }
*/
  }
});

function SearchCharPos(perso,Name) {
  for (var i = 0; i < perso.length; i++) {
    if (perso[i].m_Name == Name) {
      return i;
    }
  }
  return -1;
}

function lanceDes(msg,nbDes,nbFace,sender) {
  let ran;
  let reply = sender +  " lance " + nbDes.toString() + " dé :\n";
  for (let i = 0; i < nbDes; i++) {
    ran = (Math.floor(Math.random() * nbFace) + 1);
    reply += "dé N° " + (i+1).toString() + ", " + ran.toString() + " sur " + nbFace.toString() + ".\n";
    if (reply.length > 1999) {
      //return msg.channel.sendMessage("https://cdn.discordapp.com/attachments/382590704926326785/383299445283880962/Z.png");
      return msg.channel.sendMessage("https://cdn.discordapp.com/attachments/326080174460502016/386622113013956609/AaQOCWGw.jpg");
    }
  }
  if(nbDes == 1, nbFace == 100){
    if (96 <= ran) {
      reply += insulte[(Math.floor(Math.random() * insulte.length))];
    }
    else if (ran <= 5) {
      reply += congrat[(Math.floor(Math.random() * congrat.length))];
    }
  }
  msg.channel.sendMessage(reply);
}

function OnlyNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if(!IsIn(str[i],"0123456789")) return false;
  }
  return true;
}

function IsIn(char,str) {
  for (let i = 0; i < str.length; i++) {
    if(str[i] == char) return true;
  }
  return false;
}
