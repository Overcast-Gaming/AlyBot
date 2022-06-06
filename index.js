// Check if there is a config file
const fs = require('fs')
if (!fs.existsSync('./config.json')) {
  console.log('Please create a config.json file from the provided config.example.json file')
  process.exit(1)
}
// modules, config and other related stuff
const { Client, Intents } = require('discord.js')
const mineflayer = require('mineflayer')
const config = require('./config.json')
const intents = new Intents(['GUILDS', 'GUILD_MESSAGES'])
const options = {
  host: 'hypixel.net',
  username: config.user,
  password: config.password,
  version: '1.8.9',
  auth: config.useMicrosoft ? 'microsoft' : 'mojang'
}
// Define the stuff
const client = new Client({ intents })
const bot = mineflayer.createBot(options)
// Events
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', message => {
  client.channels.cache.each(channel => { if (channel.id !== config.channel) return }) // eslint-disable-line no-useless-return
  if (message.author.id === client.user.id) return // eslint-disable-line no-useless-return

  bot.chat(`/gc ${message.author.username}: ${message.content}`)
})

bot.on('chat', (username, message) => {
  if (username !== 'Guild') return // this one line took 30 minutes to debug. i am now scared of the number 29. (it was on line 29 before i added comments and the config check)
  if (message.startsWith('AlyBot')) return
  client.channels.cache.each(channel => { if (channel.id === config.channel) channel.send(message) })
})
// And finally, login
client.login(config.token)
