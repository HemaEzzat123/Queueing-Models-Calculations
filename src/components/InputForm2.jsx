import React, { useState } from "react";

function InputForm2({ onSimulate }) {
  const [lambda, setLambda] = useState("");
  const [mu, setMu] = useState("");
  const [numCustomers, setNumCustomers] = useState("");
  const [model, setModel] = useState("MM1");
  const [c, setC] = useState(1);
  const [k, setK] = useState(Infinity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(
      parseFloat(lambda),
      parseFloat(mu),
      parseInt(numCustomers),
      model,
      parseInt(c),
      parseInt(k)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  shadow-lg rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lambda">
          Arrival Rate (λ)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lambda"
          type="number"
          placeholder="Enter arrival rate"
          value={lambda}
          onChange={(e) => setLambda(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="mu">
          Service Rate (μ)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mu"
          type="number"
          placeholder="Enter service rate"
          value={mu}
          onChange={(e) => setMu(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="numCustomers"
        >
          Number of Customers
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="numCustomers"
          type="number"
          placeholder="Enter number of customers"
          value={numCustomers}
          onChange={(e) => setNumCustomers(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="model">
          Model
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="MM1">M/M/1</option>
          <option value="MM1K">M/M/1/K</option>
          <option value="MMC">M/M/C</option>
          <option value="MMCK">M/M/C/K</option>
        </select>
      </div>

      {model.includes("C") && (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="c">
            Number of Servers (c)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="c"
            type="number"
            placeholder="Enter number of servers"
            value={c}
            onChange={(e) => setC(e.target.value)}
            required
          />
        </div>
      )}

      {model.includes("K") && (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="k">
            System Capacity (K)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="k"
            type="number"
            placeholder="Enter system capacity"
            value={k}
            onChange={(e) => setK(e.target.value)}
            required
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Simulate
        </button>
      </div>
    </form>
  );
}

export default InputForm2;
