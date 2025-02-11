import { useEffect, useState } from "react";
import useThemeStore from "../store/useThemeStore";
import { ChevronDown } from "lucide-react";

function AddInvoice({ add, onClose }) {
  const { theme } = useThemeStore();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (add) {
      setIsClosing(false);
    }
  }, [add]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }

  const [formData, setFormData] = useState({
    id: Date.now(),
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: "",
    paymentTerms: "1",
    description: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getInputClass() {
    return `w-full p-4 rounded-lg border outline-none transition-colors ${
      theme === "dark"
        ? "bg-[#1E2139] border-[#252945] text-white focus:border-[#7C5DFA]"
        : "bg-white border-gray-200 text-gray-900 focus:border-[#7C5DFA]"
    }`;
  }

  function getLabelClass() {
    return `block mb-2 text-sm font-medium ${
      theme === "dark" ? "text-gray-300" : "text-[#7E88C3]"
    }`;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div
        className={`fixed left-0 top-0 h-full w-full md:w-[616px] lg:w-[720px] transform transition-all duration-300 ease-in-out
          ${!isClosing ? "translate-x-0" : "-translate-x-full"}
          ${theme === "dark" ? "bg-[#141625]" : "bg-white"}`}
      >
        <div className="h-full flex flex-col p-6 md:p-8">
          <h1
            className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${
              theme === "dark" ? "text-white" : "text-[#0C0E16]"
            }`}
          >
            New Invoice
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
            className="flex-1 overflow-y-auto space-y-6 md:space-y-8"
          >
            <div>
              <p className="text-[#7C5DFA] font-bold text-xs md:text-sm mb-6">
                Bill From
              </p>

              <div className="space-y-6">
                <div>
                  <label className={getLabelClass()}>Street Address</label>
                  <input
                    name="senderStreet"
                    value={formData.senderStreet}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  <div>
                    <label className={getLabelClass()}>City</label>
                    <input
                      name="senderCity"
                      value={formData.senderCity}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div>
                    <label className={getLabelClass()}>Post Code</label>
                    <input
                      name="senderPostCode"
                      value={formData.senderPostCode}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={getLabelClass()}>Country</label>
                    <input
                      name="senderCountry"
                      value={formData.senderCountry}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#7C5DFA] font-bold text-xs md:text-sm mb-6">
                Bill To
              </p>

              <div className="space-y-6">
                <div>
                  <label className={getLabelClass()}>Client's Name</label>
                  <input
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div>
                  <label className={getLabelClass()}>Client's Email</label>
                  <input
                    name="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div>
                  <label className={getLabelClass()}>Street Address</label>
                  <input
                    name="clientStreet"
                    value={formData.clientStreet}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  <div>
                    <label className={getLabelClass()}>City</label>
                    <input
                      name="clientCity"
                      value={formData.clientCity}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div>
                    <label className={getLabelClass()}>Post Code</label>
                    <input
                      name="clientPostCode"
                      value={formData.clientPostCode}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={getLabelClass()}>Country</label>
                    <input
                      name="clientCountry"
                      value={formData.clientCountry}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={getLabelClass()}>Invoice Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    className={`${getInputClass()}`}
                  />
                </div>
              </div>

              <div>
                <label className={getLabelClass()}>Payment Terms</label>
                <div className="relative">
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className={`${getInputClass()} appearance-none`}
                  >
                    <option value="1">Next 1 day</option>
                    <option value="7">Next 7 days</option>
                    <option value="14">Next 14 days</option>
                    <option value="30">Next 30 days</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={getLabelClass()}>Project Description</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Graphic Design Service"
                className={getInputClass()}
              />
            </div>

            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Item List
              </h2>
              <button
                type="button"
                className={`w-full py-4 rounded-full font-bold transition-colors
                  ${
                    theme === "dark"
                      ? "bg-[#252945] text-gray-300 hover:bg-[#1E2139]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }cursor-pointer`}
              >
                + Add New Item
              </button>
            </div>
          </form>

          <div
            className={`mt-4 md:mt-8 -mx-6 md:mx-0 px-6 md:px-0 py-6 flex items-center justify-between border-t
            ${theme === "dark" ? "border-[#252945]" : "border-gray-200"}`}
          >
            <button
              onClick={handleClose}
              className={`px-4 md:px-6 py-4 rounded-full font-bold text-sm md:text-base transition-colors
                ${
                  theme === "dark"
                    ? "bg-[#252945] text-gray-300 hover:bg-[#1E2139]"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                } cursor-pointer`}
            >
              Discard
            </button>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                className={`px-4 md:px-6 py-4 rounded-full font-bold text-sm md:text-base transition-colors
                  ${
                    theme === "dark"
                      ? "bg-[#373B53] text-[#DFE3FA] hover:bg-[#1E2139]"
                      : "bg-[#373B53] text-white hover:bg-[#0C0E16]"
                  } cursor-pointer`}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-4 cursor-pointer md:px-6 py-4 rounded-full font-bold text-sm md:text-base text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInvoice;
