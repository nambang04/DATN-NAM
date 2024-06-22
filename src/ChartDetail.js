import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const HumidityChart = ({ humidity }) => {
  const data = {
    labels: ["Độ ẩm (%)"],
    datasets: [
      {
        data: [humidity, 100 - humidity], // Giá trị độ ẩm và phần còn lại
        backgroundColor: ["#36A2EB", "#E7E7E7"], // Màu cho độ ẩm và phần còn lại
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    maintainAspectRatio: true,
    responsive: true,
    cutoutPercentage: 50, // Độ lõm của nửa hình bánh (50% là nửa hình bánh)
  };

  return (
    <div className="chart-item">
      <h4 style={{ textAlign: "center" }}>Độ ẩm</h4>
      <Doughnut data={data} options={options} />
      <div className="chart-center-text">{`${humidity?.toFixed(1)}%`}</div>
    </div>
  );
};

const SmokeChart = ({ smoke }) => {
  const data = {
    labels: ["Độ khói (%)"],
    datasets: [
      {
        data: [smoke, 100 - smoke], // Giá trị độ khói và phần còn lại
        backgroundColor: ["#FF6384", "#E7E7E7"], // Màu cho độ khói và phần còn lại
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="chart-item">
      <h4 style={{ textAlign: "center" }}>Khói</h4>
      <Doughnut data={data} options={options} />
      <div className="chart-center-text">{`${smoke}%`}</div>
    </div>
  );
};

const TemperatureChart = ({ temperature }) => {
  const data = {
    labels: ["Nhiệt độ (°C)"],
    datasets: [
      {
        data: [temperature, 100 - temperature], // Giá trị nhiệt độ và phần còn lại
        backgroundColor: ["#FFCE56", "#E7E7E7"], // Màu cho nhiệt độ và phần còn lại
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="chart-item">
      <h4 style={{ textAlign: "center" }}>Nhiệt độ</h4>
      <Doughnut data={data} options={options} />
      <div className="chart-center-text">{`${temperature?.toFixed(1)}°C`}</div>
    </div>
  );
};

export { HumidityChart, SmokeChart, TemperatureChart };
