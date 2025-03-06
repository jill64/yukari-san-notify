import { EmbedBuilder } from 'discord.js'
import { client } from './lib/client.js'
import { db } from './lib/db.js'
import { getOrInsertGuild } from './lib/getOrInsertGuild.js'

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (oldState.member?.user.bot || newState.member?.user.bot) {
    return
  }

  if (!oldState.channelId && newState.channelId) {
    if (!newState.member?.id) {
      return
    }

    const guild = await getOrInsertGuild(newState.guild.id)

    if (!guild) {
      return
    }

    const channel = client.channels.cache.get(guild.channel_id)

    if (!channel) {
      return
    }

    const embed = new EmbedBuilder()
      .setColor(0xffd3fb)
      .setTitle(
        `**${newState.guild.name}** の **${newState.channel?.name}** に **${newState.member.displayName}**さんが入室しました`
      )
      .setImage(newState.member.user.displayAvatarURL())

    // @ts-expect-error TODO: Fix this
    channel.send({ embeds: [embed] })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  await interaction.deferReply()

  if (interaction.commandName === 'set') {
    if (!interaction.guildId) {
      await interaction.editReply('このコマンドはサーバー内で実行してください')
      return
    }

    try {
      await getOrInsertGuild(interaction.guildId)
    } catch (e) {
      await interaction.editReply(`内部エラーが発生しました。以下ににエラーの内容を示します。
${e}`)
      return
    }

    await db
      .updateTable('guild')
      .set('channel_id', interaction.channelId)
      .where('id', '=', interaction.guildId)
      .execute()

    await interaction.editReply('通知先をここに設定しました')

    return
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
