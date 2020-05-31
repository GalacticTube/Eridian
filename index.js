const Discord = require("discord.js");
const fetch = require('node-fetch');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const prefix  = process.env.BOT_PREFIX;
const status = process.env.BOT_STATUS;

var queue = new Map();

bot.on("ready", () => {
    console.log(`I am ready! I am in ${bot.guilds.size} guilds`);

    bot.user.setActivity(status);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);

    if(command === 'hello') {
        message.reply('Hello!');
    }

    if(command === 'ping') {
        const msg = await message.channel.send("Pinging...");
        msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    }

    if(command === 'kick') {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.kickable) return message.channel.send("Sorry I cannot kick that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";

        await member.kick(reason)
            .catch(e => message.reply(`Sorry I couldn't kick them! Error: ${e}`));
        message.reply(`:white_check_mark: User kicked!`);
    }

    if(command === 'announce') {
    const announcement = args.join(" ");
      bot.guilds.forEach(guild => {
      bot.users.get(guild.ownerID).send(announcement);
    });
  }

  if(command === 'vote') {
  message.channel.send('https://top.gg/bot/674358606233337886/');
}

if(command === 'avatar') {
  message.reply(message.author.avatarURL);
}

if(command === 'dev') {
  if (message.author.id === "572811135305252895") {
    const msg = await message.channel.send('Why you asking? The answer is... You');
} else {
  const msg = await message.channel.send('Created me NJ3ZNAY0MY_#0001');
  }
}

if(command === 'developer') {
  if (message.author.id === "572811135305252895") {
    const msg = await message.channel.send('Why you asking? The answer is... You');
  } else {
  const msg = await message.channel.send('Created me NJ3ZNAY0MY_#0001');
  }
}

  if(command === "purge") {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Sorry you do not have permission!');
     const deleteCount = parseInt(args[0], 10);

if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

if(command === 'ss') {
      const msg = await message.channel.send(`I am in ${bot.guilds.size}/100 guilds :D`);
    }

  if(command === "help") {
    if (message.author.id === "572811135305252895") {
      message.reply("Tobie to juz nic nie pomoze");
  } else {
    const helpEmbed = new Discord.RichEmbed()
    .setColor('#5eff74')
    .setAuthor('Help Command', 'https://i.imgur.com/e8IuLhq.png', 'https://www.youtube.com/c/NJ3ZNAY0MYYT')
    .addField('In the future', 'under construction', true)
    .setTimestamp()
	  .setFooter('Eridian', 'https://i.imgur.com/e8IuLhq.png');
    const msg = await message.channel.send(helpEmbed);
  }
}

  if(command === "meme") {
        let msg = await message.channel.send("Fetching a meme, please wait a second!");
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.RichEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
                msg.edit(embed)
            });
    }

    if(command === "say") {
    const sayMessage = args.join(" ");
    const fetched = await message.channel.fetchMessages({limit: 2});
    message.channel.bulkDelete(fetched)
      .catch(error => console.log(`${error}`));
    message.channel.send(sayMessage);
  }

    if(command === 'ban') {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) return message.reply("Please mention a valid user");
        if(!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(e => message.reply(`Sorry I couldn't ban them! Error: ${e}`));
        message.reply(`:white_check_mark: User banned!`);
    }


    if(command === 'play') {
        // !play url

        play(message, serverQueue);
    }

});

async function play(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.reply("You must be in a voice channel!");
    const permission = voiceChannel.permissionsFor(message.client.user);
    if(!permission.has('CONNECT') || !permission.has("SPEAK")) {
        return message.channel.send("I need permission to join and speak in your voice channel!")
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    if(!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try{
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            playSong(message.guild, queueConstruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id)
            return message.channel.send("There was an error playing! " + err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} has been added to the queue!`);
    }
}

function playSong(guild, song) {
    const serverQueue = queue.get(guild.id);

    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', () => {
            serverQueue.songs.shift();
            playSong(guild, serverQueue.songs[0]);
        })
        .on('error', error => {
            console.log(error);
        })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}


bot.login(process.env.BOT_TOKEN);
