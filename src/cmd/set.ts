import { getOrInsertGuild } from '../lib/getOrInsertGuild.js'
import { Cmd } from '../types/Cmd.js'

export const set: Cmd = async (interaction, db) => {
  if (!interaction.guild_id) {
    return 'このコマンドはサーバー内で実行してください'
  }

  await getOrInsertGuild(interaction.guild_id, db)

  await db
    .updateTable('guild')
    .set('channel_id', interaction.channel_id)
    .where('id', '=', interaction.guild_id)
    .execute()

  return '通知先をここに設定しました'
}
