import { create } from "zustand";
import db from "../assets/data.json";

const useDeleteStore = create((set) => ({
  invoices: db,
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
}));

export default useDeleteStore;
