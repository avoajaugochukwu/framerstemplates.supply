import * as migration_20250219_add_api_key_to_users from './20250219_add_api_key_to_users'

export const migrations = [
  {
    up: migration_20250219_add_api_key_to_users.up,
    down: migration_20250219_add_api_key_to_users.down,
    name: '20250219_add_api_key_to_users',
  },
]
