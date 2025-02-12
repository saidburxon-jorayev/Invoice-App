import { create } from "zustand";
import data from "../assets/data.json";

const useAddStore = create((set) => ({
  invoices: data,
  addInvoice: (newInvoice) => {
    set((state) => {
      const updatedInvoices = [...state.invoices, newInvoice];
      return { invoices: updatedInvoices };
    });
  },
}));

export default useAddStore;
