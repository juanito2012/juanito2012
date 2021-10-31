const Discord = require('discord.js')
const client = new Discord.Client()
const { Client, MessageEmbed, Guild  } = require("discord.js");

const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 let port = process.env.PORT || 3000;
app.listen(port)
 
require('dotenv').config()

client.on('ready', () => {
console.log(`${client.user.username} esta conectado.`);
});

client.on("ready", async () => {
  client.user.setPresence({
    status: "ONLINE",
    activity:{
      name: "|haciendo codigo %help "

    }
  })
})


const fs = require('fs')
let { readdirSync } = require('fs')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', (message) => {

  let prefix = '%'

  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping"){
    message.channel.send("pong")
  }
});




const mySecret = process.env['TOKEN'] /*eliminar este codigo*/
client.login(process.env.TOKEN);
