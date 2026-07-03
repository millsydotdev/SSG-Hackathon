"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthService } from "./auth-service";
import type {
  AuthResult,
  IdentitySession,
  SignInParams,
  SignUpParams,
} from "./types";

const EMPTY_RESULT: AuthResult = {
  session: {
    user: null,
    status: "unauthenticated",
    accessToken: null,
    expiresAt: null,
  },
  error: { code: "", message: "Not initialized" },
};

interface SessionStoreValue {
  session: IdentitySession;
  isLoading: boolean;
  error: string | null;
  signIn: (params: SignInParams) => Promise<AuthResult>;
  signUp: (params: SignUpParams) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const EMPTY_SESSION: IdentitySession = {
  user: null,
  status: "unauthenticated",
  accessToken: null,
  expiresAt: null,
};

const SessionStoreContext = createContext<SessionStoreValue>({
  session: EMPTY_SESSION,
  isLoading: true,
  error: null,
  signIn: () => Promise.resolve(EMPTY_RESULT),
  signUp: () => Promise.resolve(EMPTY_RESULT),
  signOut: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
});

export function SessionStoreProvider({
  children,
  authService,
}: {
  children: ReactNode;
  authService: AuthService;
}) {
  const [session, setSession] = useState<IdentitySession>(EMPTY_SESSION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authService.getSession().then((s) => {
      setSession(s);
      setIsLoading(false);
    });

    const unsubscribe = authService.onAuthStateChange((s) => {
      setSession(s);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [authService]);

  const signIn = useCallback(
    async (params: SignInParams) => {
      setError(null);
      setIsLoading(true);
      const result = await authService.signIn(params);
      if (result.error) {
        setError(result.error.message);
      } else {
        setSession(result.session);
      }
      setIsLoading(false);
      return result;
    },
    [authService],
  );

  const signUp = useCallback(
    async (params: SignUpParams) => {
      setError(null);
      setIsLoading(true);
      const result = await authService.signUp(params);
      if (result.error) {
        setError(result.error.message);
      } else {
        setSession(result.session);
      }
      setIsLoading(false);
      return result;
    },
    [authService],
  );

  const signOut = useCallback(async () => {
    setError(null);
    await authService.signOut();
    setSession(EMPTY_SESSION);
  }, [authService]);

  const refresh = useCallback(async () => {
    const s = await authService.refreshSession();
    setSession(s);
  }, [authService]);

  return (
    <SessionStoreContext.Provider
      value={{ session, isLoading, error, signIn, signUp, signOut, refresh }}
    >
      {children}
    </SessionStoreContext.Provider>
  );
}

export function useSessionStore() {
  return useContext(SessionStoreContext);
}
