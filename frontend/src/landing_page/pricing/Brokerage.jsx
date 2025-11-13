import React from "react";
import ChargeExplained from "../../components/ChargeExplained";
import { Link } from "react-router-dom";

const openingCharges = [
  { type: "Online account", charge: "FREE" },
  { type: "Offline account", charge: "FREE" },
  { type: "NRI account (offline only)", charge: "₹ 500" },
  {
    type: "Partnership, LLP, HUF, or Corporate accounts (offline only)",
    charge: "₹ 500",
  },
];

const AnnualCharges = [
  { value: "Up to ₹4 lakh", AMC: "FREE" },
  { value: "₹4 lakh - ₹10 lakh", AMC: "	₹ 100 per year, charged quarterly*" },
  { value: "Above ₹10 lakh", AMC: "	₹ 300 per year, charged quarterly" },
];

const OptionalCharges = [
  {
    service: "Tickertape",
    BillingFrquency: "	Monthly / Annual",
    Charges: "Free: 0 | Pro: 249/2399",
  },
  {
    service: "Smallcase",
    BillingFrquency: "	Per transaction",
    Charges: "	Buy & Invest More: 100 | SIP: 10",
  },
  {
    service: "Kite Connect",
    BillingFrquency: "	Monthly",
    Charges: "Connect: 500 | Personal: Free",
  },
];

function Brokerage() {
  return (
    <>
    {/* First Table */}
      <div className="overflow-x-auto mx-auto max-w-6xl md:px-12 mt-24 ">
        <h2 className="text-2xl font-medium mb-4 text-gray-600">
          Charges for account opening
        </h2>

        <table className="min-w-full border border-gray-300  table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left font-medium text-[#353839] border-b border-b-gray-300 w-1/2">
                Type of account
              </th>
              <th className="p-3 border-b text-center font-medium text-[#353839] border-b border-b-gray-300 w-1/2 ">
                Charges
              </th>
            </tr>
          </thead>

          <tbody>
            {openingCharges.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 text-[#666]">{row.type}</td>
                <td className="p-3 text-center text-[#666]">
                  {row.charge === "FREE" ? (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                      FREE
                    </span>
                  ) : (
                    row.charge
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>









      {/* Second Table */}
      <div className="overflow-x-auto mx-auto max-w-6xl md:px-12 mt-12 ">
        <h2 className="text-2xl font-medium mb-4 text-gray-600">
          Demat AMC (Annual Maintenance Charge)
        </h2>

        <table className="min-w-full border border-gray-300  table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left font-medium text-[#353839] border-b border-b-gray-300 w-1/2">
                Value of holdings
              </th>
              <th className="p-3 border-b text-center font-medium text-[#353839] border-b border-b-gray-300 w-1/2">
                AMC
              </th>
            </tr>
          </thead>

          <tbody>
            {AnnualCharges.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 text-[#666]">{row.value}</td>
                <td className="p-3 text-center text-[#666]">
                  {row.AMC === "FREE" ? (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                      FREE
                    </span>
                  ) : (
                    row.AMC
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm mt-5">* Lower AMC is applicable only if the account qualifies as a Basic Services Demat Account (BSDA). BSDA account holders cannot hold more than one demat account. To learn more about BSDA,{"  "}<Link to="#">click here.</Link></p>
      </div>







      {/* Third Table */}
      <div className="overflow-x-auto mx-auto max-w-6xl md:px-12 mt-24 ">
        <h2 className="text-2xl font-medium mb-4 text-gray-600">
          Charges for optional value added services
        </h2>

        <table className="min-w-full border border-gray-300  table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left font-medium text-[#353839] border-b border-b-gray-300 w-1/3">  
              Service
              </th>
              <th className="p-3 border-b font-medium text-left  text-[#353839] border-b border-b-gray-300 w-1/3 ">
                Billing Frquency
              </th>
              <th className="p-3 border-b text-left font-medium text-[#353839] border-b border-b-gray-300 w-1/3">
                	Charges
              </th>
            </tr>
          </thead>

          <tbody>
            { OptionalCharges.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 text-[#666]">{row.service}</td>
                <td className="p-3  text-[#666]">
                  {row.BillingFrquency}
                </td>
                <td className="p-3 text-[#666]">
                  {row.Charges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChargeExplained />
    </>
  );
}

export default Brokerage;
