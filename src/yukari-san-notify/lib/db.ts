import { Kysely } from 'kysely'
import { SolarSystemDialect } from 'kysely-solarsystem'
import { env } from 'node:process'
import type { Database } from './schema.js'

export const db = new Kysely<Database>({
  // @ts-expect-error TODO: Fix this
  dialect: new SolarSystemDialect({
    teamName: 'jill64',
    clusterName: 'Yukari-San-Notify',
    branchName: 'main',
    apiKey: env.SOLARSYSTEM_API_KEY!
  })
})
