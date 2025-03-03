'use server'

import { createClient } from "@/utils/supabase/server";

export async function createPerson(personData: PersonFormData): Promise<boolean> {
  const supabase = await createClient();
  const { units, classes, ...personInsertData } = personData;

  const { error } = await supabase.rpc('create_person', {
    person_data: personInsertData,
    unit_ids: units,
    class_ids: classes
  });

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
}

export async function fetchRoles(): Promise<Role[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('available_roles')
    .select('*')
    .order('hierarchy');

  if (error) {
    throw new Error(`Error fetching roles: ${error.message}`);
  }

  return data as Role[];
}

export async function fetchClasses(): Promise<Class[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('id');

  if (error) {
    throw new Error(`Error fetching classes: ${error.message}`);
  }

  return data;
}