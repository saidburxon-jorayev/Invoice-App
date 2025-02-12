import { create } from "zustand";
import db from "../assets/data.json";

const useThemeStore = create((set) => ({
  theme: "light",
  invoices: db,
  setTheme: (newTheme) => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id != id),
    })),
}));

export default useThemeStore;
