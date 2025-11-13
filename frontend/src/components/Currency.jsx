import React from "react";

const columns = [
  "Currency futures",
  "	Currency options"
];

const rows = [
  {
    label: "Brokerage",
    values: [
      "	0.03% or ₹ 20/executed order whichever is lower",
      "	₹ 20/executed order"
    ],
  },
  {
    label: "STT/CTT",
    values: [
      "	No STT",
      "	No STT"
    ],
  },
  {
    label: "Transaction charges",
    values: [
      ["NSE: 0.00035%", "BSE: 0.00045%"],
      ["NSE: 0.0311%", "BSE: 0.001%"],
    ],
  },
  {
    label: "GST",
    values: [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)"
    ],
  },
  {
    label: "SEBI charges",
    values: ["₹10 / crore", "₹10 / crore"],
  },
  {
    label: "Stamp charges",
    values: [
      "	0.0001% or ₹10 / crore on buy side",
      "	0.0001% or ₹10 / crore on buy side"
    ],
  },
];

function Currency() {
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

export default Currency;
