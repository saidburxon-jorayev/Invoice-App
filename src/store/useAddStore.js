import { create } from "zustand";
import data from "../assets/data.json";

const useAddStore = create((set) => ({
  invoices: data,
  addInvoice: (newInvoice) => {
    set((state) => ({
      invoices: [...state.invoices, newInvoice],
    }));
  },
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
  updateInvoice: (id, updates) =>
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, ...updates } : inv
      ),
    })),
}));

export default useAddStore;
