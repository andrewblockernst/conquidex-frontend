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
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  
  useEffect(() => {
    let mounted = true;
  
    const setData = async () => {
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (mounted) {
          // Solo actualizamos si realmente hay un cambio
          setSession(prevSession => {
            if (prevSession?.user?.id === session?.user?.id) return prevSession;
            return session;
          });
          setUser(prevUser => {
            if (prevUser?.id === session?.user?.id) return prevUser;
            return session?.user ?? null;
          });
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };
  
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        // Solo actualizamos si realmente hay un cambio
        setSession(prevSession => {
          if (prevSession?.user?.id === session?.user?.id) return prevSession;
          return session;
        });
        setUser(prevUser => {
          if (prevUser?.id === session?.user?.id) return prevUser;
          return session?.user ?? null;
        });
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
      setProfileLoading(true);
      if (!user) {
        if (mounted) {
          setActiveProfile(null);
          setMember(null);
          setClub(null);
          setProfileLoading(false);
        }
        return;
      }

      try {
        const { activeProfile: profile, member } = await getProfile(user!);
        
        if (!mounted) return;
        
        setActiveProfile(profile);
        setMember(member);

        if (profile?.club_id) {
          const profile_club = await getClub(profile.club_id);
          if (mounted) {
            setClub(profile_club);
          }
        } else {
          setClub(null);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        if (mounted) {
          setProfileLoading(false);
        }
      }
    };

    fetchProfileAndClub();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Calculamos el loading general
  const loading = useMemo(() => {
    // Si la autenticación aún está cargando, todo está cargando
    if (authLoading) return true;
    // Si no hay usuario, no necesitamos esperar al perfil
    if (!user) return false;
    // Si hay usuario, esperamos a que el perfil termine de cargar
    return profileLoading;
  }, [authLoading, user, profileLoading]);

  const refreshProfile = async () => {
    if (!user) return;
    
    setProfileLoading(true);
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
      setProfileLoading(false);
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
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <img src="/logo.png" alt="conquidex" className="w-32" />
        </div>
      )}
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