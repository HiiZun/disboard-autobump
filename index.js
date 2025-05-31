require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')

// Support for multiple tokens
const tokens = process.env.TOKEN.split(',').map(token => token.trim())
const bumpChannels = process.env.BUMP_CHANNEL.split(',').map(channel => channel.trim())

// Ensure we have matching tokens and channels
if (tokens.length !== bumpChannels.length) {
    console.error('Number of tokens must match number of bump channels')
    process.exit(1)
}

async function createBot(token, channelId, botIndex) {
    const client = new Client()
    
    client.on('ready', async () => {
        console.log(`Bot ${botIndex + 1} logged in as ${client.user.tag}!`)

        const channel = await client.channels.fetch(channelId)
        
        async function bump() {
            const slashId = process.env.SLASH_ID || '302050872383242240'
            await channel.sendSlash(slashId, 'bump')
            console.log(`Bot ${botIndex + 1} bumped!`)
        }

        function loop() {
            // send bump message every 2-3 hours, to prevent detection.
            var randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000
            setTimeout(function () {
                bump()
                loop()
            }, randomNum)
        }
        
        // Add random delay before first bump to spread out multiple bots
        const initialDelay = Math.random() * 60000 * botIndex // 0-1 minute per bot index
        setTimeout(() => {
            bump()
            loop()
        }, initialDelay)
    })

    await client.login(token)
}

// Create and start all bots
async function startAllBots() {
    for (let i = 0; i < tokens.length; i++) {
        try {
            await createBot(tokens[i], bumpChannels[i], i)
            // Add delay between bot startups
            if (i < tokens.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 5000))
            }
        } catch (error) {
            console.error(`Failed to start bot ${i + 1}:`, error)
        }
    }
}

startAllBots()
