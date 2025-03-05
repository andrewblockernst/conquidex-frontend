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
    type ClubEvent = Tables<'events'>
    type Attendance = Tables<'attendance'>
    interface BaseGroup{
      club_id: number
      color: string;
      persons: Person[];
      type: 'unit' | 'class';
    }

    interface UnitGroup extends BaseGroup{
        unit_id: number;
        unit_name: string;
        type: 'unit';
      }

    interface ClassGroup extends BaseGroup{
        class_id: number;
        class_name: string;
        type: 'class';
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

      type UnitInsert = Database['public']['Tables']['units']['Insert'];
      type UnitUpdate = Database['public']['Tables']['units']['Update'];

      type EventInsert = Database['public']['Tables']['events']['Insert'];
      type EventUpdate = Database['public']['Tables']['events']['Update'];

}
