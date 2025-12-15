// src/store/useUserStore.ts
import { create } from "zustand";

interface AuthState {
  registerUser: (email: string) => void;
}

const useAuthStore = create<AuthState>(() => ({
  registerUser: (email: string) => {
    // Example logic (replace with your API call if needed)
    console.log("Registering user:", email);
  },
}));

export default useAuthStore;
