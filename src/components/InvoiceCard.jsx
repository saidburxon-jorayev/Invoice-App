import React from "react";
import useThemeStore from "../store/useThemeStore";
import { useNavigate } from "react-router-dom";

function InvoiceCard(props) {
  const { theme } = useThemeStore();
  console.log(props.invoice);
  const navigate = useNavigate();

  function handleRedirect(id) {
    navigate(`/${id}`, { state: { invoice: props.invoice } });
  }

  return (
    <div
      onClick={() => handleRedirect(props.invoice.id)}
      className="px-4 sm:px-6 mt-4 flex flex-col gap-[16px]"
    >
      <div
        className={`${
          theme === "dark"
            ? "text-white shadow-md bg-[#1E2139]"
            : "text-black drop-shadow-md bg-white"
        } sm:w-full rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:drop-shadow-lg transition-all`}
      >
        <div className="flex justify-between items-center sm:justify-start sm:gap-8 w-full sm:w-auto">
          <h2 className="font-extrabold text-sm">
            <span className="text-[#7E88C3]">#</span>
            {props.invoice.id}
          </h2>
          <h2 className="sm:block">{props.invoice.clientName}</h2>
        </div>

        <div className="w-full sm:w-auto flex justify-between sm:justify-start sm:gap-8">
          <div className="md:flex md:items-center md:gap-[73px]">
            <p
              className={`${
                theme === "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
              } text-xs xl:flex`}
            >
              {props.invoice.paymentDue}
            </p>
            <h2 className="font-bold text-lg">
              £{props.invoice.total.toFixed(2)}
            </h2>
          </div>

          <div
            className={`${
              theme === "dark"
                ? `${
                    props.invoice.status == "paid"
                      ? "bg-[#1F2B3F]"
                      : props.invoice.status == "draft"
                      ? "bg-[#292C44]"
                      : "bg-[#2B2736]"
                  } `
                : "bg-[#F3FDFA]"
            } flex items-center justify-center rounded-md gap-2 w-[104px] h-10`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                props.invoice.status == "paid"
                  ? "bg-[#33D69F]"
                  : props.invoice.status == "draft"
                  ? theme == "dark"
                    ? "bg-[#fff]"
                    : "bg-[#373B53]"
                  : "bg-[#FF8F00]"
              } ${theme == "dark" ? "text-white" : "text-black"} `}
            ></div>
            <h2
              className={`${
                props.invoice.status == "paid"
                  ? "text-[#33D69F]"
                  : props.invoice.status == "draft"
                  ? theme == "dark"
                    ? "text-[#fff]"
                    : "text-black"
                  : "text-[#FF8F00]"
              } text-sm`}
            >
              {props.invoice.status}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;
