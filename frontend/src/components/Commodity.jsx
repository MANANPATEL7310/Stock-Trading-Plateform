import React from "react";


const columns = [
  "Commodity futures",
  "Commodity options"
];

const rows = [
  {
    label: "Brokerage",
    values: [
      "	0.03% or Rs. 20/executed order whichever is lower",
      "	₹ 20/executed order"
    ],
  },
  {
    label: "STT/CTT",
    values: [
      "	0.01% on sell side (Non-Agri)",
      "		0.05% on sell side"
    ],
  },
  {
    label: "Transaction charges",
    values: [
      ["MCX: 0.0021%", "NSE: 0.0001%"],
      ["MCX: 0.0418%", "NSE: 0.001%"],
    ],
  },
  {
    label: "GST",
    values: [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "	18% on (brokerage + SEBI charges + transaction charges)"
    ],
  },
  {
    label: "SEBI charges",
    values: [<>	Agri: <br/>₹1 / crore<br/>Non-agri:<br/>₹10 / crore</>,"₹10 / crore"],
  },
  {
    label: "Stamp charges",
    values: [
      "	0.002% or ₹200 / crore on buy side",
      "		0.003% or ₹300 / crore on buy side"
    ],
  },
];











function Commodity() {
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

export default Commodity;
