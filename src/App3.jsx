import React, { useState } from "react";
import InputForm2 from "./components/InputForm2";
import SimulationTable from "./components/SimulationTable";
import CustomerChart from "./components/CustomChart";

function App3() {
  const [simulationData, setSimulationData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [model, setModel] = useState("MM1");
  const [metrics, setMetrics] = useState({
    L: 0,
    Lq: 0,
    W: 0,
    Wq: 0,
  });

  const generateMM1Simulation = (lambda, mu, numCustomers) => {
    const interarrivalTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / (0.1 * lambda)).toFixed(2))
    );
    const serviceTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / (0.1 * mu)).toFixed(2))
    );
    let arrivalTimes = [0];
    let serviceBeginTimes = [0];
    let serviceEndTimes = [serviceTimes[0]];
    let numCustomersInSystem = 0;
    for (let i = 1; i < numCustomers; i++) {
      const arrivalTime = arrivalTimes[i - 1] + interarrivalTimes[i - 1];
      arrivalTimes.push(arrivalTime);

      let serviceBeginTime = Math.max(arrivalTime, serviceEndTimes[i - 1]);
      serviceBeginTimes.push(serviceBeginTime);

      const serviceEndTime = serviceBeginTime + serviceTimes[i];
      serviceEndTimes.push(serviceEndTime);

      numCustomersInSystem += 1;
      numCustomersInSystem = Math.max(0, numCustomersInSystem - 1);
    }

    const data = arrivalTimes.map((arrivalTime, i) => ({
      customer: i + 1,
      interarrivalTime: interarrivalTimes[i],
      arrivalTime,
      serviceTime: serviceTimes[i],
      serviceBeginTime: serviceBeginTimes[i],
      waitingTime: parseFloat((serviceBeginTimes[i] - arrivalTime).toFixed(2)),
      serviceEndTime: serviceEndTimes[i],
      timeInSystem: parseFloat((serviceEndTimes[i] - arrivalTime).toFixed(2)),
      idleTime: parseFloat(
        i === 0
          ? arrivalTime
          : Math.max(0, arrivalTime - serviceEndTimes[i - 1])
      ),
    }));

    const totalSystemTime = serviceEndTimes.reduce(
      (acc, endTime, i) => acc + (endTime - arrivalTimes[i]),
      0
    );

    const totalQueueTime = serviceBeginTimes.reduce(
      (acc, beginTime, i) => acc + (beginTime - arrivalTimes[i]),
      0
    );

    const simulationTime = Math.max(...serviceEndTimes);
    const numServed = numCustomers;
    const L = totalSystemTime / simulationTime;
    const Lq = totalQueueTime / simulationTime;
    const W = totalSystemTime / numServed;
    const Wq = totalQueueTime / numServed;

    setMetrics({ L, Lq, W, Wq });
    setSimulationData(data);
    setChartData(
      arrivalTimes.map((time, i) => ({
        time: parseFloat(time.toFixed(2)),
        customers: data.filter(
          (d) => d.arrivalTime <= time && d.serviceBeginTime !== null
        ).length,
      }))
    );
  };

  const generateMM1KSimulation = (lambda, mu, numCustomers, k) => {
    const interarrivalTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / (0.1 * lambda)).toFixed(2))
    );
    const serviceTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / (0.1 * mu)).toFixed(2))
    );

    let arrivalTimes = [0];
    let serverAvailableTime = 0;
    let queue = [];
    let blockedCustomers = 0;

    const data = [];

    const processQueuedCustomers = (currentTime) => {
      while (serverAvailableTime <= currentTime && queue.length > 0) {
        const nextCustomer = queue.shift();
        const serviceBeginTime = serverAvailableTime;
        const serviceEndTime = serviceBeginTime + nextCustomer.serviceTime;

        serverAvailableTime = serviceEndTime;

        data.push({
          customer: nextCustomer.customer,
          interarrivalTime:
            nextCustomer.arrivalTime - arrivalTimes[nextCustomer.customer - 2],
          arrivalTime: nextCustomer.arrivalTime,
          serviceTime: nextCustomer.serviceTime,
          serviceBeginTime,
          waitingTime: parseFloat(
            (serviceBeginTime - nextCustomer.arrivalTime).toFixed(2)
          ),
          serviceEndTime,
          timeInSystem: parseFloat(
            (serviceEndTime - nextCustomer.arrivalTime).toFixed(2)
          ),
          blockMessage: "served",
          blocked: false,
        });
      }
    };

    for (let i = 1; i < numCustomers; i++) {
      const arrivalTime = arrivalTimes[i - 1] + interarrivalTimes[i - 1];
      arrivalTimes.push(arrivalTime);

      processQueuedCustomers(arrivalTime);

      if (serverAvailableTime <= arrivalTime) {
        const serviceBeginTime = arrivalTime;
        const serviceEndTime = serviceBeginTime + serviceTimes[i];

        serverAvailableTime = serviceEndTime;

        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime,
          waitingTime: parseFloat((serviceBeginTime - arrivalTime).toFixed(2)),
          serviceEndTime: serviceEndTime.toFixed(2),
          timeInSystem: parseFloat((serviceEndTime - arrivalTime).toFixed(2)),
          idleTime: parseFloat((serviceEndTime - arrivalTime).toFixed(2)),
          blockMessage: "served",
          blocked: false,
        });
      } else if (queue.length < k) {
        queue.push({
          customer: i + 1,
          arrivalTime,
          serviceTime: serviceTimes[i],
        });
        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime: null,
          waitingTime: null,
          serviceEndTime: null,
          timeInSystem: null,
          idleTime: "0",
          blockMessage: "queued",
          blocked: true,
        });
      } else {
        blockedCustomers++;
        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime: null,
          waitingTime: null,
          serviceEndTime: null,
          timeInSystem: null,
          idleTime: null,
          blockMessage: "blocked",
          blocked: true,
        });
      }
    }

    const lastArrivalTime = arrivalTimes[arrivalTimes.length - 1];
    processQueuedCustomers(lastArrivalTime + 1000);

    const simulationTime = Math.max(
      ...data
        .filter((d) => d.serviceEndTime !== null)
        .map((d) => d.serviceEndTime)
    );
    const numServed = data.filter((d) => d.serviceBeginTime !== null).length;

    const L =
      data.reduce(
        (acc, d) => (d.timeInSystem ? acc + parseFloat(d.timeInSystem) : acc),
        0
      ) / simulationTime;
    const Lq =
      data.reduce(
        (acc, d) =>
          d.waitingTime && parseFloat(d.waitingTime) > 0
            ? acc + parseFloat(d.waitingTime)
            : acc,
        0
      ) / simulationTime;
    const W = L / lambda;
    const Wq = Lq / lambda;

    const blockingProbability = blockedCustomers / numCustomers;

    setMetrics({
      L,
      Lq,
      W,
      Wq,
      blockingProbability,
      totalCustomers: numCustomers,
      servedCustomers: numServed,
      blockedCustomers,
    });

    setSimulationData(data);

    setChartData(
      arrivalTimes.map((time, i) => ({
        time: parseFloat(time.toFixed(2)),
        customers: data.filter(
          (d) => d.arrivalTime <= time && d.serviceBeginTime !== null
        ).length,
      }))
    );
  };

  const generateMMCSimulation = (lambda, mu, numCustomers, c) => {
    if (lambda <= 0 || mu <= 0 || numCustomers <= 0 || c <= 0) {
      console.error("Invalid input parameters");
      return null;
    }

    const interarrivalTimes = Array.from({ length: numCustomers }, () => {
      const time = -Math.log(1 - Math.random()) / lambda;
      return parseFloat(time.toFixed(2));
    });

    const serviceTimes = Array.from({ length: numCustomers }, () => {
      const time = -Math.log(1 - Math.random()) / mu;
      return parseFloat(time.toFixed(2));
    });

    let arrivalTimes = [0];
    let serverAvailableTimes = Array(c).fill(0);
    let queue = [];
    const data = [];
    const queuedCustomers = [];

    for (let i = 1; i < numCustomers; i++) {
      const arrivalTime = arrivalTimes[i - 1] + interarrivalTimes[i - 1];
      arrivalTimes.push(arrivalTime);

      const availableServers = serverAvailableTimes.filter(
        (availableTime) => availableTime <= arrivalTime
      ).length;

      const availableServerIndex = serverAvailableTimes.findIndex(
        (availableTime) => availableTime <= arrivalTime
      );

      if (availableServerIndex !== -1) {
        const serviceBeginTime = Math.max(
          arrivalTime,
          serverAvailableTimes[availableServerIndex]
        );
        const serviceEndTime = serviceBeginTime + serviceTimes[i];

        serverAvailableTimes[availableServerIndex] = serviceEndTime;

        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime,
          waitingTime: Math.max(serviceBeginTime - arrivalTime),
          serviceEndTime,
          timeInSystem: serviceEndTime - arrivalTime,
          serverIndex: availableServerIndex + 1,
          blockMessage: "served",
          blocked: false,
        });
      }

      if (availableServers < c) {
        const queuedCustomer = {
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          blockMessage: "queued",
        };
        queue.push(queuedCustomer);
        queuedCustomers.push(queuedCustomer);
      }

      for (let j = queue.length - 1; j >= 0; j--) {
        const nextCustomer = queue[j];
        const availableServerIndex = serverAvailableTimes.findIndex(
          (availableTime) => availableTime <= nextCustomer.arrivalTime
        );

        if (availableServerIndex !== -1) {
          queue.splice(j, 1);

          const serviceBeginTime = Math.max(
            nextCustomer.arrivalTime,
            serverAvailableTimes[availableServerIndex]
          );
          const serviceEndTime = serviceBeginTime + nextCustomer.serviceTime;

          const waitingTime = serviceBeginTime - nextCustomer.arrivalTime;

          serverAvailableTimes[availableServerIndex] = serviceEndTime;

          data.push({
            customer: nextCustomer.customer,
            interarrivalTime: nextCustomer.interarrivalTime,
            arrivalTime: nextCustomer.arrivalTime,
            serviceTime: nextCustomer.serviceTime,
            serviceBeginTime,
            waitingTime: Math.max(0, waitingTime),
            serviceEndTime,
            timeInSystem: serviceEndTime - nextCustomer.arrivalTime,
            serverIndex: availableServerIndex + 1,
            blockMessage: "queued",
            blocked: false,
          });
        }
      }
    }

    while (queue.length > 0) {
      const nextCustomer = queue.shift();
      const availableServerIndex = serverAvailableTimes.findIndex(
        (availableTime) => availableTime <= 0
      );

      if (availableServerIndex !== -1) {
        const serviceBeginTime = Math.max(
          nextCustomer.arrivalTime,
          serverAvailableTimes[availableServerIndex]
        );
        const serviceEndTime = serviceBeginTime + nextCustomer.serviceTime;

        serverAvailableTimes[availableServerIndex] = serviceEndTime;

        data.push({
          customer: nextCustomer.customer,
          interarrivalTime: nextCustomer.interarrivalTime,
          arrivalTime: nextCustomer.arrivalTime,
          serviceTime: nextCustomer.serviceTime,
          serviceBeginTime,
          waitingTime: Math.max(0, serviceBeginTime - nextCustomer.arrivalTime),
          serviceEndTime,
          timeInSystem: serviceEndTime - nextCustomer.arrivalTime,
          serverIndex: availableServerIndex + 1,
          blockMessage: "served",
          blocked: false,
        });
      }
    }

    const simulationTime =
      data.length > 0 ? Math.max(...data.map((d) => d.serviceEndTime)) : 0;
    const numServed = data.length;

    const L =
      simulationTime > 0
        ? data.reduce((acc, d) => acc + d.timeInSystem, 0) / simulationTime
        : 0;
    const Lq =
      simulationTime > 0
        ? data.reduce(
            (acc, d) => acc + (d.waitingTime > 0 ? d.waitingTime : 0),
            0
          ) / simulationTime
        : 0;
    const W = lambda > 0 ? L / lambda : 0;
    const Wq = lambda > 0 ? Lq / lambda : 0;

    setSimulationData(data);
    setChartData(
      arrivalTimes.map((time, i) => ({
        time: parseFloat(time.toFixed(2)),
        customers: data.filter(
          (d) => d.arrivalTime <= time && d.serviceBeginTime !== undefined
        ).length,
      }))
    );
    setMetrics({
      L,
      Lq,
      W,
      Wq,
      totalCustomers: numCustomers,
      servedCustomers: numServed,
      queuedCustomers: queuedCustomers.length,
    });

    return {
      data,
      queuedCustomers,
      metrics: {
        L,
        Lq,
        W,
        Wq,
        totalCustomers: numCustomers,
        servedCustomers: numServed,
        queuedCustomers: queuedCustomers.length,
      },
    };
  };

  const generateMMCKSimulation = (lambda, mu, numCustomers, c, k) => {
    const interarrivalTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / lambda).toFixed(2))
    );
    const serviceTimes = Array.from({ length: numCustomers }, () =>
      parseFloat((-Math.log(1 - Math.random()) / mu).toFixed(2))
    );

    let arrivalTimes = [0];
    let serverAvailableTimes = Array(c).fill(0);
    let queue = [];
    let blockedCustomers = 0;

    const data = [];

    for (let i = 1; i < numCustomers; i++) {
      const arrivalTime = arrivalTimes[i - 1] + interarrivalTimes[i - 1];
      arrivalTimes.push(arrivalTime);

      serverAvailableTimes.forEach((serverTime, serverIndex) => {
        if (serverTime <= arrivalTime && queue.length > 0) {
          const nextCustomer = queue.shift();
          const serviceBeginTime = Math.max(arrivalTime, serverTime);
          const serviceEndTime = serviceBeginTime + nextCustomer.serviceTime;

          serverAvailableTimes[serverIndex] = serviceEndTime;

          data.push({
            customer: nextCustomer.customer,
            interarrivalTime:
              nextCustomer.arrivalTime -
              arrivalTimes[nextCustomer.customer - 1],
            arrivalTime: nextCustomer.arrivalTime,
            serviceTime: nextCustomer.serviceTime,
            serviceBeginTime,
            waitingTime: parseFloat(
              serviceBeginTime - nextCustomer.arrivalTime
            ).toFixed(2),
            serviceEndTime,
            timeInSystem: parseFloat(
              serviceEndTime - nextCustomer.arrivalTime
            ).toFixed(2),
            serverIndex: serverIndex + 1,
            blockMessage: "entered the service",
            blocked: false,
          });
        }
      });

      const availableServerIndex = serverAvailableTimes.findIndex(
        (availableTime) => availableTime <= arrivalTime
      );

      if (availableServerIndex !== -1) {
        const serviceBeginTime = Math.max(
          arrivalTime,
          serverAvailableTimes[availableServerIndex]
        );
        const serviceEndTime = serviceBeginTime + serviceTimes[i];

        serverAvailableTimes[availableServerIndex] = serviceEndTime;

        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime,
          waitingTime: parseFloat(serviceBeginTime - arrivalTime).toFixed(2),
          serviceEndTime,
          timeInSystem: parseFloat(serviceEndTime - arrivalTime).toFixed(2),
          serverIndex: availableServerIndex + 1,
          blockMessage: "served",
          blocked: false,
        });
      } else if (queue.length < k) {
        queue.push({
          customer: i + 1,
          arrivalTime,
          serviceTime: serviceTimes[i],
        });
        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime: null,
          waitingTime: null,
          serviceEndTime: null,
          timeInSystem: null,
          serverIndex: null,
          blockMessage: "queued",
          blocked: true,
        });
      } else {
        blockedCustomers++;
        data.push({
          customer: i + 1,
          interarrivalTime: interarrivalTimes[i],
          arrivalTime,
          serviceTime: serviceTimes[i],
          serviceBeginTime: null,
          waitingTime: null,
          serviceEndTime: null,
          timeInSystem: null,
          serverIndex: null,
          blockMessage: "blocked",
          blocked: true,
        });
      }
    }

    const simulationTime = Math.max(
      ...data
        .filter((d) => d.serviceEndTime !== null)
        .map((d) => d.serviceEndTime)
    );
    const numServed = data.filter((d) => d.serviceBeginTime !== null).length;

    const L =
      data.reduce(
        (acc, d) => (d.timeInSystem ? acc + parseFloat(d.timeInSystem) : acc),
        0
      ) / simulationTime;
    const Lq =
      data.reduce(
        (acc, d) =>
          d.waitingTime && parseFloat(d.waitingTime) > 0
            ? acc + parseFloat(d.waitingTime)
            : acc,
        0
      ) / simulationTime;
    const W = L / lambda;
    const Wq = Lq / lambda;

    const blockingProbability = blockedCustomers / numCustomers;

    setMetrics({
      L,
      Lq,
      W,
      Wq,
      blockingProbability,
      totalCustomers: numCustomers,
      servedCustomers: numServed,
      blockedCustomers,
    });

    setSimulationData(data);

    setChartData(
      arrivalTimes.map((time, i) => ({
        time: parseFloat(time.toFixed(2)),
        customers: data.filter(
          (d) => d.arrivalTime <= time && d.serviceBeginTime !== null
        ).length,
      }))
    );
  };

  const generateSimulation = (
    lambda,
    mu,
    numCustomers,
    model,
    c = 1,
    k = Infinity
  ) => {
    switch (model) {
      case "MM1":
        generateMM1Simulation(lambda, mu, numCustomers);
        break;
      case "MM1K":
        generateMM1KSimulation(lambda, mu, numCustomers, k);
        break;
      case "MMC":
        generateMMCSimulation(lambda, mu, numCustomers, c);
        break;
      case "MMCK":
        generateMMCKSimulation(lambda, mu, numCustomers, c, k);
        break;
      default:
        break;
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Queue Simulation for M/M/1, M/M/1/K, M/M/C, M/M/C/K Models
      </h1>
      <InputForm2
        onSimulate={(lambda, mu, numCustomers, model, c, k) => {
          setModel(model);
          generateSimulation(lambda, mu, numCustomers, model, c, k);
        }}
      />
      <SimulationTable data={simulationData} />
      {chartData.length > 0 && <CustomerChart chartData={chartData} />}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
          Metrics
        </h2>
        <ul className="space-y-4 ">
          <li className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              L (Average number in the system):
            </span>
            <span className="text-gray-900 font-bold">
              {metrics.L.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              Lq (Average number in the queue):
            </span>
            <span className="text-gray-900 font-bold">
              {metrics.Lq.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              W (Average time in the system):
            </span>
            <span className="text-gray-900 font-bold">
              {metrics.W.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">
              Wq (Average time in the queue):
            </span>
            <span className="text-gray-900 font-bold">
              {metrics.Wq.toFixed(2)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App3;
