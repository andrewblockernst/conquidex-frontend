'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { getClub, getProfile } from './actions';

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
  
  // Control de la sesión
  useEffect(() => {
    let mounted = true;

    const setData = async () => {
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      }
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
      }
    });

    setData();

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch del perfil y club
  useEffect(() => {
    let mounted = true;

    const fetchProfileAndClub = async () => {
      if (!user) {
        if (mounted) {
          setActiveProfile(null);
          setMember(null);
          setClub(null);
        }
        return;
      }

      try {
        const { activeProfile: profile, member } = await getProfile(user);
        
        if (!mounted) return;
        
        setActiveProfile(profile);
        setMember(member);

        if (profile?.club_id) {
          const profile_club = await getClub(profile.club_id);
            setClub(profile_club);
          }
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileAndClub();

    return () => {
      mounted = false;
    };
  }, [user]);

  const refreshProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { activeProfile: profile, member } = await getProfile(user);
      setActiveProfile(profile);
      setMember(member);

      if (profile?.club_id) {
        const profile_club = await getClub(profile.club_id);
        setClub(profile_club);
      } else {
        setClub(null);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({
    session,
    user,
    activeProfile,
    member,
    club,
    loading,
    refreshProfile
  }), [session, user, activeProfile, member, club, loading]);

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