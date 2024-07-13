/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed'
import bcrypt from 'bcrypt'

const main = async () => {
  const seed = await createSeedClient({
    models: {
      user: {
        data: {
          password: (ctx) => bcrypt.hashSync(ctx.seed, 10)
        }
      }
    }
  })

  // Truncate all tables in the database
  await seed.$resetDatabase()

  await seed.profile((x) => x(10))

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!')

  process.exit()
}

main()
