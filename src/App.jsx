import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./pages/Results";
import Chart from "./components/Chart";
function App() {
  const [results, setResults] = useState(null);

  const calculateMM1 = ({ lambda, mu }) => {
    const rho = lambda / mu;
    const L = rho / (1 - rho);
    const Lq = Math.pow(rho, 2) / (1 - rho);
    const W = 1 / (mu - lambda);
    const Wq = lambda / (mu * (mu - lambda));

    return { L, Lq, W, Wq };
  };

  const calculateMM1K = ({ lambda, mu, k }) => {
    const rho = lambda / mu;
    console.log("MM1K");
    const p0 = (1 - rho) / (1 - Math.pow(rho, k + 1));
    let pk = 0;
    let l = 0;
    if (rho !== 1) {
      l =
        (rho * (1 - (k + 1) * Math.pow(rho, k) + k * Math.pow(rho, k + 1))) /
        ((1 - rho) * (1 - Math.pow(rho, k + 1)));
      pk = ((1 - rho) / (1 - Math.pow(rho, k + 1))) * Math.pow(rho, k);
    } else {
      l = k / 2;
      pk = 1 / (k + 1);
    }
    const lq = l - rho * (1 - pk);
    const w = l / (lambda * (1 - pk));
    const wq = w - 1 / mu;

    return { L: l, Lq: lq, W: w, Wq: wq };
  };
  const calculateMMC = ({ lambda, mu, c }) => {
    const rho = lambda / (c * mu);
    console.log("MMC");

    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

    const p0Part1 = Array.from(
      { length: c },
      (_, i) => Math.pow(lambda / mu, i) / factorial(i)
    ).reduce((acc, cur) => acc + cur, 0);
    const p0Part2 = Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho));
    const p0 = 1 / (p0Part1 + p0Part2);

    const lq =
      (Math.pow(lambda / mu, c) * rho * p0) /
      (factorial(c) * Math.pow(1 - rho, 2));
    const l = lq + lambda / mu;
    const wq = lq / lambda;
    const w = l / lambda;

    return { L: l, Lq: lq, W: w, Wq: wq };
  };

  const calculateMMCK = ({ lambda, mu, c, k }) => {
    const r = lambda / mu;
    const rho = r / c;
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

    let p0 = 0;
    let p0Part1 = 0;
    let p0Part2 = 0;

    if (rho !== 1) {
      for (let n = 0; n < c - 1; n++) {
        p0Part1 += Math.pow(r, n) / factorial(n);
      }
      p0Part2 =
        p0Part1 +
        (Math.pow(r, c) / factorial(c)) *
          ((1 - Math.pow(rho, k - c + 1)) / (1 - rho));
      p0 = 1 / p0Part2;
    } else {
      for (let n = 0; n < c - 1; n++) {
        p0Part1 += Math.pow(r, n) / factorial(n);
      }
      p0Part2 = p0Part1 + (Math.pow(r, c) / factorial(c)) * (k - c + 1);
      p0 = 1 / p0Part2;
    }

    const pk = p0 * (Math.pow(r, k) / (Math.pow(c, k - c) * factorial(c)));
    const lambdaDash = lambda * (1 - pk);

    const lq =
      ((rho * Math.pow(r, c) * p0) / (factorial(c) * Math.pow(1 - rho, 2))) *
      (1 -
        Math.pow(rho, k - c + 1) -
        (1 - rho) * (k - c + 1) * Math.pow(rho, k - c));

    let lPart2 = 0;
    for (let n = 0; n < c - 1; n++) {
      lPart2 += (c - n) * (Math.pow(r, n) / factorial(n));
    }
    const l = lq + c - p0 * lPart2;
    const w = l / lambdaDash;
    const wq = lq / lambdaDash;

    return { L: l, Lq: lq, W: w, Wq: wq };
  };
  const handleSubmit = (data) => {
    let results;

    if (data.k > 0 && data.c > 1) {
      results = calculateMMCK(data);
    } else if (data.c > 1) {
      results = calculateMMC(data);
    } else if (data.k > 1 && data.c == 1) {
      results = calculateMM1K(data);
    } else {
      results = calculateMM1(data);
    }

    setResults(results);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-600">
          Queueing System
        </h1>
        <p className="text-gray-600 mt-2">
          Analyze queueing models with interactive inputs and dynamic results.
        </p>
      </header>
      <main className="max-w-8xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Input Form
          </h2>
          <InputForm onSubmit={handleSubmit} />
        </section>

        {results && (
          <section className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Results
            </h2>
            <Results results={results} />
          </section>
        )}

        {results && (
          <section className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Chart</h2>
            <Chart results={results} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
