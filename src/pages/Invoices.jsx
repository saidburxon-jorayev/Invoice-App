import React from "react";
import useThemeStore from "../store/useThemeStore";
import Add from "../images/add.svg";
import InvoiceCard from "../components/InvoiceCard";

function Invoices() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="contma xl:justify-between xl:flex xl:items-start">
      <div className="flex items-end justify-between xl:gap-[267px]">
        <div className="mt-[34px] pl-[24px]">
          <h1
            className={`${
              theme == "dark"
                ? "text-white font-bold text-[30px] xl:font-bold xl:text-[32px]"
                : "text-black font-bold text-[30px] xl:font-bold xl:text-[32px]"
            }`}
          >
            Invoices
          </h1>
          <p
            className={`${
              theme == "dark"
                ? "text-[#DFE3FA] font-normal mt-[4px] md:font-normal md:text-[15px] md:leading-[15px]"
                : "text-[#888EB0] font-normal mt-[4px]"
            } `}
          >
            7 invoices
          </p>
        </div>
        <div className="flex items-center mb-[10px] gap-[18px] pr-[24px]">
          <select
            className={`${
              theme == "dark"
                ? "bg-[#141625] text-white outline-0 font-bold sm:text-[12px] cursor-pointer md:text-[16px]"
                : "bg-[#F8F8FB] outline-0 font-bold sm:text-[12px] cursor-pointer md:text-[16px]"
            }`}
          >
            <option className="cursor-pointer" value="filter">
              Filter
            </option>
            <option className="cursor-pointer" value="paid">
              Paid
            </option>
            <option className="cursor-pointer" value="pending">
              Pending
            </option>
            <option className="cursor-pointer" value="draft">
              Draft
            </option>
          </select>
          <button className="active:scale-90 transition-all flex items-center p-[6px] bg-[#7C5DFA] text-white gap-[8px] rounded-3xl cursor-pointer">
            <img src={Add} alt="add" />
            New
          </button>
        </div>
      </div>
      {/* <InvoiceCard /> */}
    </div>
  );
}

export default Invoices;
