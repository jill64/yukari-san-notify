import { Kysely } from 'kysely'
import { getOrInsertGuild } from '../lib/getOrInsertGuild.js'
import { Database } from '../lib/schema.js'
import { VoiceState } from '../types/VoiceState.js'
import { send_embed } from './send_embed.js'

export const voice = async (
  request: Request,
  bot_token: string,
  db: Kysely<Database>
): Promise<Response> => {
  const { old_state, new_state } = (await request.json()) as {
    old_state: VoiceState
    new_state: VoiceState
  }

  if (old_state.bot || new_state.bot) {
    return new Response('Bot is not allowed', { status: 400 })
  }

  if (!old_state.channel_id && new_state.channel_id) {
    if (!old_state.user_id) {
      return new Response('User ID is required', { status: 400 })
    }

    const guild = await getOrInsertGuild(new_state.guild_id, db)

    if (!guild) {
      return new Response('Guild not found', { status: 404 })
    }

    const res = await send_embed(
      guild.channel_id,
      `${new_state.channel_name} に ${new_state.user_name}さんが入室しました`,
      new_state.user_avatar_url,
      bot_token
    )

    return res
  }

  return new Response('OK')
}
