import React from "react";
import DisplayExpense from "./DisplayExpense";
import DisplayIncome from "./DisplayIncome";
// import IncomeChart from "./IncomeChart";
import styles from "./Stats.module.css";

const Stats = ({ income, expense }) => {
  return (
    <div className={styles.gridcontainer}>
      <div className={styles.header}>
        <h2>Stats all time</h2>
      </div>
      <div className={styles.incomearea}>
        <div className={styles.head}>
          <h3>income</h3>
        </div>
        <div className={styles.data}>
          <DisplayIncome income={income} />
        </div>
      </div>
      <div className={styles.expensearea}>
        <div className={styles.head}>
          <h3>expense</h3>
        </div>
        <div className={styles.data}>
          <DisplayExpense expense={expense} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
