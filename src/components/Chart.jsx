import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ results }) => {
  if (!results) return null;

  const { L, Lq, W, Wq } = results;

  const data = {
    labels: [
      "L (System)",
      "Lq (Queue)",
      "W (Time in System)",
      "Wq (Time in Queue)",
    ],
    datasets: [
      {
        label: "Queueing Metrics",
        data: [L, Lq, W, Wq],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(54, 162, 235, 0.8)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Queueing System Metrics",
        font: {
          size: 20,
          family: "Arial, sans-serif",
          weight: "bold",
        },
        color: "#4B5563",
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
          color: "#6B7280",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <div className="mt-6 bg-white p-6 shadow-lg rounded-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-center text-gray-700 mb-4">
        Metrics Visualization
      </h3>
      <div className="relative h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
