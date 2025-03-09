import { REST, Routes } from 'discord.js'
import 'dotenv/config'
import { env } from 'node:process'

const commands = [
  {
    name: 'set',
    description: 'このコマンドを実行したチャンネルに通知を送信します'
  }
]

const rest = new REST({ version: '10' }).setToken(env.DISCORD_BOT_TOKEN!)

await rest.put(Routes.applicationCommands(env.DISCORD_APPLICATION_ID!), {
  body: commands
})
