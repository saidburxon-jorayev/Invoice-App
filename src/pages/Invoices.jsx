import { useEffect, useState } from "react";
import useThemeStore from "../store/useThemeStore";
import Add from "../images/add.svg";
import InvoiceCard from "../components/InvoiceCard";
import db from "../assets/data.json";
import NotFound from "../images/not-found.svg";

function Invoices() {
  const [filter, setFilter] = useState("filter");
  const { theme, setTheme } = useThemeStore();
  const [data, setData] = useState(db);
  useEffect(() => {
    if (filter === "filter") {
      setData(db);
    } else {
      setData(db.filter((prev) => prev.status === filter));
    }
  }, [filter]);

  return (
    <div className="contma">
      {db.length > 0 && (
        <div>
          <div className="flex items-end justify-between xl:gap-[267px]">
            <div className="mt-[34px] pl-[24px]">
              <h1
                className={`${
                  theme == "dark" ? "text-white" : "text-black"
                } font-bold text-[30px] xl:text-[32px]`}
              >
                Invoices
              </h1>
              <p
                className={`${
                  theme == "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
                } font-normal mt-[4px]`}
              >
                {data.length} invoices
              </p>
            </div>
            <div className="flex items-center mb-[10px] gap-[18px] pr-[24px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`${
                  theme == "dark" ? "bg-[#141625] text-white" : "bg-[#F8F8FB]"
                } outline-0 font-bold cursor-pointer`}
              >
                <option value="filter">Filter</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
              <button className="truncate active:scale-90 transition-all flex items-center p-[6px] hover:bg-[#9277FF] bg-[#7C5DFA] text-white gap-[8px] rounded-3xl cursor-pointer">
                <img src={Add} alt="add" />
                New
              </button>
            </div>
          </div>
          <div className="h-[536px] overflow-x-scroll">
            {data.length > 0 &&
              data.map(function (invoice, index) {
                return <InvoiceCard key={index} invoice={invoice} />;
              })}
          </div>
        </div>
      )}

      {db.length == 0 && (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="top-content">
            <div className="flex items-end justify-between xl:gap-[267px]">
              <div className="mt-[34px] pl-[24px]">
                <h1
                  className={`${
                    theme == "dark" ? "text-white" : "text-black"
                  } font-bold text-[30px] xl:text-[32px]`}
                >
                  Invoices
                </h1>
                <p
                  className={`${
                    theme == "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
                  } font-normal mt-[4px]`}
                >
                  {data.length} invoices
                </p>
              </div>
              <div className="flex items-center mb-[10px] gap-[18px] pr-[24px]">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`${
                    theme == "dark" ? "bg-[#141625] text-white" : "bg-[#F8F8FB]"
                  } outline-0 font-bold cursor-pointer`}
                >
                  <option value="filter">Filter</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
                <button className="truncate active:scale-90 transition-all flex items-center p-[6px] hover:bg-[#9277FF] bg-[#7C5DFA] text-white gap-[8px] rounded-3xl cursor-pointer">
                  <img src={Add} alt="add" />
                  New
                </button>
              </div>
            </div>
          </div>
          <img src={NotFound} className="mt-[210px]" alt="notfound" />
          <div className="text-center">
            <h1
              className={`${
                theme == "dark" ? "text-[#fff]" : "text-[#0C0E16]"
              } font-bold text-[20px] mt-[64px] mb-[24px]`}
            >
              There is nothing here
            </h1>
            <p
              className={`${
                theme == "dark" ? "text-[#fff]" : "text-[#0C0E16]"
              } font-normal text-[12px] w-[180px]`}
            >
              Create an invoice by clicking the
              <span
                className={`text-[#DFE3FA] font-bold text-[12px] ${
                  theme == "dark" ? "" : "text-[#888EB0]"
                }`}
              >
                {" "}
                New button{" "}
              </span>
              and get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;
