"use client";

import { useEffect, ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";
import useAuthStore from "@/store/useUserStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, user } = useUser();
  const registerUser = useAuthStore((state) => state.registerUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return;

    registerUser(email);
  }, [isLoaded, user, registerUser]);

  return children;
}
