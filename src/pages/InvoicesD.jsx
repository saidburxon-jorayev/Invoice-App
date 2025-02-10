import React from "react";
import { Link, useLocation } from "react-router-dom";
import useThemeStore from "../store/useThemeStore";
import Back from "../images/back.svg";

function InvoicesD() {
  const { theme } = useThemeStore();
  const location = useLocation();
  const invoice = location.state?.invoice;

  console.log(invoice);

  return (
    <div className="contma px-[24px]">
      <div className="flex gap-[23px] pl-[24px] items-center mt-[32px]">
        <img src={Back} alt="arrow left" />
        <Link
          to="/"
          className={`${theme == "dark" ? "text-white" : "text-black"}`}
        >
          Go back
        </Link>
      </div>
      <div
        className={`flex ${
          theme == "dark" ? "bg-[#1E2139]" : "bg-[#FFFFFF]"
        } items-center pl-[24px] min-w-[327px] h-[91px] justify-between rounded-[8px] xl:w-[730px] px-[24px] mt-[32px]`}
      >
        <p
          className={`${theme == "dark" ? "text-[#DFE3FA]" : "text-[#858BB2]"}`}
        >
          Status
        </p>
        <div
          className={`${
            theme === "dark"
              ? `${
                  invoice.status == "paid"
                    ? "bg-[#1F2B3F]"
                    : invoice.status == "draft"
                    ? "bg-[#292C44]"
                    : "bg-[#2B2736]"
                } `
              : "bg-[#F3FDFA]"
          } flex items-center justify-center rounded-md gap-2 w-[104px] h-10`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              invoice.status == "paid"
                ? "bg-[#33D69F]"
                : invoice.status == "draft"
                ? theme == "dark"
                  ? "bg-[#fff]"
                  : "bg-[#373B53]"
                : "bg-[#FF8F00]"
            } ${theme == "dark" ? "text-white" : "text-black"} `}
          ></div>
          <h2
            className={`${
              invoice.status == "paid"
                ? "text-[#33D69F]"
                : invoice.status == "draft"
                ? theme == "dark"
                  ? "text-[#fff]"
                  : "text-black"
                : "text-[#FF8F00]"
            } text-sm`}
          >
            {invoice.status}
          </h2>
        </div>
      </div>
      <div
        className={`${
          theme == "dark" ? "bg-[#1E2139]" : "bg-[#FFFFFF]"
        } mt-[16px] p-[24px] rounded-[8px]`}
      >
        <div className="infoo">
          <div className="names">
            <p
              className={`${
                theme == "dark" ? "text-[#7E88C3]" : "text-[#7E88C3]"
              } font-bold text-[12px] xl:text-[16px]`}
            >
              #
              <span
                className={`${theme == "dark" ? "text-white" : "text-black"}`}
              >
                {invoice.id}
              </span>
            </p>
            <p
              className={`${
                theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
              } text-[12px] mt-[4px] mb-[30px]`}
            >
              {invoice.description}
            </p>
          </div>
          <div>
            <p
              className={`${
                theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
              } w-[94px] text-[13px]`}
            >
              {invoice.senderAddress.street} {invoice.senderAddress.city}{" "}
              {invoice.senderAddress.postCode} {invoice.senderAddress.country}
            </p>
          </div>
        </div>
        <div className="xl:flex xl:items-center xl:gap-[100px]">
          <div
            className={`mt-[31px] xl:gap-[100px] flex items-center justify-between`}
          >
            <div className="date-and-due">
              <div className="date">
                <p
                  className={`${
                    theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
                  }`}
                >
                  Invoice Date
                </p>
                <h2
                  className={`${
                    theme == "dark" ? "text-white" : "text-[#0C0E16]"
                  } font-bold text-[15px]`}
                >
                  21 Aug 2021
                </h2>
              </div>
              <div className="mt-[32px]">
                <p
                  className={`${
                    theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
                  }`}
                >
                  Payment Due
                </p>
                <h2
                  className={`${
                    theme == "dark" ? "text-white" : "text-[#0C0E16]"
                  } font-bold text-[15px]`}
                >
                  {invoice.paymentDue}
                </h2>
              </div>
            </div>
            <div className="bill">
              <p
                className={`${
                  theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
                }`}
              >
                Bill To
              </p>
              <h2
                className={`${
                  theme == "dark" ? "text-white" : "text-[#0C0E16]"
                } font-bold text-[15px]`}
              >
                {invoice.clientName}
              </h2>
              <p
                className={`${
                  theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
                } w-[120px] text-[11px]`}
              >
                {invoice.clientAddress.street} <br />{" "}
                {invoice.clientAddress.city} <br />{" "}
                {invoice.clientAddress.postCode} <br />{" "}
                {invoice.clientAddress.country}
              </p>
            </div>
          </div>
          <div className="mt-[32px]">
            <p
              className={`${
                theme == "dark" ? "text-[#DFE3FA]" : "text-[#7E88C3]"
              }`}
            >
              Sent to
            </p>
            <h2
              className={`${
                theme == "dark" ? "text-white" : "text-[#0C0E16]"
              } font-bold text-[15px]`}
            >
              {invoice.clientEmail
                ? invoice.clientEmail
                : "This user don't have email"}
            </h2>
          </div>
        </div>
        <div
          className={`${
            theme == "dark" ? "bg-[#252945]" : "bg-[#F9FAFE]"
          } rounded-[8px]`}
        >
          <div className={`mt-[40px]`}>
            {invoice.items.length &&
              invoice.items.map(function (value, index) {
                return (
                  <div
                    key={index}
                    className="p-[24px] flex items-center justify-between"
                  >
                    <div className="designer">
                      <h2
                        className={`${
                          theme == "dark" ? "text-white" : "text-[#0C0E16]"
                        } font-bold text-[12px] mb-[4px]`}
                      >
                        {value.name}
                      </h2>
                      <p
                        className={`${
                          theme == "dark" ? "text-[#888EB0]" : "text-[#7E88C3]"
                        } font-bold text-[12px]`}
                      >
                        {value.quantity} x £ {value.price}
                      </p>
                    </div>

                    <div className="price">
                      <h2
                        className={`${
                          theme == "dark" ? "text-white" : "text-[#0C0E16]"
                        } font-bold text-[12px]`}
                      >
                        £ {value.total.toFixed(2)}
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            className={`${
              theme == "dark" ? "bg-[#0C0E16]" : "bg-[#373B53]"
            } rounded-b-[8px] flex items-center justify-between p-[24px]`}
          >
            <div className="content">
              <h2 className={`text-white font-normal text-[11px]}`}>
                Amount Due
              </h2>
            </div>
            <div className="due">
              <h2 className={`text-white font-bold text-[20px]`}>
                £ {invoice.total.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`pb-[32px] ${
          theme == "dark" ? "bg-[#1E2139]" : "bg-[#FFFFFF]"
        } mt-[56px] py-[21px] flex items-center rounded-[8px] justify-between`}
      >
        <button
          className={`${
            theme == "dark"
              ? "text-[#DFE3FA] bg-[#252945] "
              : "text-[#7E88C3] bg-[#F9FAFE]"
          } px-[23px] cursor-pointer  py-[17px] rounded-[24px] font-bold text-12px`}
        >
          Edit
        </button>
        <button
          className={`px-[23px] cursor-pointer hover:bg-[#FF9797] py-[17px] rounded-[24px] font-bold text-12px bg-[#EC5757] text-white`}
        >
          Delete
        </button>
        <button className="px-[23px] cursor-pointer py-[17px] rounded-[24px] font-bold text-12px hover:bg-[#9277FF] bg-[#7C5DFA] text-white">
          Mark as Paid
        </button>
      </div>
    </div>
  );
}

export default InvoicesD;
