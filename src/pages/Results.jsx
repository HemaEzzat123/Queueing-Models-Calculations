import React from "react";

const Results = ({ results }) => {
  if (!results) return null;

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Results
      </h2>

      <div className="text-gray-700 space-y-2">
        <p className="flex justify-between">
          <span className="font-medium">L (Average number in system):</span>
          <span>{results.L}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Lq (Average number in queue):</span>
          <span>{results.Lq}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium">W (Average time in system):</span>
          <span>{results.W}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-medium">Wq (Average time in queue):</span>
          <span>{results.Wq}</span>
        </p>
      </div>
    </div>
  );
};

export default Results;
