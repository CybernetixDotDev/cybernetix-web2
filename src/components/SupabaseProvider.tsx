"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useMemo } from "react";

export default function SupabaseProvider({
  children,
  initialSession,
}: PropsWithChildren<{ initialSession: Session | null }>) {
  const supabase = useMemo(() => createClientComponentClient(), []);
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
}
