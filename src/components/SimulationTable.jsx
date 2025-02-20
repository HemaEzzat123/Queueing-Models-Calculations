import React from "react";

const SimulationTable = ({ data }) => {
  const headers = [
    "Customer",
    "Time Since Last Arrival",
    "Arrival Time",
    "Service Time",
    "Time Service Begins",
    "Time Customer Waits in Queue",
    "Time Service Ends",
    "Time Customer Spends in System",
    "Idle Time of Server",
    "Status of Customer",
  ];

  return (
    <div className="w-full overflow-x-auto shadow-lg">
      {data.length > 0 ? (
        <table className="w-full border-collapse text-sm bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-gray-50 transition-colors duration-200 border-b last:border-b-0"
              >
                {Object.values(row).map((value, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 text-gray-600">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 p-6 bg-gray-50 rounded-lg">
          No data available. Run a simulation first.
        </div>
      )}
    </div>
  );
};

export default SimulationTable;
