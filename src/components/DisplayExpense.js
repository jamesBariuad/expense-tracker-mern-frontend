import React from "react";
import ExpenseChart from "./ExpenseChart";
import styles from "./IncomeExpense.module.css";

const DisplayExpense = ({ expense }) => {
  const sortedHiToLow = expense.sort((a, b) => b.value - a.value);
  
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
    ...new Set(sortedHiToLow.map((income) => income.category)),
  ];

  uniqueCategories.forEach(addSum);

  const expenseData = {
    labels: uniqueCategories.map((category) => category),
    datasets: [
      {
        label: "expense chart",
        data: totalPerCategory.map((sum) => sum),
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

  
  const display = uniqueCategories.map((cat,i)=>
     <div key={cat} className={styles.transactionItems}>{cat}: <div id={styles.expense}>-₱{totalPerCategory[i].toLocaleString()}</div></div>
  )

  

  // const display = expense?.map((expense) => (
  //   <div key={expense._id} className={styles.transactionItems}>
  //     description: {expense.description}
  //     <br></br>
  //     category: {expense.category}
  //     <br></br>
  //     Php {expense.value}
  //     <br></br>
  //     {new Date(expense?.date).toDateString()}
  //   </div>
  // ));



  return (
    <div className={styles.container}>
      <div style={{ width: 300 }}>
        <ExpenseChart expense={expenseData} />
      </div>
      <div className={styles.data}>
        {display}
      </div>
    </div>
  );
};

export default DisplayExpense;
