import React from "react";
import IncomeChart from "./IncomeChart";
import styles from "./IncomeExpense.module.css";

const DisplayIncome = ({ income }) => {
  const sortedHiToLow = income?.sort((a, b) => b.value - a.value);

  let totalPerCategory = [];
  const addSum = (cat) => {
    let sum = 0;
    sortedHiToLow.map((item) => {
      //checks if the category of the array is same as the element in the uniquecategory
      if (item.category === cat) {
        sum += item.value;
      }
      return sum;
    });
    totalPerCategory.push(sum);
  };

  const uniqueCategories = [
    ...new Set(sortedHiToLow?.map((income) => income.category)),
  ];

  uniqueCategories.forEach(addSum);

  const incomeData = {
    labels: uniqueCategories?.map((category) => category),
    datasets: [
      {
        label: "income chart",
        data: totalPerCategory?.map((sum) => sum),
        backgroundColor: [
          "#fbb34c",
          "#fcc46c",
          "#063852",
          "#984756",
          "#c4bc8c",
          " #4b2c44",
        ],
      },
    ],
  };

  // const display = income?.map((income) => (
  //   <div key={income?._id} className={styles.transactionItems}>
  //     description: {income.description}
  //     <br></br>
  //     category: {income.category}
  //     <br></br>
  //     Php {income.value}
  //     <br></br>
  //     {new Date(income?.date).toDateString()}
  //   </div>
  // ));

  const display = uniqueCategories?.map((cat,i)=>
     <div key={cat} className={styles.transactionItems}>{cat}: <div id={styles.income}>+₱{totalPerCategory[i].toLocaleString()}</div></div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.chart} >
        <IncomeChart income={incomeData} />
      </div>
      <div className={styles.data}>{display}</div>
    </div>
  );
};

export default DisplayIncome;
