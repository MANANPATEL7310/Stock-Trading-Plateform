import React from "react";

const columns = [
  "Equity delivery",
  "Equity intraday",
  "F&O - Futures",
  "F&O - Options",
];

const rows = [
  {
    label: "Brokerage",
    values: [
      "Zero Brokerage",
      "0.03% or Rs. 20/executed order whichever is lower",
      "0.03% or Rs. 20/executed order whichever is lower",
      "Flat Rs. 20 per executed order",
    ],
  },
  {
    label: "STT/CTT",
    values: [
      "0.1% on buy & sell",
      "0.025% on the sell side",
      "0.02% on the sell side",
      [
        "0.125% of intrinsic value on exercised buy options",
        "0.1% on sell side (on premium)",
      ],
    ],
  },
  {
    label: "Transaction charges",
    values: [
      ["NSE: 0.00297%", "BSE: 0.00375%"],
      ["NSE: 0.00297%", "BSE: 0.00375%"],
      ["NSE: 0.00173%", "BSE: 0"],
      ["NSE: 0.03503% (on premium)", "BSE: 0.0325% (on premium)"],
    ],
  },
  {
    label: "GST",
    values: [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
    ],
  },
  {
    label: "SEBI charges",
    values: ["₹10 / crore", "₹10 / crore", "₹10 / crore", "₹10 / crore"],
  },
  {
    label: "Stamp charges",
    values: [
      "0.015% or ₹1500 / crore on buy side",
      "0.003% or ₹300 / crore on buy side",
      "0.002% or ₹200 / crore on buy side",
      "0.003% or ₹300 / crore on buy side",
    ],
  },
];

function Equity() {
  return (
    <>
      <div className="overflow-x-auto mx-auto max-w-7xl md:p-4 mt-6">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className=" p-4   border-b border-b-gray-300 "></th>
              {columns.map((c, i) => (
                <th
                  key={i}
                  className=" p-3  text-[#707070]   border-b border-b-gray-300 text-left font-semibold"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="align-top">
                <td className=" p-3 font-medium w-48 text-[#707070]">
                  {row.label}
                </td>

                {row.values.map((v, ci) => (
                  <td key={ci} className=" p-3 text-[#808080]">
                    {Array.isArray(v) ? (
                      <ul className="list-disc ml-5 space-y-1">
                        {v.map((item, ii) => (
                          <li key={ii}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Equity;
