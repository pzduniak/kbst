import Bot from 'keybase-bot'
import rp from 'request-promise-native'
import moment from 'moment'
import delay from 'delay'

const owner = process.env.KEYBASE_OWNER || 'pzduniak'
const pongURL = process.env.KBST_URL || ''
const bot = new Bot({
  debugLogging: true,
})

async function main() {
  try {
    if (process.env.KEYBASE_PAPERKEY && !process.env.KEYBASE_SERVICE) {
      await bot.init(process.env.KEYBASE_USERNAME, process.env.KEYBASE_PAPERKEY, {
        autoLogSendOnCrash: true,
        verbose: false,
      })
    } else {
      await bot.initFromRunningService('/home/keybase', {
        adminDebugDirectory: '/home/keybase',
        verbose: false,
      })
    }

    const username = bot.myInfo().username

    await bot.chat.watchChannelForNewMessages({
      name: 'kbst',
      membersType: 'team',
      topicType: 'chat',
      topicName: 'general',
    }, async message => {
      //await bot.chat.watchAllChannelsForNewMessages(async message => {
      console.log(message)

      // Only respond to the bot's owner
      if (message.sender.username !== owner) {
        return
      }
      // And only to their text messages 
      if (message.content.type !== 'text' || !message.content.text) {
        return
      }

      // Check out if the message is targeted as us, so either:
      //   @ourname crash
      // or
      //   crash
      const tag = '@' + username
      if (!message.content.text.body.startsWith(tag)) {
        if (message.content.text.body[0] === '@') {
          return
        }
      }

      // 1. crash
      if (message.content.text.body.includes('crash')) {
        await bot.chat.send(message.channel, {
          body: 'Goodbye cruel world! Crashing in 3s.'
        })
        await delay(3000)
        await bot.chat.crash()
        return
      }

      // 2. ping
      if (message.content.text.body.includes('ping')) {
        // ping involves sending a request to an API
        if (pongURL) {
          try {
            await rp({
              method: 'POST',
              uri: pongURL,
              body: {
                username,
                message: message.content.text.body,
                timestamp: moment().unix(),
              },
              json: true,
            })
          } catch(err) {
            await bot.chat.send(message.channel, {
              body: `Pong failed: ${err}`,
            })
          }
        }

        await bot.chat.send(message.channel, {
          body: 'Pong!',
        })
        return
      }
    }, err => console.error(err))
  } catch(error) {
    console.error(error)
  } finally {
    console.log('Shutting down')

    // our own "log send on crash"
    if (!process.env.KEYBASE_PAPERKEY) {
      await bot.logSend()
    }

    try {
      await bot.deinit()
    } catch(_) {}
  }
}

async function shutDown() {
  await bot.deinit()
  process.exit()
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

main()
