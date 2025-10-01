"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useAuthStore from "@/store/useUserStore";

export default function AuthProvider({ children }) {
  const { isLoaded, user } = useUser();
  const registerUser = useAuthStore((state) => state.registerUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return;

    registerUser(email); // ✅ only runs once after sign-in
  }, [isLoaded, user, registerUser]);

  return children;
}
