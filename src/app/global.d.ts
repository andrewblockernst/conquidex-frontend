import type { Database as DB, Tables } from '@/types/database.types'

declare global {
    type Database = DB
    type Member = Tables<'members'>
    type Club = Tables<'clubs'>
    type User = Tables<'auth.users'>
    type Guest = Tables<'guests'>
    type Person = Tables<'persons'>
    type GroupData = UnitGroup | ClassGroup;
    type Unit = Tables<'units'>
    type Honor = Tables<'honors'>
    type Class = Tables<'classes'>
    type ClassItem = Tables<'class_items'>
    type Role = Tables<'roles'>
    interface UnitGroup{
        unit_id: number;
        club_id: number
        unit_name: string;
        color: string;
        persons: Person[];
      }

    interface ClassGroup {
        class_id: number;
        club_id: number
        class_name: string;
        color: string;
        persons: Person[];
      }

      type ClassWithItems = {
          id: number
          name: string
          color: string
          is_completed: boolean
          completion_date: string
          class_items: ClassItem[]
        }
      
      type MemberData = {
          id: number
          classes: ClassWithItems[]
          units: Unit[]
          honors: Honor[]
        }

      // Para inserción
      type PersonInsert = Database['public']['Tables']['persons']['Insert']
      // Para actualización
      type PersonUpdate = Database['public']['Tables']['persons']['Update']

      type PersonFormResult = Person & {
        units?: Unit[]
        classes?: Class[]
      }
      type PersonFormData = 
        PersonInsert & {
        units: number[]
        classes: number[]
      }

}
