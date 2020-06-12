//libraries
const Discord = require("discord.js");
const fetch = require('node-fetch');
const FortniteAPI = require("fortnite-api-io");
const { createCanvas } = require('canvas');
const { Canvas } = require("canvas-constructor");
const Caanvas = require('canvas');
const { Player } = require("discord-music-player");
const fsn = require('fs-nextra');

//settings
let prefix = process.env.BOT_PREFIX;
const status = process.env.BOT_STATUS;

//config
const bot = new Discord.Client();
const fortniteAPI = new FortniteAPI("d437886f-9808ffa2-0c6e9d53-c683fa60");
const player = new Player(bot, "AIzaSyAq9xd2P2HM2q4kI3wAQr2PEKm6_i0JF3E");
bot.player = player;

//events
bot.on("ready", () => {
    console.log(`#######################################`);
    console.log(` `);
    console.log(` `);
    console.log(`Bot Status => UP`);

    bot.user.setActivity(status);
});


bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    //commands
    if (command === 'ping') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "PING"`)
        const msg = await message.channel.send("Pinging...");
        msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
    }

    if (command === 'pp') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "PP"`)
        let member = message.mentions.users.first() || message.author;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const hexc = '#' + randomColor;
        const ppsize = Math.floor((Math.random() * 4));
        console.log(ppsize);
        if (ppsize === 0) {
            const ppshow = new Discord.MessageEmbed()
                .setColor(hexc)
                .setTitle('PP Size')
                .addField(`${member.username}'s penis`, '8=D', true)

            const msg = await message.channel.send(ppshow);
        } else if (ppsize === 1) {
            const ppshow = new Discord.MessageEmbed()
                .setColor(hexc)
                .setTitle('PP Size')
                .addField(`${member.username}'s penis`, '8=====D', true)

            const msg = await message.channel.send(ppshow);
        } else if (ppsize === 2) {
            const ppshow = new Discord.MessageEmbed()
                .setColor(hexc)
                .setTitle('PP Size')
                .addField(`${member.username}'s penis`, '8==========D', true)

            const msg = await message.channel.send(ppshow);
        } else if (ppsize === 3) {
            const ppshow = new Discord.MessageEmbed()
                .setColor(hexc)
                .setTitle('PP Size')
                .addField(`${member.username}'s penis`, '8==============D', true)

            const msg = await message.channel.send(ppshow);
        }
    }

    if (command === 'say') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "SAY"`)
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    if (command === 'avatar') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "AVATAR"`)
        const avatar = message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 });
        message.reply(avatar);
    }

    if (command === "meme") {
        console.log('#######################################')
        console.log(`${message.author.tag} used "MEME"`)
        let msg = await message.channel.send("Fetching a meme, please wait a second!");
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setImage(json.url)
                    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
                msg.edit(embed)
            });
    }

    if (command === "dog") {
        console.log('#######################################')
        console.log(`${message.author.tag} used "DOG"`)
        let msg = await message.channel.send("Fetching a dog, please wait a second!");
        fetch('https://random.dog/woof.json')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Here is your dog")
                    .setImage(json.url)
                msg.edit(embed)
            });
    }

    if (command === "shiba") {
        console.log('#######################################')
        console.log(`${message.author.tag} used "SHIBA"`)
        let msg = await message.channel.send("Fetching a dog, please wait a second!");
        await fetch('https://upros.pl/api/shiba', {
            method: 'GET',
            headers: { "auth": "e0c52ecaih5728111353052528956bdae670ji" }
        })
            .then(async (res) => {
                return res.json()
            })
            .then(async (json) => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Here is your shiba")
                    .setImage(json.shiba)
                msg.edit(embed)
            });
    }

    if (command === 'servers') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "SERVERS"`)
        const msg = await message.channel.send(`I am in ${bot.guilds.cache.size}/100 guilds :D`);
    }

    if (command === 'profile') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "PROFILE"`)
        if (message.author.id === "572811135305252895") {
            const avatar = await fetch(message.author.avatarURL({ format: 'jpg' }))
            let mage = new Canvas(500, 250)
                .setColor("#ffffff")
                .addRect(0, 0, 500, 250) //we gonna replace it with image
                .setColor("#08b1ff")
                .addRect(400, 0, 150, 250)
                .setColor("#ffffff")
                .setTextFont('bold 40px Impact') //you can make it bold
                .addText("PROFILE CARD", 110, 55)
                .setColor("#08b1ff")
                .setTextFont('bold 20px Impact')
                .addText(`ID - ${message.author.id}`, 30, 110)
                .addText(`TAG - ${message.author.tag}`, 30, 140)
                .addText(`GUILD NAME - ${message.guild.name}`, 30, 170)
                .setColor("#FFD700")
                .setTextFont('bold 17px Arial')
                .addText("Developer", 411, 240)
                .setColor("#ffffff")
                .addCircle(450, 130, 43)
                .addCircularImage(await avatar.buffer(), 450, 130, 40)
                .toBuffer();

            message.channel.send({ files: [mage] }) //lol i forget again
        } else {
            const avatar = await fetch(message.author.avatarURL({ format: 'jpg' }))
            let mage = new Canvas(500, 250)
                .setColor("#ffffff")
                .addRect(0, 0, 500, 250) //we gonna replace it with image
                .setColor("#08b1ff")
                .addRect(400, 0, 150, 250)
                .setColor("#ffffff")
                .setTextFont('bold 40px Impact') //you can make it bold
                .addText("PROFILE CARD", 110, 55)
                .setColor("#08b1ff")
                .setTextFont('bold 20px Impact')
                .addText(`ID - ${message.author.id}`, 30, 110)
                .addText(`TAG - ${message.author.tag}`, 30, 140)
                .addText(`GUILD NAME - ${message.guild.name}`, 30, 170)
                .setColor("#ffffff")
                .addCircle(450, 130, 43)
                .addCircularImage(await avatar.buffer(), 450, 130, 40)
                .toBuffer();

            message.channel.send({ files: [mage] }) //lol i forget again
        }
    }

    if (command === 'donkey') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "DONKEY"`)
        let member = message.mentions.users.first() || message.author;
        const canvas = Caanvas.createCanvas(1000, 700);
        const ctx = canvas.getContext('2d');

        const osiolek = await Caanvas.loadImage('https://bsmedia.business-standard.com/_media/bs/img/article/2019-12/23/full/1577083902-3265.jpg');
        const avatar = await Caanvas.loadImage(member.avatarURL({ format: 'jpg' }));
        ctx.drawImage(osiolek, 0, 0, 1000, 700);

        ctx.beginPath();
        ctx.arc(25 + 125, 100 + 125, 125, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 25, 100, 250, 250);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'osiol_jebaniec.png');

        message.channel.send(attachment);
    }

    if (command === "cat") {
        console.log('#######################################')
        console.log(`${message.author.tag} used "CAT"`)
        let msg = await message.channel.send("Fetching a cat, please wait a second!");
        fetch('http://shibe.online/api/cats')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Here is your cat")
                    .setImage(json[0])
                msg.edit(embed)
            });
    }

    if (command === "bird") {
        console.log('#######################################')
        console.log(`${message.author.tag} used "BIRD"`)
        let msg = await message.channel.send("Fetching a bird, please wait a second!");
        fetch('http://shibe.online/api/birds')
            .then(res => res.json())
            .then(json => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Here is your bird")
                    .setImage(json[0])
                msg.edit(embed)
            });
    }

    if (command === 'play') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "PLAY"`)
        let isPlaing = player.isPlaying(message.guild.id);
        // If there's already a song playing
        if (isPlaing) {
            // Add the song to the queue
            try {
                let song = await player.addToQueue(message.guild.id, args.join(" "));

                message.channel.send(`${song.name} added to queue!`);
            }
            catch {
                err => { console.log(err) }
            }
            
        } else {
            // Else, play the song
            let song = await player.play(message.member.voice.channel, args.join(" "));
            message.channel.send(`Currently playing ${song.name} requested by !`);
        }
    }


    if (command === 'kick') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "KICK"`)
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply("Please mention a valid user");
        if (!member.kickable) return message.channel.send("Sorry I cannot kick that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.kick(reason)
            .catch(e => message.reply(`Sorry I couldn't kick them! Error: ${e}`));
        message.reply(`:white_check_mark: User kicked!`);
    }

    if (command === 'ban') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "BAN"`)
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Sorry you do not have permission!');
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply("Please mention a valid user");
        if (!member.bannable) return message.channel.send("Sorry I cannot ban that person! Do they have a higher role?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(e => message.reply(`Sorry I couldn't ban them! Error: ${e}`));
        message.reply(`:white_check_mark: User banned!`);
    }

    if (command === 'skip') {
        console.log('#######################################')
        console.log(`${message.author.tag} used "SKIP"`)
        let isPlaing = player.isPlaying(message.guild.id);
        if (isPlaing) {
            try {
                player.skip(message.guild.id);
            }
            catch {
                err => { console.log(err) }
            }
        } else {
            let msg = await message.channel.send("No songs in your queue");
        }
        
    }


});

bot.login(process.env.BOT_TOKEN);
