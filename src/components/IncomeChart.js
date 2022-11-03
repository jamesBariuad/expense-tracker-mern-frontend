import React from "react";
import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

const IncomeChart = ({ income }) => {
  return <Doughnut data={income} />;
};

export default IncomeChart;
