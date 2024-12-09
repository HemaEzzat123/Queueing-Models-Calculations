import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [c, setC] = useState("");
  const [k, setK] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      lambda: parseFloat(lambda),
      mu: parseFloat(mu),
      c: parseInt(c, 10),
      k: parseInt(k, 10),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-lg space-y-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Queueing System Parameters
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="lambda"
            className="block text-sm font-medium text-gray-700"
          >
            Lambda (Arrival Rate):
          </label>
          <input
            id="lambda"
            type="number"
            value={lambda}
            onChange={(e) => setLambda(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter arrival rate (λ)"
            required
          />
        </div>

        <div>
          <label
            htmlFor="mu"
            className="block text-sm font-medium text-gray-700"
          >
            Mu (Service Rate):
          </label>
          <input
            id="mu"
            type="number"
            value={mu}
            onChange={(e) => setMu(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter service rate (μ)"
            required
          />
        </div>

        <div>
          <label
            htmlFor="c"
            className="block text-sm font-medium text-gray-700"
          >
            C (Number of Servers):
          </label>
          <input
            id="c"
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter number of servers (C)"
          />
        </div>

        <div>
          <label
            htmlFor="k"
            className="block text-sm font-medium text-gray-700"
          >
            K (System Capacity):
          </label>
          <input
            id="k"
            type="number"
            value={k}
            onChange={(e) => setK(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter system capacity (K)"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calculate
      </button>

      <div className="text-center text-sm text-gray-600 mt-4">
        <span>The model applied to the system is: </span>
        <span className="font-semibold text-blue-500">
          {k > 1 && c > 1
            ? "M/M/C/K"
            : k > 1
            ? "M/M/1/K"
            : c > 1
            ? "M/M/C"
            : "M/M/1"}
        </span>
      </div>
    </form>
  );
};

export default InputForm;
