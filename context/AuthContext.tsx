import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AppUser } from '@/types/user';

// ─── Tipos del contexto ──────────────────────────────────────────────────────

type AuthState = 'loading' | 'unauthenticated' | 'active' | 'denied';

interface AuthContextValue {
  /** Estado general del ciclo de autenticación */
  authState: AuthState;
  /** Usuario de Firebase Auth (puede ser null) */
  firebaseUser: User | null;
  /** Documento del usuario en Firestore (null si no existe o no está activo) */
  appUser: AppUser | null;
  /** Cerrar sesión */
  signOut: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  authState: 'loading',
  firebaseUser: null,
  appUser: null,
  signOut: async () => {},
});

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // No hay sesión iniciada
        setFirebaseUser(null);
        setAppUser(null);
        setAuthState('unauthenticated');
        return;
      }

      setFirebaseUser(user);

      try {
        // 1. Leer el documento users/{uid} en Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        // 2. Si el documento no existe → acceso denegado
        if (!userSnap.exists()) {
          setAppUser(null);
          setAuthState('denied');
          return;
        }

        const userData = userSnap.data() as AppUser;

        // 3. Si el status no es "active" → acceso denegado
        if (userData.status !== 'active') {
          setAppUser(null);
          setAuthState('denied');
          return;
        }

        // 4. Todo OK → guardar role y communityId en estado global
        setAppUser(userData);
        setAuthState('active');
      } catch (error) {
        console.error('[AuthContext] Error leyendo usuario en Firestore:', error);
        setAppUser(null);
        setAuthState('denied');
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('[AuthContext] Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, firebaseUser, appUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook de acceso ──────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
