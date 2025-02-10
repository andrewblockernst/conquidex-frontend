'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { getClub, getProfile } from './actions';
//import { supabaseClient } from '@/utils/supabase/config';

interface UserContextType {
  session: Session | null | undefined,
  user: User | null;
  activeProfile: Member | Guest | null;
  member: Member | null;
  club: Club | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const supabaseClient = createClient();
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>();
  const [user, setUser] = useState<User | null>(null);

  const [activeProfile, setActiveProfile] = useState<Member | Guest | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [club, setClub] = useState<Club | null>(null);

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

  const fetchProfile = async () => {
    setLoading(true);
    if (!user) return;
    try {
      const {activeProfile: profile, member} = await getProfile(user);
      setActiveProfile(profile);
      setMember(member);
      if (profile){
        const profile_club = await getClub(profile.club_id!);
        setClub(profile_club)
      }
      setLoading(false);
    }catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const refreshProfile = async () => {
    fetchProfile();
  };

  const value = {
      session,
      user,
      activeProfile,
      member,
      club,
      loading,
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