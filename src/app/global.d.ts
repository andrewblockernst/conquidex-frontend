import type { Database as DB, Tables } from '@/types/database.types'

declare global {
    type Database = DB
    type Member = Tables<'members'>
    type Club = Tables<'clubs'>
    type User = Tables<'auth.users'>
    type Guest = Tables<'guests'>
}