import { db } from './db.js'

export const getOrInsertGuild = async (guildId: string) => {
  const guild = await db
    .selectFrom('guild')
    .selectAll()
    .where('id', '=', guildId)
    .executeTakeFirst()

  if (guild) {
    return guild
  }

  await db
    .insertInto('guild')
    .values({
      id: guildId,
      channel_id: ''
    })
    .execute()

  return await db
    .selectFrom('guild')
    .selectAll()
    .where('id', '=', guildId)
    .executeTakeFirstOrThrow()
}
