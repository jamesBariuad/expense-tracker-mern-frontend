import React from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart as chartjs} from "chart.js/auto"

const ExpenseChart = ({ expense }) => {
  return <Doughnut data={expense}/>;
};

export default ExpenseChart;
