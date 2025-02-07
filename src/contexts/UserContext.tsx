'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { getProfile } from './actions';
//import { supabaseClient } from '@/utils/supabase/config';

interface UserContextType {
  session: Session | null | undefined,
  user: User | null;
  activeProfile: Member | Guest | null;
  member: Member | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const supabaseClient = createClient();
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeProfile, setActiveProfile] = useState<Member | Guest | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
      const setData = async () => {
          const { data: { session }, error } = await supabaseClient.auth.getSession();
          if (error) throw error;
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false);
      };

      const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null)
      });

      setData();

      return () => {
          listener?.subscription.unsubscribe();
      };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const {activeProfile: profile, member} = await getProfile(session?.user!);
      setActiveProfile(profile);
      setMember(member);
    };
    fetchProfile();
  }, [user]);

  const refreshProfile = async () => {
    setLoading(true);
    if (!user) return;
    try {
      const { activeProfile: newProfile, member: newMember } = await getProfile(user);
      setActiveProfile(newProfile);
      setMember(newMember);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const value = {
      session,
      user,
      activeProfile,
      member,
      loading,
      signOut: () => supabaseClient.auth.signOut(),
      refreshProfile
  };


  return (
    <UserContext.Provider value={value}>
        {!loading && children}
    </UserContext.Provider>
);
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};