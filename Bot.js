var Discord = require("discord.js");
var bot = new Discord.Client();
const sqlite3 = require("sqlite3").verbose();
const Character = require("./Character.js");
const commands = require("./Commande.js").commands;
const config = require("./Config.json");

// open the database
let db = new sqlite3.Database("./RPG.sqlite", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the RPG database.");
});
// create an array of Character
let perso = [];

// add the characters of the database in the array
db.serialize(() => {
  let i = 0;
  db.each(`SELECT *
           FROM Character`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      perso[i] = new Character(row);
      i++;
    });
});

bot.on("message", msg => {
  let preffix = config.prefix;
  let lenPreffix = preffix.length;
  if (!msg.content.startsWith(preffix)) return;
  if (msg.author.bot) return;
  if (commands.hasOwnProperty(msg.content.slice(preffix.length).split(" ")[0])) commands[msg.content.slice(preffix.length).split(" ")[0]](bot,msg,perso,lenPreffix,db);
  else if (commands.hasOwnProperty(msg.content.slice(preffix.length).split(".")[0])) commands[msg.content.slice(preffix.length).split(".")[0]](msg,perso,lenPreffix,db);
});

bot.on("ready", () => {
  console.log(`Ready to server in ${bot.channels.size} channels on ${bot.guilds.size}
servers, for a total of ${bot.users.size} users.`);
});

bot.login(config.token);
