import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  registerUser: async (email:string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/v1/auth/register", { email });
      set({ user: response.data, loading: false });
      console.log(response.data)
    } catch (err) {
        //@ts-ignore
      set({ error: err.message, loading: false });
      console.error("Registration failed:", err);
    }
  },
}));

export default useAuthStore;
