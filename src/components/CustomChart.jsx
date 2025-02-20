import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CustomerChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((point) => point.time),
    datasets: [
      {
        label: "Number of Customers in System",
        data: chartData.map((point) => point.customers),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(34, 197, 94)",
        tension: 0.4,
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
            size: 12,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Number of Customers in System Over Time",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Clock)",
          font: {
            size: 12,
            weight: "500",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Customers",
          font: {
            size: 12,
            weight: "500",
          },
        },
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerChart;
