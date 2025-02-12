import { useEffect, useState } from "react";
import useThemeStore from "../store/useThemeStore";
import { ChevronDown } from "lucide-react";
import { Toaster, toast } from "sonner";
import Trash from "../images/trash-can.svg";
import useAddStore from "../store/useAddStore";

function AddInvoice({ add, onClose }) {
  const [item, setItem] = useState([]);
  const { theme } = useThemeStore();
  const { addInvoice, invoices } = useAddStore();
  const [isClosing, setIsClosing] = useState(false);

  const error = (text) => {
    toast.error(text);
  };

  useEffect(() => {
    if (add) {
      setIsClosing(false);
    }
  }, [add]);

  function validate() {
    if (formData.senderStreet.length <= 10) {
      error("Street Address 10ta belgidan kam!");
      return false;
    }
    if (formData.senderCity.length < 4) {
      error("City Address 4ta belgidan kam!");
      return false;
    }
    if (formData.senderPostCode.length < 6) {
      error("Post Code 6ta belgidan kam!");
      return false;
    }
    if (formData.senderCountry.length <= 3) {
      error("Country 3ta belgidan kam!");
      return false;
    }
    if (formData.clientName.length <= 2) {
      error("Client Name 3ta belgidan kam!");
      return false;
    }
    if (formData.clientEmail.length < 11) {
      error("Client Email 11ta belgidan kam!");
      return false;
    }
    if (formData.clientStreet.length <= 10) {
      error("Street Address 10ta belgidan kam!");
      return false;
    }
    if (formData.clientCity.length <= 3) {
      error("City 3ta belgidan kam!");
      return false;
    }
    if (formData.clientPostCode.length < 6) {
      error("Post Code 6ta belgidan kam!");
      return false;
    }
    if (formData.clientCountry.length < 2) {
      error("Country 6ta belgidan kam!");
      return false;
    }
    if (formData.senderPostCode.length < 6) {
      error("Post Code 6ta belgidan kam!");
      return false;
    }
    if (formData.description.length < 15) {
      error("Description 15ta belgidan kam!");
      return false;
    }
    if (formData.invoiceDate.length != 10) {
      error("Iltimos Invoice Date kiriting!");
      return false;
    }
    return true;
  }

  function generateId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "12345678910";
    let id = "";

    for (let i = 0; i < 6; i++) {
      if (Math.random() < 0.5) {
        id += letters[Math.floor(Math.random() * letters.length)];
      } else {
        id += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }

    return id;
  }

  function handleDeleteItem(id) {
    setItem(item.filter((prev) => prev.id != id));
  }

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }

  function AddNewItem() {
    setItem([...item, { name: "", qty: "1", price: "", id: Date.now() }]);
  }

  function handleItemChange(id, field, value) {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  const [formData, setFormData] = useState({
    id: generateId(),
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

  function postInvoice() {
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const invoiceDate = formData.invoiceDate
      ? new Date(formData.invoiceDate)
      : new Date();

    const paymentTerms = parseInt(formData.paymentTerms) || 1;

    const paymentDue = new Date(invoiceDate);
    paymentDue.setDate(paymentDue.getDate() + paymentTerms);

    const formattedInvoiceDate = invoiceDate.toISOString().split("T")[0];
    const formattedPaymentDue = paymentDue.toISOString().split("T")[0];

    const itemsTotal = item.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    const transformedData = {
      id: formData.id,
      createdAt: formattedInvoiceDate,
      paymentDue: formattedPaymentDue,
      description: formData.description,
      paymentTerms: paymentTerms,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      status: "pending",
      senderAddress: {
        street: formData.senderStreet,
        city: formData.senderCity,
        postCode: formData.senderPostCode,
        country: formData.senderCountry,
      },
      clientAddress: {
        street: formData.clientStreet,
        city: formData.clientCity,
        postCode: formData.clientPostCode,
        country: formData.clientCountry,
      },
      items: item.map((item) => ({
        name: item.name,
        quantity: item.qty,
        price: item.price,
        total: item.qty * item.price,
      })),
      total: itemsTotal,
    };

    addInvoice(transformedData);

    console.log("Invoice Date:", formattedInvoiceDate);
    console.log("Payment Due Date:", formattedPaymentDue);
    console.log("Transformed Data:", transformedData);

    handleClose();
  }

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

          <form className="flex-1 overflow-y-auto space-y-6 md:space-y-8">
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

              {item.length > 0 &&
                item.map((value) => {
                  return (
                    <div key={value.id} className="mb-[48px]">
                      <div className="flex flex-col flex-wrap">
                        <div className="flex flex-col">
                          <label className={getLabelClass()} htmlFor="item">
                            Item Name
                          </label>
                          <input
                            type="text"
                            value={value.name}
                            onChange={(e) =>
                              handleItemChange(value.id, "name", e.target.value)
                            }
                            className={getInputClass()}
                            id="item"
                            placeholder="Item Name"
                          />
                        </div>
                        <div className="flex gap-[16px] flex-wrap">
                          <div className="qty">
                            <label
                              className={`${getLabelClass()} mt-[24px]`}
                              htmlFor="qty"
                            >
                              Qty.
                            </label>
                            <input
                              type="number"
                              value={value.qty}
                              onChange={(e) =>
                                handleItemChange(
                                  value.id,
                                  "qty",
                                  Number(e.target.value)
                                )
                              }
                              className={getInputClass()}
                              id="qty"
                              placeholder="Item Qty."
                            />
                          </div>
                          <div className="price">
                            <label
                              className={`${getLabelClass()} mt-[24px]`}
                              htmlFor="price"
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              value={value.price}
                              onChange={(e) =>
                                handleItemChange(
                                  value.id,
                                  "price",
                                  Number(e.target.value)
                                )
                              }
                              className={getInputClass()}
                              id="price"
                              placeholder="Item Price"
                            />
                          </div>
                          <div className="total">
                            <label
                              className={`${getLabelClass()} mt-[24px]`}
                              htmlFor="item"
                            >
                              Total
                            </label>
                            <p
                              className={`${getLabelClass()} mt-[27px] truncate`}
                            >
                              {(value.qty * value.price).toFixed(2)}
                            </p>
                          </div>
                          <div className="delete">
                            <img
                              onClick={() => handleDeleteItem(value.id)}
                              className={`mt-[65px] ml-[30px] cursor-pointer`}
                              src={Trash}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <button
                onClick={AddNewItem}
                type="button"
                className={`w-full py-4 rounded-full font-bold transition-colors
                  ${
                    theme === "dark"
                      ? "bg-[#252945] text-gray-300 hover:bg-[#1E2139]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  } cursor-pointer`}
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
                onClick={postInvoice}
                className="px-4 cursor-pointer md:px-6 py-4 rounded-full font-bold text-sm md:text-base text-white bg-[#7C5DFA] hover:bg-[#9277FF] transition-colors"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-center" expand={false} />
    </div>
  );
}

export default AddInvoice;
