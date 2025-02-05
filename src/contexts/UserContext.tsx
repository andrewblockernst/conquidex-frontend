'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { getProfile } from './actions';

interface UserContextType {
  user: User | null;
  activeProfile: Member | Guest | null;
  member: Member | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [activeProfile, setActiveProfile] = useState<Member | Guest | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        setUser(session?.user || null);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false); // <-- Siempre marca loading como false al finalizar
      }
    };
    getUser();
  }, []);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true); // <-- Activa loading al actualizar el perfil
        try {
          const { activeProfile, member } = await getProfile(user);
          setActiveProfile(activeProfile);
          setMember(member);
        } catch (error) {
          setError(error as any);
        } finally {
          setLoading(false);
        }
      } else {
        setActiveProfile(null);
        setMember(null);
        setLoading(false); // <-- Asegura marcar loading como false cuando no hay usuario
      }
    };
  
    fetchProfile();
  }, [user]);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    } else {
      setUser(null);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    try {
      const { activeProfile: newProfile, member: newMember } = await getProfile(user);
      setActiveProfile(newProfile);
      setMember(newMember);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <UserContext.Provider value={{ user, activeProfile, member, loading, error, signIn, signOut, refreshProfile }}>
      {children}
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