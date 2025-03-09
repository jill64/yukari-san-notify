import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  guild: GuildTable
}

type Immutable<T> = ColumnType<T, T, never>

export interface GuildTable {
  id: Immutable<string> // Primary Key
  channel_id: string
}

export type Guild = Selectable<GuildTable>
export type NewGuild = Insertable<GuildTable>
export type GuildUpdate = Updateable<GuildTable>
