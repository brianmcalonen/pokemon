import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatChart = ({ pokemon }) => {
  const colors = [
    "rgba(245, 29, 49, 0.8)", // Pokéball Red
    "rgba(10, 76, 139, 0.8)", // Pikachu Blue
    "rgba(255, 196, 12, 0.8)", // Pikachu Yellow
    "rgba(139, 191, 64, 0.8)", // Bulbasaur Green
    "rgba(112, 88, 152, 0.8)", // Gengar Purple
    "rgba(230, 213, 184, 0.8)", // Eevee Brown
  ];

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Base Stats",
      },
    },
    maintainAspectRatio: false,
  };
  // const labels = pokemon.stats.map((stat) => stat.stat.name);
  const labels = ["HP", "Attack", "Defense", "SpAtk", "SpDef", "Speed"];

  const statData = pokemon.stats.map((stat) => stat.base_stat);

  const data = {
    labels,
    datasets: [
      {
        data: statData,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default StatChart;
