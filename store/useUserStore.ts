// // src/store/useUserStore.ts
// import { create } from "zustand";

// interface AuthState {
//   registerUser: (email: string) => void;
// }

// const useAuthStore = create<AuthState>(() => ({
//   registerUser: (email: string) => {
//     // Example logic (replace with your API call if needed)
//     console.log("Registering user:", email);
//   },
// }));

// export default useAuthStore;


// src/store/useUserStore.ts
import { create } from "zustand";

interface AuthState {
  registerUser: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  registerUser: async (email: string) => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // Optionally store returned user/token
      console.log("User registered:", data);

      set({ loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
