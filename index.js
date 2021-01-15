// Va chercher les secrets dans le fichier secrets.js, dans le cas ou
// on est en local. Comme Heroku n'aime pas charger un module qui n'existe
// pas, il faut attraper l'erreur pour pas que cela plante...
var BoToken = null;
try {
  var s = require("./secrets");
  BoToken = s.BOT_TOKEN;
} catch (e) {
  console.log("Pas de secrets trouvé, on utilise process.env.BOT_TOKEN");
  //console.log(e);
  BoToken = process.env.BOT_TOKEN;
}

// Requière la librairie Discord
const { Client, RichEmbed, Attachment } = require('discord.js');
const getJSON = require('get-json');
let Parser = require('rss-parser');
let parser = new Parser();
// Instancie un nouveau client Discord
const client = new Client();

// Construit un message rich "abonnement" avec le constructeur MessageEmbed
// https://discord.js.org/#/docs/main/stable/class/RichEmbed
const abo = () => {
  return new RichEmbed()
    // Le titre de l'encart
    .setTitle(':arrow_down: Abonne toi à rien du tout :arrow_down:')
    // La couleur de l'encart
    .setColor(0xff0000)
    // Le contenu de l'encart
    .setDescription('https://www.rien_du_tout');
}

async function yt(msg){
  let feed = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCN25q81_zmzVMMRGxMvEf4w');
  //console.log(feed.title, feed.feedUrl, feed.link);
  for (i=0; i<3; i++) {
    console.log(feed.items[i])
    msg.channel.send(feed.items[i].title + " " + feed.items[i].link)
  }
  msg.channel.send("Youtuber " + feed.title);
  return "youtube"
}
// Surveille le status
client.on('ready', () => {
  //console.log(`Logged in as ${client.user.tag}!`);
});

const Test = () => {
  let guildTest = client.guilds.cache.find(ch => ch.name === 'test');
  //console.log(guildTest)
}




// client.on('messageReactionAdd', async (reaction, user, message) => {
//   console.log("--------------------------------")
//   console.log("On a eu une messageReactionAdds")
// console.log("reaction", reaction)
// console.log("user", user)
// console.log("message", message)
//   let role = reaction.message.guild.roles.find(r => r.name === "test");
//
//   let member = reaction.message.guild.members.first();
//   console.log("member", member)
//
//   member.addRole(role).catch(console.error);
//   //user.addRole(role).catch(console.error);
//   //reaction.members.guild.roles.add(role);
//
// //  reaction.message.guild.members.cache.get(message.author.id).roles.add(role);
// // user.id.roles.add(role)
// user.id.addRole(role).catch(console.error);
//
//
//
//
//
//
//
//
//
//
//
//
// //   console.log(reaction.message.guild)
// //   let guild = reaction.message.guild;
// //
// //   guild.roles.forEach(role => console.log(role.name, role.id))
// //   const guildTest = guild.roles.find(ch => ch.name === 'test');
// // console.log(guildTest);
// // user.addRole(guildTest).catch(console.error);
//
//
//
//   //const channel = user.guild.channels.find(ch => ch.name === 'test');
//   //channel.addMember(user)
//
//   // console.log("--------------------------------")
//   // console.log(reaction)
//   // console.log("--------------------------------")
//   // console.log(user)
//   // console.log("--------------------------------")
// });

client.on('messageReactionRemove', async (reaction, user) => {
  console.log("--------------------------------")
  console.log("On a supprimé une messageReactionAdds")
  //const channel = user.guild.channels.find(ch => ch.name === 'test');
  //channel.RemoveMember(user)
//  user.removeRole(channel.id);

});

// Surveille les messages
client.on('message', msg => {

  if (msg.content === '^^ping') {     // Si le message dit "^^ping"
    msg.reply('Pong! :ping_pong:');   // Répond "Pong!"
  }

  if (msg.content === '^^abo2') {     // Si le message dit "^^abo2"
    msg.reply('Hey! Abonnez-vous à la châine de T2006 → https://www.youtube.com/channel/UCWC87vcR72VDYM7AGBzuBDQ :T2006:');   // Répond "Pong!"
  }

  if (msg.content === '^^salut') {    // Si le message dit "^salut"
    msg.reply('Au revoir');
  }

  if (msg.content === 'Garis') {    // Si le message dit "^salut"
    msg.reply('Il est trop OP - il faut le nerf.');
  }
  if (msg.content === 'mew mew') {    // Si le message dit "^salut"
    var ts = new Date().getTime();
    msg.reply("http://thecatapi.com/api/images/get?format=src&type=gif&timestamp="+ts);
  }

  if (msg.content === 'ouaf ouaf') {    // Si le message dit "^salut"
    var ts = new Date().getTime();
    msg.reply("https://media0.giphy.com/media/Z9nzfnN09lMUSXoEJN/giphy.webp?cid=ecf05e474allsl8noh8tnk3mx2nzvdmp56wakk2ui3j9exjj&rid=giphy.webp"+ts);
  }

  if (msg.content === 'Marvel') {    // Si le message dit "^salut"
    msg.reply('C"est un oiseau, c"est un avion, et je me souvien plus.');
  }
  if (msg.content === '1234') {       // un test si le msg dit "1234"
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Chiffres')
      // Set the color of the embed
      .setColor(0xF056B)
      // Set the main content of the embed
      .setDescription('5678');
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }

  if (msg.content === '^^abo') {      // si qqn tape "^^abo"
    // Envoie le resultat de la fonction abo()
    msg.channel.send(abo());
  }
  if (msg.content === 'yt') {      // si qqn tape "yt"
    // Envoie le resultat de la fonction abo()
    yt(msg)
    msg.channel.send('Voila');
  }

  if (msg.content === 'avatar') {     // si "avatar"
    // Retourne l'URL vers l'image de la personne
    console.debug(msg.author)
    if (msg.author.avatarURL) {
      msg.reply(msg.author.avatarURL);
    } else {
      msg.reply("pas d'avatar...");
    }
  }

  if (msg.content === 'Marlo') {
    msg.reply('Bonjour Maitre! :100:');
  }

  if (msg.content === 'react') {
    msg.react('😄');
    //msg.guild.roles.forEach(role => console.log(role.name, role.id))

    let role = msg.member.guild.roles.cache.find(role => role.name === 'test');

    client.on("messageReactionAdd", (reaction, user) => {
      const mesg = reaction.message;
      if(!user || user.bot || !reaction.message.channel.guild) {
        return;
      } else if (mesg.id == msg.id && reaction.emoji.name == "😄") {
        if (msg.guild.member(user).roles.cache.has(role.id)) {return msg.channel.send("You already have the role.")};

        msg.guild.member(user).roles.add(role).then(msg.channel.send("Role added!"));
      }
    });
  }

  if (msg.content === 'cat') {
    // Utilise http://random.cat pour afficher une image de chat...
    getJSON('http://aws.random.cat/meow', function(error, response){
      if (error) {
        console.log(error);
      } else {
        // On crée l'attachement
        const attachment = new Attachment(response.file);
        // Et on envoie le fichier dans le canal...
        msg.channel.send(attachment);
      }
    });
  }
});

// En cas de nouveaux arrivés...
client.on('guildMemberAdd', member => {
  // On envoie le message à un canal désigné, ici "gere-bot"
  const channel = member.guild.channels.find(ch => ch.name === 'gere-bot');
  // Si on ne trouve pas le canal, on fait rien
  if (!channel) return;
  // Autrement, on envoie le message dans le canal (plouf!)
  channel.send(`Bienvenue ${member}!`);
  channel.send(abo());
});



// Connect le client.
client.login(BoToken);
console.log("Le bot est démarré !");
